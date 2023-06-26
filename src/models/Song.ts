export interface Song {
  id: number;
  title: string;
  recordedDate: string;
  category: string;
  image?: string;
  notes?: string;
  audioFileName: string;
  documentId: string
}
