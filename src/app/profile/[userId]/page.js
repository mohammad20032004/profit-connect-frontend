"use client";

import { useParams } from 'next/navigation';
import ProfileOverview from '@/components/profile/ProfileOverview';

export default function ProfileByIdPage() {
  const { userId } = useParams();

  return <ProfileOverview userId={userId} />;
}




