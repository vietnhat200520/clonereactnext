import React from "react";
import { Box, Typography, Rating } from "@mui/material";
import Link from 'next/link';
import './style.scss';
import GroupIcon from '@mui/icons-material/Group';

export interface Course {
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

interface CourseCardProps {
  course: Course;
}

const Card: React.FC<CourseCardProps> = ({ course }) => {
  return (
    <Link href={`/course/course/${course.slug}`} passHref>
      <Box component="a" className="course-card-root">
     
        <Box className="card-image-wrapper">
          {course.image ? (
            <img
              src={course.image}
              alt={course.title}
              className="course-img-element"
            />
          ) : (
            <Box 
              className="placeholder-image" 
              sx={{ backgroundColor: course.color || '#ccc' }}
            >
              <Typography variant="caption" className="placeholder-text">
                {course.school?.toUpperCase()}
              </Typography>
            </Box>
          )}
        </Box>

       
        <Box className="card-info">
          <Typography variant="subtitle1" component="h4" className="card-title">
            {course.title}
          </Typography>

          <Typography variant="body2" className="card-description">
            {course.description}
          </Typography>

        
          <Box className="card-footer">
            <Box className="rating-section">
            <GroupIcon/>
              <Typography variant="caption" className="rating-count">
                  {course.rating} Đánh giá 
              </Typography>
            </Box>
            
            <Typography variant="subtitle2" classes={{root: 'price-tag'}}>
              {course.price}
            </Typography>
          </Box>
        </Box>
      </Box>
    </Link>
  );
};

export default Card;