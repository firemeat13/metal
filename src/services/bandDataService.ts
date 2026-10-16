import {
  collection,
  getDocs,
  getDoc,
  doc,
  query,
  where,
  Query,
  QueryConstraint,
} from 'firebase/firestore';
import { db } from './firebaseService';
import { Band, Album, Song } from '../types';

export async function getBands(): Promise<Band[]> {
  const bandsRef = collection(db, 'bands');
  const snapshot = await getDocs(bandsRef);
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as Band));
}

export async function getBandById(bandId: string): Promise<Band | null> {
  const bandDoc = await getDoc(doc(db, 'bands', bandId));
  return bandDoc.exists() ? ({ id: bandDoc.id, ...bandDoc.data() } as Band) : null;
}

export async function searchBands(searchTerm: string): Promise<Band[]> {
  const bands = await getBands();
  return bands.filter((band) =>
    band.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
}

export async function getAlbumsByBand(bandId: string): Promise<Album[]> {
  const albumsRef = collection(db, 'bands', bandId, 'albums');
  const snapshot = await getDocs(albumsRef);
  return snapshot.docs
    .map((doc) => ({ id: doc.id, bandId, ...doc.data() } as Album))
    .sort((a, b) => a.year - b.year);
}

export async function getAlbumById(bandId: string, albumId: string): Promise<Album | null> {
  const albumDoc = await getDoc(doc(db, 'bands', bandId, 'albums', albumId));
  return albumDoc.exists()
    ? ({ id: albumDoc.id, bandId, ...albumDoc.data() } as Album)
    : null;
}

export async function getSongsByAlbum(
  bandId: string,
  albumId: string
): Promise<Song[]> {
  const songsRef = collection(db, 'bands', bandId, 'albums', albumId, 'songs');
  const snapshot = await getDocs(songsRef);
  return snapshot.docs.map((doc) => ({
    id: doc.id,
    bandId,
    albumId,
    ...doc.data(),
  } as Song));
}

export async function getSongById(
  bandId: string,
  albumId: string,
  songId: string
): Promise<Song | null> {
  const songDoc = await getDoc(
    doc(db, 'bands', bandId, 'albums', albumId, 'songs', songId)
  );
  return songDoc.exists()
    ? ({
        id: songDoc.id,
        bandId,
        albumId,
        ...songDoc.data(),
      } as Song)
    : null;
}

export async function getBandsByGenre(genre: string): Promise<Band[]> {
  const bands = await getBands();
  return bands.filter((band) => band.genre.includes(genre));
}
