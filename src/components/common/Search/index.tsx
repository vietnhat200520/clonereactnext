import React, { useState, useEffect, KeyboardEvent } from "react";
import { TextField, InputAdornment, IconButton, Box, Typography } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { Course } from "../../CardListcourse/Card"; 
import './style.scss';

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
  const [localQuery, setLocalQuery] = useState<string>(query);

  useEffect(() => {
    setLocalQuery(query);
  }, [query]);

  const handleSearch = (): void => {
    const q = localQuery.trim().toLowerCase();
    const filtered = q
      ? courses.filter((c) => c.title.toLowerCase().includes(q))
      : courses;

    onQueryChange?.(localQuery);
    onResults?.(filtered);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>): void => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <Box className="search-container">
      {/* Phần hiển thị tiêu đề và số lượng khóa học */}
      <Box className="search-title-group">
        <Typography variant="h6" className="title-text">
          Tất cả khóa học
        </Typography>
        <Typography className="count-text">
          ({courses.length} Khoá học)
        </Typography>
      </Box>

      {/* Ô tìm kiếm */}
      <TextField
        classes={{ root: 'search-field-root' }}
        value={localQuery}
        onChange={(e) => setLocalQuery(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Tìm kiếm khoá học..."
        variant="outlined"
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
    </Box>
  );
}

export default Search;