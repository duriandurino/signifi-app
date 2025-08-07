/* ----------  src/screens/FSLBingoScreen.tsx  ---------- */
import { useRouter } from 'expo-router';
import React, { useEffect, useRef, useState } from 'react';
import { Alert, Animated, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { FSL_SIGNS, FSLSign } from '../../assets/data/FSLSigns';
import { isBingo } from '../../utils/bingo';

/* ---------- types ---------- */
export type CellStatus = 'unmarked' | 'correct' | 'incorrect' | 'free';
interface Cell { sign: FSLSign | null; status: CellStatus }

/* ---------- timing ---------- */
const CALL_MS    = 10_200; // whole window
const FLASH_MS   = 200;    // roulette duration
const FLASH_STEP = 20;     // flash every 50 ms


export default function FSLBingoScreen() {
    const router = useRouter();
    /* ---------- board ---------- */
    const shuffled   = [...FSL_SIGNS].sort(() => Math.random() - 0.5).slice(0, 24);
    const initial    = shuffled.map<Cell>(s => ({ sign: s, status: 'unmarked' }));
    initial.splice(12, 0, { sign: null, status: 'free' }); // centre “Free”

    const [cells, setCells]         = useState<Cell[]>(initial);
    const cellsRef                  = useRef(cells);          // keep latest
    const [display, setDisplay]     = useState<FSLSign | null>(null);

    const currentRef                = useRef<FSLSign | null>(null); // active call
    const timerRef                  = useRef<NodeJS.Timeout | null>(null);     // countdown
    
    /* ---------- progress bar animation ---------- */
    const bar = useRef(new Animated.Value(1)).current;
    const startBar = () => {
        bar.setValue(1);
        Animated.timing(bar, {
        toValue : 0,
        duration: CALL_MS,
        useNativeDriver: false,
        }).start();
    };

    /* ---------- helpers ---------- */
    const pickRandomUnmarked = (): FSLSign | null => {
        const unmarked = cellsRef.current.filter(
            c => c.status === 'unmarked' && c.sign !== null
        );
        if (unmarked.length === 0) return null;

        const randomCell = unmarked[Math.floor(Math.random() * unmarked.length)];
        return randomCell.sign!;
    };


    const markByLabel = (label: string, success: boolean) => {
        setCells(prev =>
            prev.map(c => {
            if (c.sign?.label !== label) return c;
            if (c.status !== 'unmarked') return c;
            return { ...c, status: success ? 'correct' : 'incorrect' };
            })
        );
    };


    const flashAndSet = (target: FSLSign | null) => {
        if (!target) return;
        const flashes: FSLSign[] = [];
        for (let t = 0; t < FLASH_MS; t += FLASH_STEP) {
        flashes.push(FSL_SIGNS[Math.floor(Math.random() * FSL_SIGNS.length)]);
        }
        flashes.push(target);
        let i = 0;
        const id = setInterval(() => {
        setDisplay(flashes[i]);
        i += 1;
        if (i >= flashes.length) clearInterval(id);
        }, FLASH_STEP);
    };

    const nextCall = () => {
        const next = pickRandomUnmarked();
        currentRef.current = next;
        flashAndSet(next);
        startBar();

        /* schedule timeout for this call */
        timerRef.current = setTimeout(() => {
        if (next) markByLabel(next.label, false); // mark red
        nextCall();                               // recurse
        }, CALL_MS);
    };

    /* ---------- mount ---------- */
    useEffect(() => {
        nextCall();               // first call
        return () => clearTimeout(timerRef.current!); // cleanup on unmount
    }, []);

    /* keep ref fresh */
    useEffect(() => { cellsRef.current = cells; }, [cells]);

    /* ---------- win / lose check ---------- */
    useEffect(() => {
        const statusArr = cells.map(c => c.status);
        if (isBingo(statusArr)) {
            clearTimeout(timerRef.current!);
            timerRef.current = null;
        Alert.alert('🎉 Bingo!', 'You covered a full line', [
            { text: 'Play again', onPress: () => router.replace('/minigames/FSLBingoScreen') },
        ]);
        } else if (statusArr.every(s => s !== 'unmarked')) {

        clearTimeout(timerRef.current!);
        timerRef.current = null;
            
        Alert.alert('Game Over', 'No bingo achieved.', [
            { text: 'Try again', onPress: () => router.replace('/minigames/FSLBingoScreen') },
        ]);
        }
    }, [cells]);

    /* ---------- handle correct sign (debug / camera) ---------- */
    const handleCorrectSign = () => {
        const curr = currentRef.current;
        if (!curr) return;

        /* mark green, skip to next */
        markByLabel(curr.label, true);
        clearTimeout(timerRef.current!);
        nextCall();
    };

    /* ---------- render ---------- */
    return (
        <View style={styles.root}>
        {/* header */}
        <View style={styles.header}>
            <View style={styles.callBox}>
            {display && <Image source={display.src} style={styles.callImg} />}
            </View>
            <Animated.View style={[styles.progress, { transform: [{ scaleX: bar }] }]} />
        </View>

        <Text style={styles.title}>FSL Alphabet</Text>

        {/* column letters */}
        <View style={styles.colRow}>
            {['B', 'I', 'N', 'G', 'O'].map(l => (
            <Text key={l} style={styles.colTxt}>{l}</Text>
            ))}
        </View>

        {/* grid */}
        <View style={styles.grid}>
            {cells.map((cell, idx) => (
            <View
                key={idx}
                style={[
                styles.tile,
                cell.status === 'correct' && styles.correct,
                cell.status === 'incorrect' && styles.incorrect,
                ]}
            >
                {cell.sign
                ? <Image source={cell.sign.src} style={styles.tileImg} />
                : <Text style={styles.free}>Free!</Text>}
            </View>
            ))}
        </View>

        {/* debug button – replace with real camera hook */}
        <TouchableOpacity style={styles.debugBtn} onPress={handleCorrectSign}>
            <Text style={styles.debugTxt}>Simulate Correct Sign</Text>
        </TouchableOpacity>
        </View>
    );
}

/* ---------- styles ---------- */
const styles = StyleSheet.create({
  root:      { flex: 1, backgroundColor: '#fff' },

  header:    { height: 100, backgroundColor: '#000', justifyContent: 'center' },
  callBox:   { alignSelf: 'center', backgroundColor: '#fff', padding: 6, borderWidth: 4 },
  callImg:   { width: 70, height: 70, resizeMode: 'contain' },
  progress:  { position: 'absolute', bottom: 0, left: 0, height: 4, width: '100%', backgroundColor: '#46c37b' },

  title:     { fontSize: 32, fontWeight: '700', textAlign: 'center', marginVertical: 12 },
  colRow:    { flexDirection: 'row', justifyContent: 'space-around', marginBottom: 6 },
  colTxt:    { fontSize: 28, fontWeight: '700' },

  grid:      { width: 350, flexDirection: 'row', flexWrap: 'wrap', alignSelf: 'center' },
  tile:      { width: 70, height: 70, borderWidth: 1, justifyContent: 'center', alignItems: 'center' },
  tileImg:   { width: 64, height: 64, resizeMode: 'contain' },
  free:      { fontSize: 16, fontWeight: '600' },

  correct:   { backgroundColor: '#46c37b55' },
  incorrect: { backgroundColor: '#ff6b6b55' },

  debugBtn:  { marginTop: 24, alignSelf: 'center', paddingVertical: 10, paddingHorizontal: 18, backgroundColor: '#5c6ef8', borderRadius: 8 },
  debugTxt:  { color: '#fff', fontWeight: '600' },
});
