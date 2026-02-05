import React from 'react';
import { GetServerSideProps } from 'next';
import CourseDetailView from '@/components/CourseDetailView';
import Header from "@/components/Header";
import Footer from '@/components/Footer';
import { Box } from '@mui/material';

interface PageProps {
  slug: string;
}


export default function CoursePage({ slug }: PageProps) {
  return (
    <Box component="main" sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header />
      
    
      <Box sx={{ flexGrow: 1 }}>
        <CourseDetailView courseSlug={slug} />
      </Box>
      
      <Footer />
    </Box>
  );
}


export const getServerSideProps: GetServerSideProps = async (context) => {
  const { slug } = context.params as { slug: string };

  return {
    props: {
      slug, 
    },
  };
};