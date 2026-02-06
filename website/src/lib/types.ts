export interface Plant {
  id: number;
  category: string;
  common_name: string;
  botanical_name: string;
  transcript_spelling: string;
  description: string;
  images?: string[];
}

export interface PlantsData {
  metadata: {
    source: string;
    note: string;
    date_compiled: string;
  };
  plants: Plant[];
}

export interface ArticleMeta {
  slug: string;
  title: string;
  category: string;
  description: string;
  order: number;
}

export interface Article extends ArticleMeta {
  content: string;
}

export interface CategoryGroup {
  category: string;
  articles: ArticleMeta[];
}
