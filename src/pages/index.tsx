import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { Box, Container, Grid } from '@mui/material';


import Header from '../components/Header';
import Footer from '../components/Footer';
import Banner from '../components/Banner'
import Sidebar from '../components/Sidebar';
import CardListcourse from '../components/CardListcourse';
import Search from '../components/common/Search';
import ButtonChat from '../components/common/ButtonChat';

interface SlideItem {

  id: number ;
  link: string;
  alt: string;
}
interface Category {
  id: string;
  school: string;
  branch?: string[];
}

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

export default function HomePage({ categories, initialCourses, banners }: HomeProps) {

  const [filteredCourses, setFilteredCourses] = useState<Course[]>(initialCourses);

  const handleSearchResults = (results: Course[]) => {
    setFilteredCourses(results);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', bgcolor: '#f5f7f9' }}>
      <Head>
        <title>Trang chủ - Ôn Thi Sinh Viên</title>
        <meta name="description" content="Nền tảng ôn thi nhàn, kết quả cao dành cho sinh viên" />
      </Head>

     
      <Header />
      <Box >

<Banner slidesData={banners} />

</Box>
      <Box component="main" sx={{ flexGrow: 1, py: { xs: 2, md: 4 } }}>
        <Container maxWidth="lg">
          <Grid container spacing={4}>
            
            
            <Grid item xs={12} md={3} sx={{ display: { xs: 'none', md: 'block' } }}>
              <Sidebar categories={categories} />
            </Grid>

           
            <Grid item xs={12} md={9}>
              
             
              <Box sx={{ mb: 3 }}>
                <Search 
                  courses={initialCourses} 
                  onResults={handleSearchResults} 
                />
              </Box>

             
              <CardListcourse courses={filteredCourses} />
              
            </Grid>
          </Grid>
        </Container>
      </Box>

      
      <ButtonChat link="https://zalo.me/your-id">
        Chat với ôn thi sinh viên
      </ButtonChat>

      
      <Footer />
    </Box>
  );
}


export async function getStaticProps() {
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

  try {
    // Gọi đồng thời các API để tối ưu tốc độ build
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
        banners: banners ||[],
      },
      
      revalidate: 60, 
    };
  } catch (error) {
    console.error("Error fetching home data:", error);
    return {
      props: {
        categories: [],
        initialCourses: [],
        banners:[],
      },
    };
  }
}