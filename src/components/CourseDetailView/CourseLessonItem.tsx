import React from 'react';
import { ListItem, ListItemIcon, ListItemText, Typography, Box } from '@mui/material';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import { ILesson } from '@/types/types';

interface Props {
  lesson: ILesson;
  isLast: boolean;
}

const CourseLessonItem: React.FC<Props> = ({ lesson, isLast }) => {
  const itemClasses = isLast ? "lesson-item-root is-last-lesson" : "lesson-item-root";

  return (
    <ListItem classes={{ root: itemClasses }}>
      <Box className="timeline-line" />
      <Box className="order-badge">{lesson.order}</Box>

      <Box className="lesson-content-box">
        <ListItemIcon className="lesson-icon-wrapper-inner">
          {lesson.type === 'video' ? (
            <PlayCircleIcon fontSize="small" />
          ) : (
            <MenuBookIcon fontSize="small" />
          )}
        </ListItemIcon>

        <ListItemText
          primary={
            <Typography variant="subtitle2" className="lesson-title">
              {lesson.title}
            </Typography>
          }
          secondary={lesson.subTitle}
        />

        <Typography className="progress-indicator">{lesson.progress}</Typography>
      </Box>
    </ListItem>
  );
};

export default CourseLessonItem;