import { Feather } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React from 'react';
import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const IncludedItem = ({
  iconName,
  text,
  iconColor,
}: {
  iconName: any;
  text: string;
  iconColor: string;
}) => (
  <View style={styles.includedItem}>
    <Feather name={iconName} size={20} color={iconColor} style={styles.includedIcon} />
    <Text style={styles.includedText}>{text}</Text>
  </View>
);

const CourseDetailsScreen = () => {
  const router = useRouter();
  const { title, image } = useLocalSearchParams();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()}>
            <Feather name="arrow-left" size={24} color="#2C3E50" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Course Details</Text>
          <View style={{ width: 24 }} />
        </View>

        {/* Main Content Card */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Text style={styles.courseTitle}>{title || 'Course Title here'}</Text>
            <TouchableOpacity>
              <Feather name="bookmark" size={24} color="#2C3E50" />
            </TouchableOpacity>
          </View>

          <Text style={styles.courseStats}>12 Chapters   50 Lessons   15 Quizzes</Text>

          <Text style={styles.courseDescription}>
            Understand phrases used in family and classroom settings.
          </Text>

          <View style={styles.ratingContainer}>
            <Text style={styles.ratingText}>5.5</Text>
            <View style={styles.stars}>
              {[...Array(5)].map((_, i) => (
                <Feather key={i} name="star" size={16} color="#FFD700" style={{ marginRight: 2 }} />
              ))}
            </View>
            <Text style={styles.learnersText}>400 Learners Enrolled</Text>
          </View>

          <View style={styles.infoRow}>
            <Image
              source={require('../assets/images/teacher.png')}
              style={styles.teacherAvatar}
            />
            <Text style={styles.infoTextTeacher}>Teacher SigniFi</Text>
          </View>

          <View style={styles.infoRow}>
            <Feather name="check-circle" size={24} color="#2C3E50" />
            <Text style={styles.infoText}>Beginner Friendly Level</Text>
          </View>

          <Text style={styles.includesTitle}>This Course includes:</Text>

          <IncludedItem
            iconName="video"
            text="Video lessons from licensed FSL teachers"
            iconColor="#8E44AD"
          />
          <IncludedItem
            iconName="award"
            text="Practice drills to improve your signing"
            iconColor="#E67E22"
          />
          <IncludedItem
            iconName="aperture"
            text="Interactive games to test your skills"
            iconColor="#2ECC71"
          />

          <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10}}>
            <Feather name="tag" size={20} color="black" style={{ marginRight: 10 }} />
            <Text style={styles.priceText}>₱ 200.00</Text>
          </View>

          {/* Preview this Course Button */}
          <TouchableOpacity 
             style={styles.previewCourse}
             onPress={() => router.push('./courseCurriculum')} 
             >
            <Text style={styles.previewCourseText}>Preview Course</Text>
          </TouchableOpacity>

         <TouchableOpacity style={styles.purchaseButton}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Feather name="shopping-cart" size={18} color="white" style={{ marginRight: 10 }} />
            <Text style={styles.purchaseButtonText}>Purchase this Course</Text>
          </View>
        </TouchableOpacity>
        </View>
                                
      {/* About this Course Button */}
        <TouchableOpacity
        style={styles.aboutButton}
         >
        <Text style={styles.aboutButtonText}>About this Course</Text>
        <Feather name="chevron-right" size={20} color="#2C3E50" />
      </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default CourseDetailsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  scrollContainer: {
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 30,
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '900',
    color: '#2C3E50',
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    marginTop: 10,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  courseTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: '#2C3E50',
    flex: 1,
    marginRight: 10,
  },
  courseStats: {
    fontSize: 14,
    color: '#7F8C8D',
    marginTop: 10,
    marginBottom: 16,
  },
  courseDescription: {
    fontSize: 16,
    color: '#34495E',
    marginBottom: 10,
  },

  priceText: {
    fontSize: 15,
    fontWeight: 900,
    color: 'black',
    marginTop: 10,
    marginBottom: 10,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  ratingText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginRight: 8,
  },
  stars: {
    flexDirection: 'row',
    marginRight: 8,
  },
  learnersText: {
    fontSize: 14,
    color: '#7F8C8D',
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  teacherAvatar: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginRight: 0,
  },
  infoText: {
    fontSize: 14,
    color: '#2C3E50',
    marginLeft: 10,
  },
  infoTextTeacher: {
    fontSize: 14,
    fontWeight: 900,
    color: '#2C3E50',
    marginLeft: 10,
  },
  includesTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginTop: 10,
    marginBottom: 5,
  },
  includedItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    marginBottom: -10,
  },
  includedIcon: {
    marginRight: 15,
  },
  includedText: {
    fontSize: 14,
    color: '#34495E',
  },
  previewCourse:{
    marginTop: 20,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#364153',
    borderRadius: 10,
    paddingVertical: 13,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  previewCourseText:{
    fontWeight: 900,
    fontSize: 14,
    color: '#364153',
  },
  purchaseButton: {
    backgroundColor: '#364153',
    borderRadius: 10,
    paddingVertical: 13,
    alignItems: 'center',
    marginTop: 10,
  },
  purchaseButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 'bold',
  },
  aboutButton: {
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  aboutButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2C3E50',
  },
});
