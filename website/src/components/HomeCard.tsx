import Link from "next/link";

export default function HomeCard({
  href,
  title,
  description,
}: {
  href: string;
  title: string;
  description: string;
}) {
  return (
    <Link href={href} className="home-card">
      <h3>{title}</h3>
      <p>{description}</p>
    </Link>
  );
}
