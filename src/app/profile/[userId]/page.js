'use client';

import { useParams } from 'next/navigation';
import ProfileOverview from '@/components/profile/ProfileOverview';

export default function ProfileByIdPage() {
  const { userId } = useParams();

  // We pass the userId from the URL to the ProfileOverview component
  // The component itself will handle fetching the data for this user
  return <ProfileOverview userId={userId} />;
}
