export interface RootState {
  articles: Article[],
  isLoading: boolean,
  keyWords: string[],
  currentQuery: string,
}

export interface Article {
  id: number,
  featured: boolean,
  title: string,
  url: string,
  imageUrl: string,
  newsSite: string,
  summary: string,
  publishedAt: string,
  launches: [
      {
        id: string,
        provider: string
      }
    ],
  events: [
      {
        id: string,
        provider: string
      }
    ]
}