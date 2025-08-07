import { useRouter } from 'expo-router';
import React, { useCallback, useMemo, useState } from 'react';
import {
  Alert,
  StyleSheet,
  Text, TouchableOpacity,
  View,
} from 'react-native';

const WORDS = ['PLANT', 'BRAVE', 'SHARE', 'MANGO', 'CLOUD']; // put a real list here!
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
          Alert.alert('🎉 You got it!', '', [
            { text: 'Play again', onPress: () => router.replace('/minigames/WordleScreen') },
            { text: 'Go Back', onPress: () => router.push('/') }
          ]);
        } else if (nextRows.length === MAX_ROWS) {
          Alert.alert(`The word was ${solution}`, '', [
            { text: 'Try again', onPress: () => router.replace('/minigames/WordleScreen') },
            { text: 'Go Back', onPress: () => router.push('/') }
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
    <View style={styles.container}>
      {/* Grid */}
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
    </View>
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
  container: { flex: 1, padding: 16, backgroundColor: '#111' },
  row: { flexDirection: 'row', alignSelf: 'center', marginBottom: 4 },
  cell: {
    width: 48, height: 48, margin: 2,
    borderWidth: 2, borderColor: '#3a3a3c',
    justifyContent: 'center', alignItems: 'center',
  },
  char: { color: '#fff', fontWeight: '700', fontSize: 24 },
  correct: { backgroundColor: '#538d4e', borderColor: '#538d4e' },
  present: { backgroundColor: '#b59f3b', borderColor: '#b59f3b' },
  absent:  { backgroundColor: '#3a3a3c', borderColor: '#3a3a3c' },

  keyboard: { marginTop: 16 },
  kbRow:    { flexDirection: 'row', justifyContent: 'center', marginBottom: 8 },
  key:      {
    borderRadius: 4, paddingVertical: 10, paddingHorizontal: 6,
    backgroundColor: '#818384', marginHorizontal: 2, minWidth: 28,
    alignItems: 'center',
  },
  keyWide:  { minWidth: 56 },
  keyText:  { color: '#fff', fontWeight: '600', fontSize: 12 },
});
