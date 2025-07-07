import { Redirect } from 'expo-router';

export default function Index() {
  // For now, redirect to login. In a real app, you'd check authentication state
  return <Redirect href="/(auth)/login" />;
}