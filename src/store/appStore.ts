import { create } from 'zustand';
import { User, Band, Album, Song } from '../types';

interface AppState {
  currentUser: User | null;
  setCurrentUser: (user: User | null) => void;

  selectedBand: Band | null;
  setSelectedBand: (band: Band | null) => void;

  selectedAlbum: Album | null;
  setSelectedAlbum: (album: Album | null) => void;

  selectedSong: Song | null;
  setSelectedSong: (song: Song | null) => void;

  favoriteBands: string[];
  addFavoriteBand: (bandId: string) => void;
  removeFavoriteBand: (bandId: string) => void;

  favoriteSongs: string[];
  addFavoriteSong: (songId: string) => void;
  removeFavoriteSong: (songId: string) => void;

  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;

  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export const useAppStore = create<AppState>((set) => ({
  currentUser: null,
  setCurrentUser: (user) => set({ currentUser: user }),

  selectedBand: null,
  setSelectedBand: (band) => set({ selectedBand: band }),

  selectedAlbum: null,
  setSelectedAlbum: (album) => set({ selectedAlbum: album }),

  selectedSong: null,
  setSelectedSong: (song) => set({ selectedSong: song }),

  favoriteBands: [],
  addFavoriteBand: (bandId) =>
    set((state) => ({
      favoriteBands: [...new Set([...state.favoriteBands, bandId])],
    })),
  removeFavoriteBand: (bandId) =>
    set((state) => ({
      favoriteBands: state.favoriteBands.filter((id) => id !== bandId),
    })),

  favoriteSongs: [],
  addFavoriteSong: (songId) =>
    set((state) => ({
      favoriteSongs: [...new Set([...state.favoriteSongs, songId])],
    })),
  removeFavoriteSong: (songId) =>
    set((state) => ({
      favoriteSongs: state.favoriteSongs.filter((id) => id !== songId),
    })),

  isLoading: false,
  setIsLoading: (loading) => set({ isLoading: loading }),

  searchQuery: '',
  setSearchQuery: (query) => set({ searchQuery: query }),
}));
