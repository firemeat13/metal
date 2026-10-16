export interface Band {
  id: string;
  name: string;
  origin: string;
  formed: number;
  disbanded?: number;
  imageUrl?: string;
  description: string;
  genre: string[];
}

export interface Album {
  id: string;
  bandId: string;
  title: string;
  year: number;
  trackCount: number;
  producer: string[];
  genre: string[];
  imageUrl?: string;
  description?: string;
}

export interface Song {
  id: string;
  bandId: string;
  albumId: string;
  title: string;
  length: number;
  instruments: string[];
  themes: string[];
  lyrics?: string;
  connections: string[];
}

export interface User {
  uid: string;
  username: string;
  email: string;
  avatarUrl?: string;
  favoriteBands: string[];
  favoriteSongs: string[];
  createdAt: Date;
}

export interface Discussion {
  id: string;
  bandId?: string;
  albumId?: string;
  songId?: string;
  userId: string;
  username: string;
  content: string;
  rating: number;
  createdAt: Date;
  replies: Discussion[];
}

export interface BandSubmission {
  id: string;
  userId: string;
  bandName: string;
  origin: string;
  formed: number;
  description: string;
  albums: {
    title: string;
    year: number;
    songs: string[];
  }[];
  status: 'pending' | 'approved' | 'rejected';
  createdAt: Date;
}
