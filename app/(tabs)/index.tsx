import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useRouter } from 'expo-router';

export default function DashboardScreen() {
  const router = useRouter();

  const handleLogout = () => {
    router.replace('/login' as any);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.menuButton}>
          <Text style={styles.menuIcon}>☰</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleLogout} style={styles.notificationButton}>
          <Text style={styles.notificationIcon}>🔔</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Welcome Section */}
        <View style={styles.welcomeSection}>
          <Text style={styles.welcomeText}>Welcome, <Text style={styles.learnerText}>Learner</Text></Text>
          <Text style={styles.subText}>What do you want to learn?</Text>
        </View>

        {/* Weekly Progress */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Weekly Progress</Text>
          <Text style={styles.cardSubtitle}>Practice more and try to get to our daily goal!</Text>
          
          <View style={styles.progressSection}>
            <View style={styles.progressCircle}>
              <Text style={styles.progressPercentage}>57%</Text>
            </View>
            <TouchableOpacity style={styles.continueButton}>
              <Text style={styles.continueButtonText}>Continue Learning →</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Streak Card */}
        <View style={[styles.card, styles.streakCard]}>
          <Text style={styles.streakTitle}>12 day Streak!</Text>
          <Text style={styles.streakSubtitle}>Congratulations! You've been 3 days!</Text>
        </View>

        {/* FSL Alphabet */}
        <View style={[styles.card, styles.fslCard]}>
          <Text style={styles.fslTitle}>FSL Alphabet</Text>
          <Text style={styles.fslSubtitle}>54% Progress</Text>
          <TouchableOpacity style={styles.continueSmallButton}>
            <Text style={styles.continueSmallButtonText}>Continue Learning →</Text>
          </TouchableOpacity>
        </View>

        {/* Bottom Cards Row */}
        <View style={styles.bottomCardsRow}>
          <TouchableOpacity style={[styles.bottomCard, styles.selfStudyCard]}>
            <Text style={styles.bottomCardTitle}>Self Study</Text>
            <Text style={styles.bottomCardSubtitle}>Test</Text>
            <View style={styles.playButton}>
              <Text style={styles.playButtonText}>▶</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.bottomCard, styles.miniGamesCard]}>
            <Text style={styles.bottomCardTitle}>Mini</Text>
            <Text style={styles.bottomCardSubtitle}>Games</Text>
            <View style={styles.playButton}>
              <Text style={styles.playButtonText}>▶</Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 20,
  },
  menuButton: {
    padding: 8,
  },
  menuIcon: {
    fontSize: 24,
    color: '#333',
  },
  notificationButton: {
    padding: 8,
  },
  notificationIcon: {
    fontSize: 24,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  welcomeSection: {
    marginBottom: 30,
  },
  welcomeText: {
    fontSize: 24,
    color: '#333',
    fontWeight: '500',
  },
  learnerText: {
    fontWeight: 'bold',
    color: '#333',
  },
  subText: {
    fontSize: 16,
    color: '#666',
    marginTop: 4,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  cardSubtitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 16,
  },
  progressSection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  progressCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#e3f2fd',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 4,
    borderColor: '#2196f3',
  },
  progressPercentage: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2196f3',
  },
  continueButton: {
    backgroundColor: '#ff6b6b',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
  },
  continueButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
  },
  streakCard: {
    backgroundColor: '#fff3e0',
    borderLeftWidth: 4,
    borderLeftColor: '#ff9800',
  },
  streakTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  streakSubtitle: {
    fontSize: 14,
    color: '#666',
  },
  fslCard: {
    backgroundColor: '#fce4ec',
    borderLeftWidth: 4,
    borderLeftColor: '#e91e63',
  },
  fslTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  fslSubtitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 16,
  },
  continueSmallButton: {
    backgroundColor: '#e91e63',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 6,
    alignSelf: 'flex-start',
  },
  continueSmallButtonText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '600',
  },
  bottomCardsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  bottomCard: {
    flex: 1,
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
    marginHorizontal: 4,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    minHeight: 120,
  },
  selfStudyCard: {
    backgroundColor: '#e3f2fd',
    borderLeftWidth: 4,
    borderLeftColor: '#2196f3',
  },
  miniGamesCard: {
    backgroundColor: '#fff8e1',
    borderLeftWidth: 4,
    borderLeftColor: '#ffc107',
  },
  bottomCardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 2,
  },
  bottomCardSubtitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 16,
  },
  playButton: {
    position: 'absolute',
    bottom: 16,
    right: 16,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#333',
    justifyContent: 'center',
    alignItems: 'center',
  },
  playButtonText: {
    color: 'white',
    fontSize: 16,
    marginLeft: 2,
  },
});
