import React from 'react';
import CourseSectionItem from './CourseSectionItem';
import { ISection } from '@/types/types';
import { Box } from '@mui/material';

interface Props {
  sections: ISection[];
}

const CourseContentList: React.FC<Props> = ({ sections }) => {
  return (
    <Box className="course-content-list">
      {sections.map((section) => (
        <CourseSectionItem key={section.sectionId} section={section} />
      ))}
    </Box>
  );
};

export default CourseContentList;