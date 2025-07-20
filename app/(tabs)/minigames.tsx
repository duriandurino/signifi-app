import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { useRouter } from 'expo-router';

interface MiniGame {
  id: string;
  name: string;
  description: string;
  icon: string;
  available: boolean;
  route?: string;
}

const MINIGAMES: MiniGame[] = [
  {
    id: 'wordle',
    name: 'Wordle',
    description: 'Guess the 5-letter word in 6 tries',
    icon: 'doc.text.fill',
    available: true,
    route: '/minigames/wordle'
  },
  {
    id: 'hangman',
    name: 'Hangman',
    description: 'Guess the word letter by letter',
    icon: 'person.fill',
    available: false
  },
  {
    id: 'bingo',
    name: 'Bingo',
    description: 'Match numbers and win!',
    icon: 'square.grid.3x3.fill',
    available: false
  },
  {
    id: 'karaoke',
    name: 'Karaoke',
    description: 'Sing along to your favorite songs',
    icon: 'mic.fill',
    available: false
  }
];

export default function MinigamesScreen() {
  const router = useRouter();

  const handleGamePress = (game: MiniGame) => {
    if (game.available && game.id === 'wordle') {
      router.push('/minigames/wordle');
    }
  };

  return (
    <ThemedView style={styles.container}>
      <ThemedText style={styles.title}>Minigames</ThemedText>
      <ThemedText style={styles.subtitle}>Choose a game to play and improve your skills!</ThemedText>
      
      <ScrollView style={styles.gamesList} contentContainerStyle={styles.gamesContainer}>
        {MINIGAMES.map((game) => (
          <TouchableOpacity
            key={game.id}
            style={[styles.gameCard, !game.available && styles.gameCardDisabled]}
            onPress={() => handleGamePress(game)}
            disabled={!game.available}
          >
            <View style={styles.gameIcon}>
              <IconSymbol size={40} name={game.icon} color={game.available ? '#007AFF' : '#999'} />
            </View>
            
            <View style={styles.gameInfo}>
              <ThemedText style={[styles.gameName, !game.available && styles.gameNameDisabled]}>
                {game.name}
              </ThemedText>
              <ThemedText style={[styles.gameDescription, !game.available && styles.gameDescriptionDisabled]}>
                {game.description}
              </ThemedText>
              {!game.available && (
                <ThemedText style={styles.comingSoon}>Coming Soon</ThemedText>
              )}
            </View>
            
            <View style={styles.gameArrow}>
              <IconSymbol 
                size={20} 
                name="chevron.right" 
                color={game.available ? '#007AFF' : '#999'} 
              />
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    opacity: 0.7,
    marginBottom: 30,
  },
  gamesList: {
    flex: 1,
  },
  gamesContainer: {
    gap: 16,
  },
  gameCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  gameCardDisabled: {
    backgroundColor: '#f0f0f0',
    opacity: 0.6,
  },
  gameIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  gameInfo: {
    flex: 1,
  },
  gameName: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 4,
  },
  gameNameDisabled: {
    color: '#999',
  },
  gameDescription: {
    fontSize: 14,
    opacity: 0.7,
  },
  gameDescriptionDisabled: {
    color: '#999',
  },
  comingSoon: {
    fontSize: 12,
    color: '#ff6b6b',
    fontWeight: '500',
    marginTop: 4,
  },
  gameArrow: {
    marginLeft: 12,
  },
}); 