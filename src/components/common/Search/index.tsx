import React, { useState, useEffect, KeyboardEvent } from "react";
import { TextField, InputAdornment, IconButton } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { Course } from "../../CardListcourse/Card"; // Cập nhật đường dẫn import interface
import './style.scss';

/**
 * Interface cho Props của Search component
 */
interface SearchProps {
  courses?: Course[];
  query?: string;
  onQueryChange?: (newQuery: string) => void;
  onResults?: (filteredCourses: Course[]) => void;
}

const Search: React.FC<SearchProps> = ({
  courses = [],
  query = "",
  onQueryChange,
  onResults,
}) => {
  // Quản lý giá trị nhập tạm thời tại local component
  const [localQuery, setLocalQuery] = useState<string>(query);

  // Đồng bộ localQuery khi prop query từ cha thay đổi
  useEffect(() => {
    setLocalQuery(query);
  }, [query]);

  /**
   * Hàm thực hiện lọc dữ liệu
   */
  const handleSearch = (): void => {
    const q = localQuery.trim().toLowerCase();
    
    // Thực hiện lọc dựa trên tiêu đề khóa học
    const filtered = q
      ? courses.filter((c) => c.title.toLowerCase().includes(q))
      : courses;

    // Gửi giá trị query và kết quả lọc về cho component cha
    onQueryChange?.(localQuery);
    onResults?.(filtered);
  };

  /**
   * Xử lý khi người dùng nhấn phím Enter
   */
  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>): void => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <TextField
      classes={{ root: 'search-field-root' }}
      value={localQuery}
      onChange={(e) => setLocalQuery(e.target.value)}
      onKeyDown={handleKeyDown}
      placeholder="Tìm kiếm khoá học..."
      variant="outlined"
      fullWidth
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton
              aria-label="Tìm kiếm"
              onClick={handleSearch}
              edge="end"
              size="small"
              className="search-button"
            >
              <SearchIcon className="search-icon" />
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  );
}

export default Search;