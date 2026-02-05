import React from 'react';
import { Accordion, AccordionSummary, AccordionDetails, Typography, Box, List, ListItemIcon } from '@mui/material';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight'; 
import LaunchIcon from '@mui/icons-material/Launch';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import CourseLessonItem from './CourseLessonItem';
import { ISection } from '@/types/types';

interface Props {
  section: ISection;
}

const CourseSectionItem: React.FC<Props> = ({ section }) => {
  if (section.displayType === 'standalone') {
    return (
      <Box className="standalone-root">
        <Box className="standalone-left">
          <ListItemIcon className="standalone-icon-wrapper">
            {section.type === 'video' ? <PlayCircleIcon /> : <MenuBookIcon />}
          </ListItemIcon>
          <Box ml={1}>
            <Typography variant="subtitle2" className="section-title-text">
              {section.title}
            </Typography>
            <Typography variant="caption" color="textSecondary">
              {section.subTitle}
            </Typography>
          </Box>
        </Box>
        <Box className="standalone-right">
          <Typography className="progress-indicator">{section.progress || '-'}</Typography>
          <LaunchIcon className="launch-icon-style" />
        </Box>
      </Box>
    );
  }

  return (
    <Accordion 
      className="section-accordion-root"
      defaultExpanded={true}
      elevation={0}
    >
      <AccordionSummary 
        expandIcon={<KeyboardDoubleArrowRightIcon className="custom-expand-icon" />} 
        className="accordion-summary-reverse"
      >
        <Box className="summary-content-wrapper">
          <Box>
            <Typography variant="subtitle2" className="section-title-text">
              {section.title}
            </Typography>
            <Typography variant="caption" color="textSecondary">
              {section.description}
            </Typography>
          </Box>
          <LaunchIcon className="launch-icon-style" />
        </Box>
      </AccordionSummary>
      <AccordionDetails sx={{ p: 0 }}>
        <List disablePadding>
          {section.lessons.map((lesson, index) => (
            <CourseLessonItem 
              key={lesson.id} 
              lesson={lesson} 
              isLast={index === section.lessons.length - 1} 
            />
          ))}
        </List>
      </AccordionDetails>
    </Accordion>
  );
};

export default CourseSectionItem;