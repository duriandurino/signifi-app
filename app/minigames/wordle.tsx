import React, { useState, useCallback, useMemo } from 'react';
import {
  View, Text, TouchableOpacity, StyleSheet, Alert,
} from 'react-native';
import { useRouter } from 'expo-router';
import { ThemedView } from '@/components/ThemedView';

const WORDS = ['PLANT', 'BRAVE', 'SHARE', 'MANGO', 'CLOUD', 'MAGIC', 'FLAME', 'SMILE', 'HEART', 'DANCE']; // put a real list here!
const WORD_LEN = 5;
const MAX_ROWS = 6;

export default function WordleScreen() {
  const router = useRouter();
  
  const solution = useMemo(
    () => WORDS[Math.floor(Math.random() * WORDS.length)],
    [],
  );

  const [rows, setRows]       = useState<string[]>([]);
  const [current, setCurrent] = useState('');

  /* ---------- input helpers ---------- */
  const onKey = useCallback(
    (key: string) => {
      if (key === '⌫') {
        setCurrent(c => c.slice(0, -1));
      } else if (key === 'ENTER') {
        if (current.length !== WORD_LEN) return;

        /* optional dictionary check here */
        const nextRows = [...rows, current];
        setRows(nextRows);
        setCurrent('');

        if (current === solution) {
          Alert.alert('🎉 You got it!', `The word was ${solution}!`, [
            { text: 'Play Again', onPress: () => router.replace('/minigames/wordle') },
            { text: 'Back to Games', onPress: () => router.back() },
          ]);
        } else if (nextRows.length === MAX_ROWS) {
          Alert.alert(`Game Over!`, `The word was ${solution}`, [
            { text: 'Try Again', onPress: () => router.replace('/minigames/wordle') },
            { text: 'Back to Games', onPress: () => router.back() },
          ]);
        }
      } else if (current.length < WORD_LEN) {
        setCurrent(c => c + key);
      }
    },
    [current, rows, solution, router],
  );

  /* ---------- helpers to colour letters ---------- */
  const getBoxStyle = (row: string, i: number) => {
    const char = row[i];
    if (!solution.includes(char)) return styles.absent;
    if (solution[i] === char)     return styles.correct;
    return styles.present;
  };

  /* ---------- render ---------- */
  return (
    <ThemedView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Text style={styles.backButtonText}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Wordle</Text>
        <View style={styles.placeholder} />
      </View>

      {/* Grid */}
      <View style={styles.gameArea}>
        {Array.from({ length: MAX_ROWS }).map((_, rowIdx) => {
          const rowWord = rows[rowIdx] ?? (rowIdx === rows.length ? current : '');
          return (
            <View style={styles.row} key={`row-${rowIdx}`}>
              {Array.from({ length: WORD_LEN }).map((__, colIdx) => {
                const char = rowWord[colIdx] ?? '';
                return (
                  <View
                    key={`col-${colIdx}`}
                    style={[
                      styles.cell,
                      rowIdx < rows.length && getBoxStyle(rowWord, colIdx),
                    ]}
                  >
                    <Text style={styles.char}>{char}</Text>
                  </View>
                );
              })}
            </View>
          );
        })}
      </View>

      {/* On-screen keyboard */}
      <View style={styles.keyboard}>
        {['QWERTYUIOP', 'ASDFGHJKL', 'ZXCVBNM'].map(row =>
          <View style={styles.kbRow} key={row}>
            {row.split('').map(k =>
              <KbKey label={k} onPress={() => onKey(k)} key={k} />)}
            {row === 'ZXCVBNM' && (
              <>
                <KbKey label="⌫" wide onPress={() => onKey('⌫')} />
                <KbKey label="ENTER" wide onPress={() => onKey('ENTER')} />
              </>
            )}
          </View>)
        }
      </View>
    </ThemedView>
  );
}

/* ---------- tiny key component ---------- */
const KbKey = ({
  label, onPress, wide,
}: { label: string; onPress: () => void; wide?: boolean }) => (
  <TouchableOpacity
    onPress={onPress}
    style={[styles.key, wide && styles.keyWide]}
  >
    <Text style={styles.keyText}>{label}</Text>
  </TouchableOpacity>
);

/* ---------- styles ---------- */
const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#111' 
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 50,
    paddingBottom: 20,
  },
  backButton: {
    padding: 8,
  },
  backButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  title: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  placeholder: {
    width: 60, // Same width as back button for centering
  },
  gameArea: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  row: { 
    flexDirection: 'row', 
    alignSelf: 'center', 
    marginBottom: 4 
  },
  cell: {
    width: 48, 
    height: 48, 
    margin: 2,
    borderWidth: 2, 
    borderColor: '#3a3a3c',
    justifyContent: 'center', 
    alignItems: 'center',
  },
  char: { 
    color: '#fff', 
    fontWeight: '700', 
    fontSize: 24 
  },
  correct: { 
    backgroundColor: '#538d4e', 
    borderColor: '#538d4e' 
  },
  present: { 
    backgroundColor: '#b59f3b', 
    borderColor: '#b59f3b' 
  },
  absent:  { 
    backgroundColor: '#3a3a3c', 
    borderColor: '#3a3a3c' 
  },

  keyboard: { 
    paddingHorizontal: 16,
    paddingBottom: 30,
  },
  kbRow: { 
    flexDirection: 'row', 
    justifyContent: 'center', 
    marginBottom: 8 
  },
  key: {
    borderRadius: 4, 
    paddingVertical: 10, 
    paddingHorizontal: 6,
    backgroundColor: '#818384', 
    marginHorizontal: 2, 
    minWidth: 28,
    alignItems: 'center',
  },
  keyWide: { 
    minWidth: 56 
  },
  keyText: { 
    color: '#fff', 
    fontWeight: '600', 
    fontSize: 12 
  },
}); 