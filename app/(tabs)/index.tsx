import Ionicons from '@expo/vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';


import React from 'react';
import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';



export default function DashboardScreen() {
  const router = useRouter();
  const navigation = useNavigation();


  const handleLogout = () => {
    router.replace('/login' as any);
  };

  const goToCourse = () => {
    router.push('/course');
  };



  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      
      {/* Header */}
      <View style={styles.header}>
        {/* App Title on the left */}
        <Text style={styles.appTitle}>.</Text>

        <View style={styles.headerRight}>
          <TouchableOpacity style={styles.notificationButton}>
            <Ionicons
              name="notifications"
              size={30}
              color="#364153"
              style={{ marginTop: 20, marginRight: 10 }}
            />
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuButton}>
            <Ionicons
              name="menu-sharp"
              size={38}
              color="#364153"
              style={{ marginTop: 20 }}
            />
          </TouchableOpacity>
        </View>
      </View>


      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Welcome Section */}
        <View style={styles.welcomeSection}>
          <Text style={styles.welcomeText}>Welcome, <Text style={styles.learnerText}>Learner</Text></Text>
          <Text style={styles.subText}>What do you want to learn?</Text>
        </View>

       <View style={[styles.card, styles.fslCard, { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }]}>
          <View style={{ flex: 1 }}>
            <Text style={styles.fslTitle}>FSL Alphabets</Text>
            <Text style={styles.fslSubtitle}>Learn Alphabets</Text>
             <TouchableOpacity style={styles.continueSmallButton}>
              <Text style={styles.continueSmallButtonText}>Continue Learning →</Text>
            </TouchableOpacity>
          </View>

          {/* ✅ Add image on the right */}
          <Image
           source={require('../../assets/images/learning.png')}
            style={styles.fslImage}
            resizeMode="contain"
          />
        </View>

      {/* Popular Courses Section Title */}
        <View style={styles.courseHeader}>
          <Text style={styles.courseHeaderTitle}>Popular Courses</Text>
          <TouchableOpacity
            onPress={() => router.push('/course')} 
            >
            <Text style={styles.courseHeaderButton}>See All Courses</Text>
          </TouchableOpacity>
        </View>

       <View style={styles.cardCourseRow}>
        {/* Card 1 */}
        <View style={styles.cardCourse}>
          <Image
            source={require('../../assets/images/course1.png')}
            style={styles.cardCourseImage}
          />
          <View style={styles.cardCourseTextContainer}>
            <Text style={styles.cardCourseTitle}>Deaf Culture & FSL Etiqutte</Text>
            <Text style={styles.cardCourseDescription}>
              Understand the cultural context behind signs and Deaf community values.
            </Text>
          </View>
        </View>

        {/* Card 2 */}
        <View style={styles.cardCourse}>
          <Image
            source={require('../../assets/images/deafculture.png')}
            style={styles.cardCourseImage}
          />
          <View style={styles.cardCourseTextContainer}>
            <Text style={styles.cardCourseTitle}>Deaf Culture & FSL Etiquette</Text>
            <Text style={styles.cardCourseDescription}>
              Understand the cultural context behind signs and Deaf community values.
            </Text>
          </View>
        </View>
      </View>


       {/* Divider Section */}
        <Text style={styles.sectionDivider}>Test your Abilities</Text>

        {/* Vertical Cards */}
        <View style={styles.verticalCards}>
        {/* Self Study Card */}
        <TouchableOpacity style={[styles.verticalCard, styles.selfStudyCard]}>
          <Image
            source={require('../../assets/images/studyTest.png')}
            style={styles.cardTestImage}
          />
          <View style={styles.cardContent}>
            <Text style={styles.cardTestTitle}>Self Study Test</Text>
            <Text style={styles.cardTestSubTitle}>No pressure—just you and the signs.</Text>
          </View>
          <View style={styles.playButton}>
            <Text style={styles.playButtonText}>▶</Text>
          </View>
        </TouchableOpacity>

        {/* Mini Games Card */}
        <TouchableOpacity style={[styles.verticalCard, styles.miniGamesCard]}
          onPress={() => router.push('/minigames')} 
        >
          <Image
            source={require('../../assets/images/game.png')}
            style={styles.cardTestImage}
          />
          <View style={styles.cardContent}>
            <Text style={styles.cardTestTitle}>Mini Games</Text>
            <Text style={styles.cardTestSubTitle}>Learn through play and fun!</Text>
          </View>
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
    paddingTop: 20,
    paddingBottom: 10,
  },

  appTitle: {
    fontFamily: 'PlaywriteAUNSW-Regular',
    fontSize: 20,
    color: '#024A70',
    left: 5,
    marginTop: 20,
  },

  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  menuButton: {
    padding: 8,
  },

  menuIcon: {
    marginTop: 30,
    fontSize: 30,
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
    left: 5,
    marginBottom: 20,
  },
  welcomeText: {
    fontSize: 22,
    color: '#333',
    fontWeight: '600',
    top: 10,
  },
  learnerText: {
    fontSize: 23,
    fontFamily: 'Poppins-SemiBold',
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
    padding: 0,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
   cardWelcome: {
    height: 170,
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 0,
    paddingBottom: 0,
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
    fontWeight: '900',
    color: '#333',
    left: 140,
    top: 20,
    marginBottom: 25,
  },
  cardSubtitle1: {
    fontSize: 14,
    color: '#666',
    left: 140,
  },

  cardSubtitle2: {
    fontSize: 14,
    color: '#666',
    left: 140,
    marginBottom: 10,
  },
  progressSection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  progressCircle: {
    width: 100,
    height: 100,
    bottom: 70,
    left: 20,
    borderRadius: 50,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 10,
    borderColor: '#34495E',
  },
  progressPercentage: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#34495E',
  },
  continueButton: {
    backgroundColor: '#1C69A8',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 20,
    right: 85,
    bottom: 25,
  },
  continueButtonText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '600',
  },
  cardStreak: {
  backgroundColor: 'white',
  borderRadius: 25,
  padding: 10,
  marginBottom: 16,

  // ✅ iOS shadow
  shadowColor: '#000',
  shadowOffset: {
    width: 0,
    height: 2,
  },
  shadowOpacity: 0.1,
  shadowRadius: 4,

  // ✅ Android shadow
  elevation: 4,
},

  streakCard: {
    backgroundColor: '#FFF1F2',
  },
  streakTitle: {
    fontSize: 15,
    right: 10,
    fontWeight: '700',
    color: '#9F0712',
    marginBottom: 4,
  },
  streakSubtitle: {
    fontSize: 13,
    color: 'black',
    right: 10,
  },
  streakImage: {
  width: 80,
  height: 70,
  },
  fslCard: {
    backgroundColor: '#C6D2FF',
    borderLeftWidth: 4,
    borderLeftColor: '#C6D2FF',
  },
  fslTitle: {
    fontSize: 18,
    fontWeight: '900',
    color: '#1E1A4D',
    left: 25,
    marginBottom: 4,
  },

  fslSubtitle: {
    fontSize: 14,
    color: '#666',
    left: 25,
    marginBottom: 16,
  },

  fslImage: {
  width: 200,
  height: 150,
  top: 10,
  left: 10,
  bottom: 10,
  },

  continueSmallButton: {
     backgroundColor: '#312C85',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 6,
    left: 20,
    alignSelf: 'flex-start',
  },
  continueSmallButtonText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '600',
  },
   cardImage: {
    width: '100%',
    height: 140,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  cardTextContainer: {
    padding: 15,
  },
  cardDescription: {
    fontSize: 14,
    color: '#555',
  },
  bookmarkIcon: {
    position: 'absolute',
    top: 15,
    right: 15,
    color: '#333',
  },
  courseHeader: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginTop: 20,
  marginBottom: 20,
    paddingHorizontal: 4,
  },
  courseHeaderTitle: {
    fontSize: 15,
    fontWeight: '900',
    top: 5,
    color: '#111',
  },
  courseHeaderButton: {
    top: 3,
    fontSize: 13,
    fontWeight: 800,
    color: '#10598A', 
    borderBottomWidth: 1,
    borderBottomColor: '#10598A',
    alignSelf: 'flex-start', 
    paddingBottom: 2,
  },
  cardCourseRow: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  marginBottom: 10,
},

cardCourse: {
  backgroundColor: 'white',
  borderRadius: 16,
  padding: 12,
  width: '48%',
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.1,
  shadowRadius: 4,
  elevation: 3,
},

cardCourseImage: {
  width: '100%',
  height: 100,
  borderRadius: 12,
  marginBottom: 8,
  
},

cardCourseTextContainer: {
  flexDirection: 'column',
},

cardCourseTitle: {
  fontSize: 13,
  fontWeight: 'bold',
  marginBottom: 4,
},

cardCourseDescription: {
  fontSize: 11,
  color: '#555',
},

  sectionDivider: {
  fontSize: 15,
  fontWeight: '900',
  color: 'black',
  marginVertical: 10,
  textAlign: 'left',
  marginBottom: 15,
  },

  verticalCards: {
  flexDirection: 'column',
  gap: 0, 
},

  verticalCard: {
  flexDirection: 'row', 
  alignItems: 'center',
  backgroundColor: 'white',
  borderRadius: 12,
  padding: 12,
  height: 80,
  marginBottom: 12,
  position: 'relative',
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.1,
  shadowRadius: 4,
  elevation: 2,
},

selfStudyCard: {
  backgroundColor: 'white',
  borderLeftWidth: 0,
},

miniGamesCard: {
  backgroundColor: 'white',
  borderLeftWidth: 0,
},

cardTestImage: {
  width: 40,
  height: 40,
  borderRadius: 8,
  marginLeft: 10,
  marginRight: 17,
},

cardContent: {
  flex: 1,
  justifyContent: 'center',
},

cardTestTitle: {
  fontSize: 14,
  fontWeight: '900',
  color: '#333',
  marginBottom: 2,
},

cardTestSubTitle: {
  fontSize: 12,
  fontWeight: '600',
  color: '#333',
  marginBottom: 2,
},
cardSubtitle: {
  fontSize: 16,
  fontWeight: '900',
  color: '#333',
},

playButton: {
  position: 'absolute',
  right: 16,
  top: 40,
  transform: [{ translateY: -20 }],
  width: 40,
  height: 40,
  borderRadius: 20,
  backgroundColor: '#FFA2A2',
  justifyContent: 'center',
  alignItems: 'center',
},

playButtonText: {
  color: 'white',
  fontSize: 16,
},

});
