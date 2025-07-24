import React, { useState, useMemo } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';
import HandSign from '../components/HandSign';

type Props = NativeStackScreenProps<RootStackParamList, 'Handman'>;

const WORDS = ['BANANA', 'SALAD', 'DADDY', 'MOMMY', 'MOON', 'FILIPINO'];
const MAX_WRONG = 6;

export default function HandmanScreen({ navigation }: Props) {
  const word = useMemo(() => WORDS[Math.floor(Math.random() * WORDS.length)], []);
  const [guessed, setGuessed] = useState<string[]>([]);
  const [wrongGuesses, setWrongGuesses] = useState<number>(0);

  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

  const handleGuess = (letter: string) => {
    if (guessed.includes(letter)) return;

    setGuessed(prev => [...prev, letter]);

    if (!word.includes(letter)) {
      const nextWrong = wrongGuesses + 1;
      setWrongGuesses(nextWrong);

      if (nextWrong >= MAX_WRONG) {
        Alert.alert('You lost!', `The word was ${word}`, [
          { text: 'Try Again', onPress: () => navigation.reset({ index: 0, routes: [{ name: 'Handman' }] }) },
          { text: 'Go Back', onPress: () => navigation.navigate('Home') },
        ]);
      }
    } else {
      const allLettersFound = word.split('').every(c => guessed.includes(c) || c === letter);
      if (allLettersFound) {
        Alert.alert('🎉 You Won!', '', [
          { text: 'Play Again', onPress: () => navigation.reset({ index: 0, routes: [{ name: 'Handman' }] }) },
          { text: 'Go Back', onPress: () => navigation.navigate('Home') },
        ]);
      }
    }
  };

  const displayWord = word.split('').map(c => (guessed.includes(c) ? c : '_')).join(' ');

  return (
    <View style={styles.container}>
    <Text style={styles.title}>Handman</Text>
    <View style={{ marginBottom: 16 }}>
        <HandSign wrongGuesses={wrongGuesses} />
    </View>

        <Text style={styles.word}>{displayWord}</Text>

        <View style={styles.keyboard}>
        {letters.map(letter => (
            <TouchableOpacity
            key={letter}
            style={[
                styles.key,
                guessed.includes(letter) && styles.keyDisabled
            ]}
            onPress={() => handleGuess(letter)}
            disabled={guessed.includes(letter)}
            >
            <Text style={styles.keyText}>{letter}</Text>
            </TouchableOpacity>
        ))}
        </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container:  { flex: 1, padding: 20, backgroundColor: '#1e1e1e', alignItems: 'center' },
  title:      { fontSize: 28, fontWeight: 'bold', color: '#fff', marginBottom: 16 },
  drawing:    { fontSize: 18, color: '#ccc', marginBottom: 10 },
  word:       { fontSize: 32, letterSpacing: 4, color: '#fff', marginBottom: 24 },
  keyboard:   { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center' },
  key:        {
    width: 40, height: 40, backgroundColor: '#3a3a3a',
    borderRadius: 4, margin: 4, justifyContent: 'center', alignItems: 'center'
  },
  keyDisabled: { backgroundColor: '#555' },
  keyText:     { color: '#fff', fontSize: 18, fontWeight: '600' },
});
