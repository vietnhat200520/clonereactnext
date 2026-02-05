import React, { useState, ChangeEvent } from "react";
import { Pagination, Box } from "@mui/material";
// Đảm bảo đường dẫn import Card đúng với cấu trúc thư mục mới
import Card, { Course } from "./Card";
import './style.scss';

interface CourseListProps {
  courses: Course[];
}

const CARDS_PER_PAGE = 9;

const CardListcourse: React.FC<CourseListProps> = ({ courses }) => {
  const [currentPage, setCurrentPage] = useState<number>(1);

  // Tính toán logic phân trang
  const totalCourses = courses.length;
  const totalPages = Math.ceil(totalCourses / CARDS_PER_PAGE);
  const indexOfLastCard = currentPage * CARDS_PER_PAGE;
  const indexOfFirstCard = indexOfLastCard - CARDS_PER_PAGE;

  // Cắt mảng dữ liệu dựa trên trang hiện tại
  const currentCards = courses.slice(indexOfFirstCard, indexOfLastCard);

  /**
   * Xử lý thay đổi trang
   */
  const handlePageChange = (event: ChangeEvent<unknown>, value: number) => {
    setCurrentPage(value);
    // Cuộn lên đầu trang mượt mà
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <Box className="course-list-wrapper">
      <Box className="course-grid">
        {currentCards.map((course) => (
          <Box key={course.id} className="grid-item">
            <Card course={course} />
          </Box>
        ))}
      </Box>

      {totalCourses > CARDS_PER_PAGE && (
        <Box className="pagination-container">
          <Pagination
            count={totalPages}
            page={currentPage}
            onChange={handlePageChange}
            shape="rounded"
            variant="outlined"
            classes={{ root: 'pagination-root' }}
          />
        </Box>
      )}
    </Box>
  );
};

export default CardListcourse;