import { Redirect } from 'expo-router';

export default function Index() {
  // For now, redirect to phone verification. In a real app, you'd check authentication state
  return <Redirect href="/(auth)/phone-verification" />;
}