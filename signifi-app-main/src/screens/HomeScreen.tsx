import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

export default function HomeScreen({ navigation }: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome!</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Wordle')}
      >
        <Text style={styles.buttonText}>Play Wordle</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Handman')}
      >
        <Text style={styles.buttonText}>Play Handman</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('FSLBingo')}
      >
        <Text style={styles.buttonText}>Play FSL Bingo</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  title:     { fontSize: 24, marginBottom: 24 },
  button:    { backgroundColor: '#5c6ef8', padding: 12, borderRadius: 8 },
  buttonText:{ color: 'white', fontWeight: '600' },
});
