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
import { getSongById } from '../services/bandDataService';
import { Song } from '../types';
import { useAppStore } from '../store/appStore';

type Props = NativeStackScreenProps<any, 'SongDetail'>;

export const SongDetailScreen = ({ route, navigation }: Props) => {
  const { bandId, albumId, songId } = route.params;
  const [song, setSong] = useState<Song | null>(null);
  const [loading, setLoading] = useState(true);
  const { favoriteSongs, addFavoriteSong, removeFavoriteSong } = useAppStore();
  const isFavorite = favoriteSongs.includes(songId);

  useEffect(() => {
    loadSongData();
  }, [bandId, albumId, songId]);

  const loadSongData = async () => {
    try {
      setLoading(true);
      const songData = await getSongById(bandId, albumId, songId);
      setSong(songData);
    } catch (error) {
      console.error('Error loading song:', error);
    } finally {
      setLoading(false);
    }
  };

  const toggleFavorite = () => {
    if (isFavorite) {
      removeFavoriteSong(songId);
    } else {
      addFavoriteSong(songId);
    }
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#ff0000" />
      </View>
    );
  }

  if (!song) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Song not found</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.headerSection}>
        <Text style={styles.songTitle}>{song.title}</Text>
        <Text style={styles.duration}>
          {Math.floor(song.length / 60)}:{String(song.length % 60).padStart(2, '0')}
        </Text>

        <TouchableOpacity
          style={[styles.favoriteButton, isFavorite && styles.favoritedButton]}
          onPress={toggleFavorite}
        >
          <Text style={styles.favoriteButtonText}>
            {isFavorite ? '❤️ Favorited' : '🤍 Add to Favorites'}
          </Text>
        </TouchableOpacity>
      </View>

      {song.themes && song.themes.length > 0 && (
        <View style={styles.themesSection}>
          <Text style={styles.sectionTitle}>Lyrical Themes</Text>
          <View style={styles.tagsContainer}>
            {song.themes.map((theme, index) => (
              <View key={index} style={styles.themeTag}>
                <Text style={styles.themeText}>{theme}</Text>
              </View>
            ))}
          </View>
        </View>
      )}

      {song.instruments && song.instruments.length > 0 && (
        <View style={styles.instrumentsSection}>
          <Text style={styles.sectionTitle}>Instruments & Production</Text>
          <View style={styles.instrumentsList}>
            {song.instruments.map((instrument, index) => (
              <View key={index} style={styles.instrumentItem}>
                <Text style={styles.instrumentDot}>•</Text>
                <Text style={styles.instrumentText}>{instrument}</Text>
              </View>
            ))}
          </View>
        </View>
      )}

      {song.lyrics && (
        <View style={styles.lyricsSection}>
          <Text style={styles.sectionTitle}>Lyrics</Text>
          <Text style={styles.lyricsText}>{song.lyrics}</Text>
        </View>
      )}

      {song.connections && song.connections.length > 0 && (
        <View style={styles.connectionsSection}>
          <Text style={styles.sectionTitle}>Related Songs</Text>
          <View style={styles.connectionsList}>
            {song.connections.map((connectionId, index) => (
              <TouchableOpacity key={index} style={styles.connectionItem}>
                <Text style={styles.connectionText}>{connectionId}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      )}
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
  songTitle: {
    color: '#fff',
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  duration: {
    color: '#aaa',
    fontSize: 14,
    marginBottom: 16,
  },
  favoriteButton: {
    backgroundColor: '#ff0000',
    padding: 12,
    borderRadius: 6,
    alignItems: 'center',
  },
  favoritedButton: {
    backgroundColor: '#cc0000',
  },
  favoriteButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  themesSection: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  instrumentsSection: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  lyricsSection: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  connectionsSection: {
    padding: 16,
  },
  sectionTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  themeTag: {
    backgroundColor: '#ff0000',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  themeText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  instrumentsList: {
    gap: 8,
  },
  instrumentItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  instrumentDot: {
    color: '#ff0000',
    fontSize: 20,
    marginRight: 8,
  },
  instrumentText: {
    color: '#ccc',
    fontSize: 14,
  },
  lyricsText: {
    color: '#ccc',
    fontSize: 14,
    lineHeight: 22,
  },
  connectionsList: {
    gap: 8,
  },
  connectionItem: {
    backgroundColor: '#2a2a2a',
    padding: 12,
    borderRadius: 6,
    borderLeftWidth: 3,
    borderLeftColor: '#ff0000',
  },
  connectionText: {
    color: '#fff',
    fontSize: 14,
  },
  errorText: {
    color: '#ff0000',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 20,
  },
});
