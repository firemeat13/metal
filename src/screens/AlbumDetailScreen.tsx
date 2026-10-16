import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { getAlbumById, getSongsByAlbum } from '../services/bandDataService';
import { Album, Song } from '../types';

type Props = NativeStackScreenProps<any, 'AlbumDetail'>;

export const AlbumDetailScreen = ({ route, navigation }: Props) => {
  const { bandId, albumId } = route.params;
  const [album, setAlbum] = useState<Album | null>(null);
  const [songs, setSongs] = useState<Song[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadAlbumData();
  }, [bandId, albumId]);

  const loadAlbumData = async () => {
    try {
      setLoading(true);
      const albumData = await getAlbumById(bandId, albumId);
      const songsData = await getSongsByAlbum(bandId, albumId);
      setAlbum(albumData);
      setSongs(songsData);
    } catch (error) {
      console.error('Error loading album:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSongPress = (song: Song) => {
    navigation.navigate('SongDetail', {
      bandId,
      albumId,
      songId: song.id,
      songTitle: song.title,
    });
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#ff0000" />
      </View>
    );
  }

  if (!album) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Album not found</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.headerSection}>
        <Text style={styles.albumTitle}>{album.title}</Text>
        <Text style={styles.albumYear}>{album.year}</Text>
        <Text style={styles.albumInfo}>
          {album.trackCount} tracks • {album.producer.join(', ')}
        </Text>
        <Text style={styles.albumGenre}>{album.genre.join(', ')}</Text>

        {album.description && (
          <Text style={styles.description}>{album.description}</Text>
        )}
      </View>

      <View style={styles.songsSection}>
        <Text style={styles.sectionTitle}>Tracklist</Text>
        {songs.map((song, index) => (
          <TouchableOpacity
            key={song.id}
            style={styles.songCard}
            onPress={() => handleSongPress(song)}
          >
            <Text style={styles.trackNumber}>{index + 1}</Text>
            <View style={styles.songInfo}>
              <Text style={styles.songTitle}>{song.title}</Text>
              <Text style={styles.songLength}>
                {Math.floor(song.length / 60)}:{String(song.length % 60).padStart(2, '0')}
              </Text>
            </View>
            <Text style={styles.arrow}>›</Text>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a1a',
  },
  headerSection: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  albumTitle: {
    color: '#fff',
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  albumYear: {
    color: '#ff0000',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  albumInfo: {
    color: '#aaa',
    fontSize: 14,
    marginBottom: 4,
  },
  albumGenre: {
    color: '#ff0000',
    fontSize: 12,
    marginBottom: 12,
  },
  description: {
    color: '#ccc',
    fontSize: 14,
    lineHeight: 20,
    marginTop: 8,
  },
  songsSection: {
    padding: 16,
  },
  sectionTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  songCard: {
    flexDirection: 'row',
    backgroundColor: '#2a2a2a',
    padding: 12,
    marginBottom: 8,
    borderRadius: 6,
    alignItems: 'center',
  },
  trackNumber: {
    color: '#ff0000',
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 12,
    minWidth: 25,
  },
  songInfo: {
    flex: 1,
  },
  songTitle: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 4,
  },
  songLength: {
    color: '#aaa',
    fontSize: 12,
  },
  arrow: {
    color: '#ff0000',
    fontSize: 20,
  },
  errorText: {
    color: '#ff0000',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 20,
  },
});
