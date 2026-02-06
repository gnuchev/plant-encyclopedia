"""
Fetch 2-3 images per plant from Wikipedia/Wikimedia Commons.
Updates plant JSON files with image URLs.
"""

import json
import time
import urllib.request
import urllib.parse
import urllib.error
import sys

HEADERS = {
    "User-Agent": "PlantEncyclopedia/1.0 (Educational project; contact: noreply@example.com)"
}

def api_get(url):
    """Make a GET request with proper headers and error handling."""
    req = urllib.request.Request(url, headers=HEADERS)
    try:
        with urllib.request.urlopen(req, timeout=15) as resp:
            return json.loads(resp.read().decode("utf-8"))
    except (urllib.error.URLError, urllib.error.HTTPError, json.JSONDecodeError, TimeoutError) as e:
        return None


def get_wikipedia_image(botanical_name):
    """Get the main image from the Wikipedia article for a plant."""
    encoded = urllib.parse.quote(botanical_name.replace(" ", "_"))
    url = f"https://en.wikipedia.org/api/rest_v1/page/summary/{encoded}"
    data = api_get(url)
    if data and "originalimage" in data:
        return data["originalimage"]["source"]
    if data and "thumbnail" in data:
        return data["thumbnail"]["source"]
    return None


def search_commons_images(query, limit=5):
    """Search Wikimedia Commons for images matching a query."""
    encoded = urllib.parse.quote(query)
    url = (
        f"https://commons.wikimedia.org/w/api.php?"
        f"action=query&generator=search&gsrsearch={encoded}"
        f"&gsrnamespace=6&gsrlimit={limit}"
        f"&prop=imageinfo&iiprop=url|size|mime"
        f"&iiurlwidth=640&format=json"
    )
    data = api_get(url)
    if not data or "query" not in data or "pages" not in data["query"]:
        return []

    images = []
    for page_id, page in data["query"]["pages"].items():
        if "imageinfo" not in page:
            continue
        info = page["imageinfo"][0]
        mime = info.get("mime", "")
        if not mime.startswith("image/"):
            continue
        # Skip SVGs, icons, and tiny images
        if mime == "image/svg+xml":
            continue
        width = info.get("width", 0)
        height = info.get("height", 0)
        if width < 200 or height < 200:
            continue
        # Use the thumbnail URL (640px wide) if available, else original
        thumb_url = info.get("thumburl", info.get("url", ""))
        if thumb_url:
            images.append(thumb_url)

    return images


def get_plant_images(botanical_name, common_name, target=3):
    """Get 2-3 images for a plant, trying multiple search strategies."""
    images = []
    seen_urls = set()

    def add_image(url):
        if url and url not in seen_urls and len(images) < target:
            seen_urls.add(url)
            images.append(url)

    # Strategy 1: Wikipedia article main image (botanical name)
    wiki_img = get_wikipedia_image(botanical_name)
    add_image(wiki_img)
    time.sleep(0.3)

    # Strategy 2: Wikimedia Commons search (botanical name)
    commons_imgs = search_commons_images(botanical_name, limit=5)
    for img in commons_imgs:
        add_image(img)
    time.sleep(0.3)

    # Strategy 3: If still need more, try common name
    if len(images) < 2 and common_name:
        commons_imgs2 = search_commons_images(f"{common_name} plant", limit=5)
        for img in commons_imgs2:
            add_image(img)
        time.sleep(0.3)

    # Strategy 4: Try botanical name genus only if still short
    if len(images) < 2:
        genus = botanical_name.split()[0] if " " in botanical_name else ""
        if genus:
            wiki_img2 = get_wikipedia_image(genus)
            add_image(wiki_img2)
            time.sleep(0.3)

    return images


def process_json_file(filepath):
    """Process a plant JSON file and add images to each plant."""
    with open(filepath, "r", encoding="utf-8") as f:
        data = json.load(f)

    plants = data["plants"]
    total = len(plants)
    found = 0
    total_images = 0

    for i, plant in enumerate(plants):
        botanical = plant.get("botanical_name", "")
        common = plant.get("common_name", "")

        # Skip if already has images
        if plant.get("images") and len(plant["images"]) >= 2:
            found += 1
            total_images += len(plant["images"])
            print(f"  [{i+1}/{total}] {botanical} - already has images, skipping")
            continue

        print(f"  [{i+1}/{total}] {botanical} ({common})...", end=" ", flush=True)
        images = get_plant_images(botanical, common)

        if images:
            plant["images"] = images
            found += 1
            total_images += len(images)
            print(f"found {len(images)} images")
        else:
            plant["images"] = []
            print("NO IMAGES FOUND")

    with open(filepath, "w", encoding="utf-8") as f:
        json.dump(data, f, indent=2, ensure_ascii=False)

    print(f"\n  Results: {found}/{total} plants have images ({total_images} total images)")
    return found, total, total_images


def main():
    fl_path = r"D:\Plants_Encyclopedia\website\content\data\plants_encyclopedia.json"
    ca_path = r"D:\Plants_Encyclopedia\website\content\data\plants_encyclopedia_ca.json"

    print("=" * 60)
    print("FLORIDA PLANTS (Zone 10A)")
    print("=" * 60)
    fl_found, fl_total, fl_images = process_json_file(fl_path)

    print("\n" + "=" * 60)
    print("CALIFORNIA PLANTS (Zone 9)")
    print("=" * 60)
    ca_found, ca_total, ca_images = process_json_file(ca_path)

    print("\n" + "=" * 60)
    print("SUMMARY")
    print("=" * 60)
    print(f"Florida:    {fl_found}/{fl_total} plants with images ({fl_images} total)")
    print(f"California: {ca_found}/{ca_total} plants with images ({ca_images} total)")
    print(f"Grand total: {fl_found + ca_found}/{fl_total + ca_total} plants, {fl_images + ca_images} images")


if __name__ == "__main__":
    main()
