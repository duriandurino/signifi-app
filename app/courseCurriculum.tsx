import { Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router'; // <-- STEP 1: Import the router
import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

// --- Define the data structures (Types) ---
interface LessonType {
  type: 'lesson' | 'quiz' | 'drill';
  title: string;
  description?: string;
  isCompleted: boolean;
}

interface ChapterType {
  type: 'chapter';
  title: string;
  isCompleted: boolean;
  lessons?: LessonType[];
}

// --- Data for the course curriculum ---
const courseData: ChapterType[] = [
  {
    type: 'chapter',
    title: 'Chapter 1: Greetings and Introductions',
    isCompleted: true,
  },
  {
    type: 'chapter',
    title: 'Chapter 2: Asking Basic Questions',
    isCompleted: true,
    lessons: [
      {
        type: 'lesson',
        title: 'Lesson 1: Who Is It?',
        description: 'Learn how to ask about people.',
        isCompleted: true,
      },
      {
        type: 'lesson',
        title: 'Lesson 2: What Is It?',
        description: 'Learn how to ask about objects.',
        isCompleted: true,
      },
      {
        type: 'lesson',
        title: 'Lesson 3: When Is It?',
        description: 'Learn how to ask about time, dates, or events.',
        isCompleted: true,
      },
      {
        type: 'lesson',
        title: 'Lesson 4: Yes/No Questions in FSL',
        description: 'Structure and sign basic yes-no questions.',
        isCompleted: true,
      },
      {
        type: 'quiz',
        title: 'Quiz 1: Who, What and When',
        isCompleted: true,
      },
      {
        type: 'quiz',
        title: 'Quiz 2: Asking the right questions',
        isCompleted: true,
      },
      {
        type: 'drill',
        title: 'Practice Drill',
        description:
          'Match and mimic right hand signs with the video presented by the educator.',
        isCompleted: false,
      },
    ],
  },
  {
    type: 'chapter',
    title: 'Chapter 3: Formal and Informal Signs',
    isCompleted: false,
  },
];

const CourseCurriculumScreen = () => {
  const router = useRouter(); // <-- STEP 2: Initialize the router

  // --- Render lesson, quiz, or drill item with typed parameters ---
  const renderLessonItem = (lesson: LessonType, isLast: boolean = false) => (
    <View style={styles.lessonItemContainer} key={lesson.title}>
      {!isLast && <View style={styles.verticalLine} />}
      <View style={styles.lessonIcon}>
        <Feather
          name={lesson.isCompleted ? 'check-circle' : 'circle'}
          size={24}
          color={lesson.isCompleted ? '#2C3E50' : '#B0BEC5'}
        />
      </View>
      <View style={styles.lessonTextContainer}>
        <Text style={styles.lessonTitle}>{lesson.title}</Text>
        {lesson.description && (
          <Text style={styles.lessonDescription}>{lesson.description}</Text>
        )}
      </View>
    </View>
  );

  // --- Render chapter and its lessons with a typed parameter ---
  const renderChapterItem = (chapter: ChapterType) => (
    <View key={chapter.title}>
      <View style={styles.chapterItemContainer}>
        <Feather
          name={chapter.isCompleted ? 'check-circle' : 'circle'}
          size={24}
          color={chapter.isCompleted ? '#C06C6E' : '#B0BEC5'}
        />
        <Text
          style={[
            styles.chapterTitle,
            chapter.isCompleted && styles.completedChapterTitle,
          ]}
        >
          {chapter.title}
        </Text>
      </View>
      <View style={styles.divider} />
      {chapter.lessons && (
        <View style={styles.lessonsList}>
          {chapter.lessons.map((lesson, index) =>
            renderLessonItem(lesson, index === chapter.lessons!.length - 1)
          )}
        </View>
      )}
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        {/* <-- STEP 3: Make the back button functional --> */}
        <TouchableOpacity onPress={() => router.back()}>
          <Feather name="arrow-left" size={24} color="#2C3E50" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Course Details</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.mainCourseTitle}>
          Course Title here
        </Text>
        {courseData.map((chapter) => renderChapterItem(chapter))}
      </ScrollView>
    </SafeAreaView>
  );
};

// ... (Your styles remain the same)
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
    marginTop: 30,
    borderBottomWidth: 1,
    borderBottomColor: '#EAEAEA',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '900',
    color: '#2C3E50',
  },
  scrollContainer: {
    padding: 20,
  },
  mainCourseTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginBottom: 25,
  },
  chapterItemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  chapterTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginLeft: 12,
  },
  completedChapterTitle: {
    color: '#C06C6E',
  },
  divider: {
    height: 1,
    backgroundColor: '#EAEAEA',
    marginBottom: 20,
  },
  lessonsList: {
    marginLeft: 12,
    marginBottom: 15,
  },
  lessonItemContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginLeft: 1,
    position: 'relative',
    paddingBottom: 20,
  },
  lessonIcon: {
    zIndex: 1,
    backgroundColor: '#FFFFFF',
  },
  lessonTextContainer: {
    marginLeft: 12,
    flex: 1,
  },
  lessonTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2C3E50',
  },
  lessonDescription: {
    fontSize: 14,
    color: '#7F8C8D',
    marginTop: 4,
  },
  verticalLine: {
    position: 'absolute',
    left: 11,
    top: 10,
    bottom: 0,
    width: 2,
    backgroundColor: '#E0E0E0',
  },
});


export default CourseCurriculumScreen;