import React, { useState } from 'react';
import Head from 'next/head';
import { Box, Container } from '@mui/material';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Banner from '../components/Banner';
import Sidebar from '../components/Sidebar';
import CardListcourse from '../components/CardListcourse';
import Search from '../components/common/Search';
import ButtonChat from '../components/common/ButtonChat';

import './style.scss';

interface SlideItem { id: number;
   link: string; 
   alt: string; }
interface Category { 
  id: string; 
  school: string; 
  branch?: string[]; }
interface Course {
  id: string | number;
  slug: string;
  image: string;
  title: string;
  description: string;
  rating: number;
  price: string;
  school: string;
  branch: string;
  color?: string;
}
interface HomeProps {
  categories: Category[];
  initialCourses: Course[];
  banners: SlideItem[];
}

export async function getStaticProps() {
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
  try {
    const [schoolsRes, cardsRes, bannersRes] = await Promise.all([
      fetch(`${API_BASE_URL}/schools`),
      fetch(`${API_BASE_URL}/cards`),
      fetch(`${API_BASE_URL}/banners`)
    ]);

    const categories = await schoolsRes.json();
    const initialCourses = await cardsRes.json();
    const banners = await bannersRes.json();

    return {
      props: {
        categories: categories || [],
        initialCourses: initialCourses || [],
        banners: banners || [],
      },
      revalidate: 60,
    };
  } catch (error) {
    console.error("Error fetching home data:", error);
    return {
      props: { categories: [], initialCourses: [], banners: [] },
    };
  }
}

export default function HomePage({ categories, initialCourses, banners }: HomeProps) {
  const [filteredCourses, setFilteredCourses] = useState<Course[]>(initialCourses);

  const handleSearchResults = (results: Course[]) => {
    setFilteredCourses(results);
  };

  return (
    <Box className="homepage-root">
      <Head>
        <title>Trang chủ - Ôn Thi Sinh Viên</title>
        <meta name="description" content="Nền tảng ôn thi nhàn, kết quả cao dành cho sinh viên" />
      </Head>

      <Header />

      <Box className="banner-wrapper">
        <Banner slidesData={banners} />
      </Box>

      <Box component="main" className="main-content">
        <Container maxWidth="lg" className="main-container">
          
          <Box className="sidebar-section">
            <Sidebar categories={categories} />
          </Box>
          <Box className="content-section">
            <Box className="search-wrapper">
              <Search 
                courses={initialCourses} 
                onResults={handleSearchResults} 
              />
            </Box>

            <CardListcourse courses={filteredCourses} />
          </Box>
        </Container>
      </Box>
      <ButtonChat link="https://zalo.me/your-id">
        Chat với ôn thi sinh viên
      </ButtonChat>
      <Footer />
    </Box>
  );
}