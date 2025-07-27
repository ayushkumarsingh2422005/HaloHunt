"use client";
import { useParams } from 'next/navigation';
import ResetPasswordPage from '../page';

export default function ResetPasswordWithToken() {
  const params = useParams();
  const resettoken = params.resettoken;
  
  console.log('Reset token from URL:', resettoken);
  
  return <ResetPasswordPage initialToken={resettoken} />;
} 