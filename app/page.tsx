"use client"
import React from 'react';
import dynamic from 'next/dynamic';

const StudentDashboard = dynamic(() => import('./_components/Dashboard'), {
  ssr: false,
});

const Page = () => {
  return <StudentDashboard />;
};

export default Page;