import { useEffect } from 'react';
import { useRouter } from 'expo-router';

export default function Index() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to login page when app starts
    router.replace('/login' as any);
  }, []);

  return null;
} 