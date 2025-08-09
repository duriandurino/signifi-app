import { useRouter } from 'expo-router';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface WordleScreenProps {
  autoKey?: string;
}

const WORDS = ['PLANT', 'BRAVE', 'SHARE', 'MANGO', 'CLOUD']; // replace with your full list
const WORD_LEN = 5;
const MAX_ROWS = 6;

export default function WordleScreen({ autoKey }: WordleScreenProps) {
  const router = useRouter();
  const solution = useMemo(
    () => WORDS[Math.floor(Math.random() * WORDS.length)],
    []
  );

  const [rows, setRows] = useState<string[]>([]);
  const [current, setCurrent] = useState('');

  // Handle manual and camera key input
  const onKey = useCallback(
    (key: string) => {
      if (key === '⌫') {
        setCurrent(c => c.slice(0, -1));
      } else if (key === 'ENTER') {
        if (current.length !== WORD_LEN) return;
        const next = [...rows, current];
        setRows(next);
        setCurrent('');
        if (current === solution) {
          Alert.alert('🎉 You got it!', '', [
            { text: 'Play again', onPress: () => router.replace('./minigames/WordleScreen') },
            { text: 'Go Back',    onPress: () => router.push('./') }
          ]);
        } else if (next.length === MAX_ROWS) {
          Alert.alert(`The word was ${solution}`, '', [
            { text: 'Try again', onPress: () => router.replace('./minigames/WordleScreen') },
            { text: 'Go Back',   onPress: () => router.push('./') }
          ]);
        }
      } else if (/^[A-Z]$/.test(key) && current.length < WORD_LEN) {
        setCurrent(c => c + key);
      }
    },
    [current, rows, solution, router]
  );

  // Inject camera-driven letter whenever it changes
  useEffect(() => {
    if (autoKey) {
      onKey(autoKey);
    }
  }, [autoKey, onKey]);

  // Colour logic for completed rows
  const getBoxStyle = (row: string, i: number) => {
    const char = row[i];
    if (!solution.includes(char))     return styles.absent;
    if (solution[i] === char)         return styles.correct;
    return styles.present;
  };

  return (
    <View style={styles.container}>
      {/* Grid Display */}
      {Array.from({ length: MAX_ROWS }).map((_, r) => {
        const rowWord = rows[r] ?? (r === rows.length ? current : '');
        return (
          <View style={styles.row} key={`row-${r}`}>
            {Array.from({ length: WORD_LEN }).map((__, c) => (
              <View
                key={`col-${c}`}
                style={[
                  styles.cell,
                  r < rows.length && getBoxStyle(rowWord, c)
                ]}
              >
                <Text style={styles.char}>{rowWord[c] ?? ''}</Text>
              </View>
            ))}
          </View>
        );
      })}

      {/* On-screen Keyboard */}
      <View style={styles.keyboard}>
        <KbKey label="⌫"   wide onPress={() => onKey('⌫')} />
        <KbKey label="ENTER" wide onPress={() => onKey('ENTER')} />
      </View>
    </View>
  );
}

const KbKey = ({
  label,
  onPress,
  wide,
}: {
  label: string;
  onPress: () => void;
  wide?: boolean;
}) => (
  <TouchableOpacity
    onPress={onPress}
    style={[styles.key, wide && styles.keyWide]}
  >
    <Text style={styles.keyText}>{label}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#111' },
  row:       { flexDirection: 'row', alignSelf: 'center', marginBottom: 4 },
  cell:      {
    width: 48, height: 48, margin: 2,
    borderWidth: 2, borderColor: '#3a3a3c',
    justifyContent: 'center', alignItems: 'center',
  },
  char:      { color: '#fff', fontWeight: '700', fontSize: 24 },
  correct:   { backgroundColor: '#538d4e', borderColor: '#538d4e' },
  present:   { backgroundColor: '#b59f3b', borderColor: '#b59f3b' },
  absent:    { backgroundColor: '#3a3a3c', borderColor: '#3a3a3c' },
  keyboard:  { marginTop: 16 },
  key:       {
    borderRadius: 4, paddingVertical: 10, paddingHorizontal: 6,
    backgroundColor: '#818384', marginHorizontal: 2, maxWidth: 28,
    alignItems: 'center',
  },
  keyWide:   { minWidth: 56 },
  keyText:   { color: '#fff', fontWeight: '600', fontSize: 12 },
});
