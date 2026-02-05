import React from 'react';
import { Breadcrumbs, Link, Typography, Box } from '@mui/material';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import NextLink from 'next/link';

interface Props {
  courseName: string;
}

const CourseTitle: React.FC<Props> = ({ courseName }) => {
  return (
    <Box className="course-title-header">
      <Breadcrumbs 
        separator={<NavigateNextIcon fontSize="small" />} 
        className="course-breadcrumbs"
      >
        
  <Link classes={{root:'title-category-course'}}   href="/">
    Trang chủ
  </Link>
        
        
        <Link classes={{root:'title-category-course'}} href="/danh-muc" >
          Danh mục khoá học
        </Link>
       
        <Typography classes={{root:'title-course'}} >
          {courseName.toUpperCase()}
        </Typography>
      </Breadcrumbs>

      <Typography variant="h5" className="main-course-name">
        {courseName.toUpperCase()}
      </Typography>
    </Box>
  );
};

export default CourseTitle;