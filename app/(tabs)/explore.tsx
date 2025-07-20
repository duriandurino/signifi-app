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

export default function CoursesScreen() {
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

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      
      <ScrollView style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title}>Courses</Text>
          <Text style={styles.subtitle}>Explore available learning modules</Text>
        </View>

        <View style={styles.filterSection}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <TouchableOpacity style={[styles.filterButton, styles.activeFilter]}>
              <Text style={styles.activeFilterText}>All</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.filterButton}>
              <Text style={styles.filterText}>In Progress</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.filterButton}>
              <Text style={styles.filterText}>Completed</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.filterButton}>
              <Text style={styles.filterText}>New</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>

        <View style={styles.coursesSection}>
          {courses.map((course) => (
            <TouchableOpacity key={course.id} style={styles.courseCard}>
              <View style={styles.courseHeader}>
                <View style={[styles.courseIcon, { backgroundColor: course.color }]}>
                  <Text style={styles.courseIconText}>📚</Text>
                </View>
                <View style={styles.courseInfo}>
                  <Text style={styles.courseTitle}>{course.title}</Text>
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
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  header: {
    paddingTop: 20,
    paddingBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
  },
  filterSection: {
    marginBottom: 20,
  },
  filterButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    marginRight: 12,
    backgroundColor: '#e8e8e8',
  },
  activeFilter: {
    backgroundColor: '#4a5568',
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
    fontSize: 18,
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
