import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Box, Typography } from '@mui/material';
import { RootState, AppDispatch } from '@/store/store';
import { fetchCourseDetail } from '@/store/slices/courseSlice';
import CourseContentList from './CourseContentList';
import CourseTitle from './CourseTitle';
import CourseIntroduction from './CourseIntroduction';
import './style.scss';

interface Props {
  courseSlug: string; 
}

const CourseDetailView: React.FC<Props> = ({ courseSlug }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { currentCourse, status } = useSelector((state: RootState) => state.course);

  useEffect(() => {
    if (courseSlug) {
      dispatch(fetchCourseDetail(courseSlug));
    }
  }, [courseSlug, dispatch]);

  if (status === 'loading' || !currentCourse) {
    return <Typography align="center" sx={{ py: 10 }}>Đang tải dữ liệu khóa học...</Typography>;
  }

  return (
    <Box className="course-detail-view-root">
      <Container maxWidth="md">
        <CourseTitle courseName={currentCourse.title} />

        <CourseIntroduction 
          title={currentCourse.title}
          description={`Hey, chào bạn, mình là Admin của OTSV Team. Mình sẽ là người đồng hành cùng bạn trong "${currentCourse.title}" lần này.`}
          points={currentCourse.Introduction || []} 
        />

        <Box className="content-header-labels">
          <Typography variant="button" className="label-text">
            Tên bài học
          </Typography>
          <Typography variant="button" className="label-text">
            Tiến độ học
          </Typography>
        </Box>

        <CourseContentList sections={currentCourse.sections} />
      </Container>
    </Box>
  );
};

export default CourseDetailView;