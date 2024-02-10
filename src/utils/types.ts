export interface Mood {
  id: number,
  label: string,
  alt: string,
  path: string | null
}


export interface Entry {
  id: number,
  date: string,
  moodId: number,
  title: string | null,
  content: string | null,
  mood: Mood | null
}