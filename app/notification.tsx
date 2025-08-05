import React, { useEffect, useRef, useState } from 'react';
import { Animated, Easing, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

interface NotificationProps {
  visible: boolean;
  onClose: () => void; 
}

const Notification: React.FC<NotificationProps> = ({ visible, onClose }) => {
  const slideAnim = useRef(new Animated.Value(-500)).current;

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    if (visible) {
      setIsMounted(true);
      Animated.timing(slideAnim, {
        toValue: 50, 
        duration: 350,
        easing: Easing.out(Easing.ease), 
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(slideAnim, {
        toValue: -500,
        duration: 300,
        easing: Easing.in(Easing.ease),
        useNativeDriver: true,
       }).start(({ finished }) => {
        if (finished) {
          setIsMounted(false);
        }
      });
    }
  }, [visible, slideAnim]);

   if (!isMounted) {
    return null;
  }

  const notifications = [
    { icon: 'fire', text: "Keep your streak alive! Practice today's FSL module now", time: '1 minute ago' },
    { icon: 'hand-paper-o', text: 'You’ve mastered 5 new signs! Great job!', time: '6 hours ago' },
    { icon: 'file-text-o', text: 'You’ve completed 70% of the Alphabet module. Almost there!', time: '8 hours ago' },
    { icon: 'pencil', text: 'New lesson available: “Learn Common Phrases - Part 2', time: '11 hours ago' },
    { icon: 'bullseye', text: 'Tip of the Day: Practice fingerspelling with a mirror!', time: '18 hours ago' },
  ];

  return (
    <Animated.View style={[styles.container, { transform: [{ translateY: slideAnim }] }]}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Notifications</Text>
        <TouchableOpacity>
          <Icon name="cog" size={24} color="#333" />
        </TouchableOpacity>
      </View>
      {notifications.map((item, index) => (
        <View key={index} style={styles.notificationItem}>
          <Icon name={item.icon} size={22} color="#555" />
          <View style={styles.notificationTextContainer}>
            <Text style={styles.notificationText}>{item.text}</Text>
            <Text style={styles.notificationTime}>{item.time}</Text>
          </View>
        </View>
      ))}
      {/* 3. Connect the onClose function to the button */}
      <TouchableOpacity onPress={onClose} style={styles.markAllButton}>
        <Text style={styles.markAllButtonText}>Mark All as Read</Text>
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 50, 
    left: 80,
    right: 10,
    backgroundColor: '#fff',
    borderRadius: 15, // A slightly larger radius
    padding: 15,
    zIndex: 1000, // Important: ensures it floats over all other content
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 5,
    elevation: 8, // For Android shadow
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0'
  },
  headerText: {
    fontSize: 20,
    fontWeight: '600',
  },
  notificationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
  },
  notificationTextContainer: {
    marginLeft: 20,
    flex: 1, 
  },
  notificationText: {
    fontSize: 15,
    lineHeight: 22, 
  },
  notificationTime: {
    fontSize: 12,
    color: '#888',
    marginTop: 4,
  },
  markAllButton: {
    alignItems: 'center',
    marginTop: 15,
  },
  markAllButtonText: {
    color: '#007AFF', // Standard iOS blue
    fontSize: 16,
    fontWeight: '600',
  },
});

export default Notification;