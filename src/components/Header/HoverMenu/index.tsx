import React, { useState, useRef, MouseEvent } from 'react';
import { Button, Menu, MenuItem, Box, Typography } from '@mui/material';
import { useRouter } from 'next/router'; 
import './style.scss';

interface HoverMenuItem {
  label: string;
  href: string;
}

interface HoverMenuProps {
  items?: HoverMenuItem[];
  buttonLabel?: string;
  baseHref?: string;
}

const HoverMenu: React.FC<HoverMenuProps> = ({ 
  items = [], 
  buttonLabel = "KHOÁ HỌC", 
  baseHref = '#' 
}) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const open = Boolean(anchorEl);
  const router = useRouter();

  const handleMouseEnter = (event: MouseEvent<HTMLElement>) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setAnchorEl(event.currentTarget);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setAnchorEl(null);
    }, 200);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleItemClick = (path: string) => {
    router.push(path);
    handleMenuClose();
  };

  return (
    <Box 
      className="hovermenu-wrapper"
      onMouseEnter={handleMouseEnter} 
      onMouseLeave={handleMouseLeave} 
    >
      <Button
        classes={{ root: 'hovermenu-button' }}
        onClick={() => router.push(baseHref)}
      >
        {buttonLabel}
      </Button>
      
      <Menu
        id="hover-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleMenuClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        transformOrigin={{ vertical: 'top', horizontal: 'center' }}
        disableRestoreFocus
        disableScrollLock
        disableAutoFocusItem
        className="hovermenu-root"
        classes={{ paper: 'hovermenu-paper' }}
      >
        <Box className="hovermenu-list-container">
          {items.map((item, index) => (
            <MenuItem 
              key={`${item.label}-${index}`} 
              disableRipple
              onClick={() => handleItemClick(item.href)}
              classes={{ root: 'hovermenu-item' }}
            >
              <Typography className="hovermenu-link">
                {item.label}
              </Typography>
            </MenuItem>
          ))}
        </Box>
      </Menu>
    </Box>
  );
};

export default HoverMenu;