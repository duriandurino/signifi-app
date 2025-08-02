import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';


import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

const courses = [
  {
    id: 1,
    title: 'FSL Alphabet',
    description: 'Learn the fundamentals of French Sign Language alphabet',
    progress: 54,
    color: '#e91e63',
    lessons: 26,
  },
  {
    id: 2,
    title: 'Basic Greetings',
    description: 'Master common greetings and introductions',
    progress: 23,
    color: '#2196f3',
    lessons: 15,
  },
  {
    id: 3,
    title: 'Numbers & Counting',
    description: 'Learn to sign numbers from 1 to 100',
    progress: 0,
    color: '#ff9800',
    lessons: 20,
  },
  {
    id: 4,
    title: 'Family & Relationships',
    description: 'Signs for family members and relationships',
    progress: 0,
    color: '#4caf50',
    lessons: 18,
  },
  {
    id: 5,
    title: 'Daily Activities',
    description: 'Common activities and daily routines',
    progress: 0,
    color: '#9c27b0',
    lessons: 24,
  },
  {
    id: 6,
    title: 'Colors & Shapes',
    description: 'Visual concepts and descriptions',
    progress: 0,
    color: '#ff5722',
    lessons: 12,
  },
];
export default function CourseScreen() {
  const router = useRouter();

  const [selectedFilter, setSelectedFilter] = useState<'all' | 'myLearning' | 'inProgress' | 'completed' | 'saved' | 'offline'>('all');

   const filteredCourses = courses.filter((course) => {
    if (selectedFilter === 'inProgress') return course.progress > 0 && course.progress < 100;
    if (selectedFilter === 'completed') return course.progress === 100;
    if (selectedFilter === 'myLearning') return course.progress > 0;
    return true;
  });

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity>
          <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Courses</Text>
        <View style={{ width: 24 }} />
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <TextInput
          placeholder="Search for Courses"
          placeholderTextColor="#999"
          style={styles.searchInput}
        />
        <TouchableOpacity style={styles.searchButton}>
          <Ionicons name="search" size={20} color="white" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.filterSearchButton}>
          <MaterialIcons name="tune" size={20} color="white" />
        </TouchableOpacity>
      </View>

      {/* Filter Buttons */}
      <View style={styles.filterSection}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {['all', 'myLearning', 'inProgress', 'completed', 'saved', 'offline'].map(filter => (
            <TouchableOpacity
              key={filter}
              style={[
                styles.filterButton,
                selectedFilter === filter && styles.activeFilter,
              ]}
              onPress={() => setSelectedFilter(filter as any)}
            >
              <Text style={selectedFilter === filter ? styles.activeFilterText : styles.filterText}>
                {filter === 'all' ? 'All' :
                 filter === 'myLearning' ? 'My Learning' :
                 filter === 'inProgress' ? 'In Progress' :
                 filter === 'completed' ? 'Completed' :
                 filter === 'saved' ? 'Saved' : 'Offline Courses'}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* CONDITIONAL COURSE VIEWS */}
      {selectedFilter === 'all' && (
        <>
          <Text style={styles.sectionTitle}>Advanced / Recommended Courses</Text>
         <ScrollView
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.horizontalScroll}
>
            <TouchableOpacity
              style={styles.courseCard}
              onPress={() => router.push('/courseDetails')} 
            >
              <Image
                source={require('../../assets/images/workplacee.png')}
                style={styles.courseImage}
              />
              <Text style={styles.courseCardTitle}>Workplace Sign Language</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.courseCard}
              onPress={() => router.push('/courseDetails')} 
            >
              <Image
                source={require('../../assets/images/signlanguage.png')}
                style={styles.courseImage}
              />
              <Text style={styles.courseCardTitle}>Deaf Culture & FSL Etiquette</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.courseCard}
              onPress={() => router.push('/courseDetails')} 
            >
              <Image
                source={require('../../assets/images/signlanguage.png')}
                style={styles.courseImage}
              />
              <Text style={styles.courseCardTitle}>Deaf Culture & FSL Etiquette</Text>
            </TouchableOpacity>
          </ScrollView>
          
          <Text style={styles.sectionTitle}>More Courses:</Text>
          <View style={styles.verticalList}>
            <TouchableOpacity onPress={() => router.push('/courseDetails')} style={styles.listItem}>
              <Image
                source={require('../../assets/images/folderic.png')}
                style={styles.listImage}
              />
              <View style={styles.listText}>
                <Text style={styles.courseTitle}>Conversational FSL: At Home & School</Text>
                <Text style={styles.courseSubtitle}>
                  Understand phrases used in family and classroom settings.
                </Text>
                <Text style={styles.metaText}>👩‍🏫 SigniFi • 2 months ago</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => router.push('/courseDetails')} style={styles.listItem}>
              <Image
                source={require('../../assets/images/folderic.png')}
                style={styles.listImage}
              />
              <View style={styles.listText}>
                <Text style={styles.courseTitle}>FSL for Everyday Conversations</Text>
                 <Text style={styles.courseSubtitle}>
                  Desciption here
                </Text>
                <Text style={styles.metaText}>👩‍🏫 SigniFi • 2 months ago</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => router.push('/courseDetails')} style={styles.listItem}>
              <Image
                source={require('../../assets/images/folderic.png')}
                style={styles.listImage}
              />
              <View style={styles.listText}>
                <Text style={styles.courseTitle}>Alphabet & Numbers 101</Text>
                <Text style={styles.courseSubtitle}>
                  Desciption here
                </Text>
                <Text style={styles.metaText}>👩‍🏫 SigniFi • 2 months ago</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => router.push('/courseDetails')} style={styles.listItem}>
              <Image
                source={require('../../assets/images/folderic.png')}
                style={styles.listImage}
              />
              <View style={styles.listText}>
                <Text style={styles.courseTitle}>Basic Greetings & Introductions in FSL</Text>
                <Text style={styles.courseSubtitle}>
                  Desciption here
                </Text>
                <Text style={styles.metaText}>👩‍🏫 SigniFi • 2 months ago</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => router.push('/courseDetails')} style={styles.listItem}>
              <Image
                source={require('../../assets/images/folderic.png')}
                style={styles.listImage}
              />
              <View style={styles.listText}>
                <Text style={styles.courseTitle}>Basic Handshapes and Gestures</Text>
                <Text style={styles.courseSubtitle}>
                  Desciption here
                </Text>
                <Text style={styles.metaText}>👩‍🏫 SigniFi • 2 months ago</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => router.push('/courseDetails')} style={styles.listItem}>
              <Image
                source={require('../../assets/images/folderic.png')}
                style={styles.listImage}
              />
              <View style={styles.listText}>
                <Text style={styles.courseTitle}>FSL Grammar & Sentence Structure</Text>
                <Text style={styles.courseSubtitle}>
                  Desciption here
                </Text>
                <Text style={styles.metaText}>👩‍🏫 SigniFi • 2 months ago</Text>
              </View>
            </TouchableOpacity>
          </View>

        </>
      )}

      {selectedFilter === 'inProgress' && (
        <View>
          <Text style={styles.sectionTitle}>Courses In Progress</Text>

          <View style={styles.coursesSection}>
            {courses
              .filter((course) => course.progress > 0 && course.progress < 100)
              .map((course) => (
              <TouchableOpacity key={course.id} style={styles.courseProgressCard}>
                <View style={styles.courseHeader}>
                  <View style={[styles.courseIcon, { backgroundColor: course.color }]}>
                    <Text style={styles.courseIconText}>📚</Text>
                  </View>
                  <View style={styles.courseInfo}>
                    <Text style={styles.courseProgressTitle}>{course.title}</Text>
                    <Text style={styles.courseDescription}>{course.description}</Text>
                    <Text style={styles.courseLessons}>{course.lessons} lessons</Text>
                  </View>
                </View>
                
                <View style={styles.courseProgress}>
                  <View style={styles.progressBar}>
                    <View 
                      style={[
                        styles.progressFill, 
                        { width: `${course.progress}%`, backgroundColor: course.color }
                      ]} 
                    />
                  </View>
                  <Text style={styles.progressText}>{course.progress}%</Text>
                </View>
                
                <View style={styles.courseActions}>
                  <TouchableOpacity style={[styles.actionButton, styles.primaryButton]}>
                    <Text style={styles.primaryButtonText}>
                      {course.progress > 0 ? 'Continue' : 'Start'}
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={[styles.actionButton, styles.secondaryButton]}>
                    <Text style={styles.secondaryButtonText}>Preview</Text>
                  </TouchableOpacity>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      )}


      {selectedFilter === 'completed' && (
        <View>
          <Text style={styles.sectionTitle}>Completed Courses</Text>
          {/* Your Completed courses design */}
        </View>
      )}

      {selectedFilter === 'saved' && (
        <View>
          <Text style={styles.sectionTitle}>Saved Courses</Text>
          {/* Your Saved courses design */}
        </View>
      )}

      {selectedFilter === 'offline' && (
        <View>
          <Text style={styles.sectionTitle}>Offline Courses</Text>
          {/* Your Offline courses design */}
        </View>
      )}
    </ScrollView>
  );
}


const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f7f9fc',
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 50,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 900,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  searchInput: {
    flex: 1,
    backgroundColor: 'white',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 10,
    marginRight: 8,
    fontSize: 16,
  },
  searchButton: {
    backgroundColor: '#364153',
    padding: 10,
    borderRadius: 12,
    marginRight: 6,
  },
  filterSearchButton: {
    backgroundColor: '#364153',
    padding: 10,
    borderRadius: 12,
  },
  sectionTitle: {
    fontWeight: '900',
    fontSize: 14,
    marginBottom: 12,
    color: '#333',
  },
  horizontalScroll: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 24,
  },
  courseProgressCard: {
    width: 400,
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
    marginBottom: 15,

  },
  courseImage: {
    width: '100%',
    height: 100,
    borderRadius: 12,
    marginBottom: 8,
  },
  courseCardTitle: {
    marginTop: 5,
    fontSize: 12,
    fontWeight: '700',
  },
  verticalList: {
    gap: 10,
    marginBottom: 40,
  },
  listItem: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 10,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  listImage: {
    width: 50,
    height: 50,
    borderRadius: 12,
    marginRight: 15,
  },
  listText: {
    flex: 1,
    justifyContent: 'center',
  },
  courseProgressTitle: {
    fontSize: 15,
    fontWeight: '700',
  },
  courseSubtitle: {
    fontSize: 13,
    color: '#555',
    marginBottom: 10,
  },
  metaText: {
    fontSize: 12,
    color: '#888',
  },
  filterSection: {
    marginBottom: 20,
  },
  filterButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    marginRight: 10,
    backgroundColor: '#e8e8e8',
  },
  activeFilter: {
    backgroundColor: '#364153',
  },
  filterText: {
    color: '#666',
    fontSize: 14,
    fontWeight: '500',
  },
  activeFilterText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '500',
  },
   coursesSection: {
    paddingBottom: 20,
  },
  courseCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    width: 150,
  
    padding: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  courseHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  courseIcon: {
    width: 50,
    height: 50,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  courseIconText: {
    fontSize: 24,
  },
  courseInfo: {
    flex: 1,
  },
  courseTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  courseDescription: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
    marginBottom: 4,
  },
  courseLessons: {
    fontSize: 12,
    color: '#999',
  },
  courseProgress: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  progressBar: {
    flex: 1,
    height: 6,
    backgroundColor: '#e8e8e8',
    borderRadius: 3,
    marginRight: 12,
  },
  progressFill: {
    height: '100%',
    borderRadius: 3,
  },
  progressText: {
    fontSize: 12,
    color: '#666',
    fontWeight: '500',
  },
  courseActions: {
    flexDirection: 'row',
    gap: 12,
  },
  actionButton: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  primaryButton: {
    backgroundColor: '#4a5568',
  },
  secondaryButton: {
    backgroundColor: '#e8e8e8',
  },
  primaryButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
  },
  secondaryButtonText: {
    color: '#666',
    fontSize: 14,
    fontWeight: '600',
  },
});
