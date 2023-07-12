export interface Song {
  id: number;
  title: string;
  recordedDate: string;
  category: string;
  image?: string;
  notes?: string;
  audioFileName: string;
  documentId?: string;
  lastModifiedBy?: string;
  lastModifiedDate?: string;
  uploadedBy?: string;
  comments?: SongComment[];
}

export interface SongComment {
  author: string;
  date: string;
  comment: string;
}
