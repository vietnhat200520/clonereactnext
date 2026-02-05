import React from 'react';
import { Box, Typography, Tabs, Tab, Paper } from '@mui/material';

interface Props {
  title: string;
  description: string;
  points: string[]; 
}

const CourseIntroduction: React.FC<Props> = ({ title, description, points }) => {
  const [tabValue, setTabValue] = React.useState(0);

  return (
    <Box className="course-intro-wrapper">
      <Tabs 
        value={tabValue} 
        onChange={(_, val) => setTabValue(val)}
        className="course-tabs"
      >
        <Tab label="Nội dung" className="tab-item" />
        <Tab label="Bình luận" className="tab-item" />
      </Tabs>

      <Paper elevation={0} className="intro-content-paper">
        <Typography variant="h5" className="intro-title">
          {title} - Chinh phục A+
        </Typography>
        
        <Typography variant="body1" className="intro-description">
          {description}
        </Typography>

        <Typography variant="subtitle1" className="points-header">
          {title} có gì?
        </Typography>

        <ul className="intro-points-list">
          {points && points.map((point, index) => (
            <li key={index}>
              <Typography variant="body1">{point}</Typography>
            </li>
          ))}
        </ul>
        
        <Typography align="right" color="primary" className="view-more-text">
          Xem thêm ⌵
        </Typography>
      </Paper>
    </Box>
  );
};

export default CourseIntroduction;