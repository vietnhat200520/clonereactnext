import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '@/store/hook';
import { logout } from '@/store/slices/authSlice';
import { useIsMounted } from '@/hooks/useIsMounted';
import { 
  AppBar, Toolbar, Box, Typography, Container, Link, 
  IconButton, useMediaQuery, Collapse 
} from '@mui/material';
import NextLink from 'next/link';
import MenuIcon from '@mui/icons-material/Menu';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

import AuthRegister from './AuthRegister';
import AuthLogin from './AuthLogin';
import UserHeaderAction from './UserHeaderAction'; 
import HoverMenu from './HoverMenu';
import AuthButton from './ButtonAuth';
import './style.scss';

interface SchoolData { id: string; school: string; href: string; }
interface MenuItemFormat { label: string; href: string; }

const Header: React.FC = () => {
  const dispatch = useDispatch();
  const isMounted = useIsMounted();
  const { isAuthenticated, user } = useAppSelector((state) => state.auth);

  const [mobileOpen, setMobileOpen] = useState<boolean>(false);
  const [courseItems, setCourseItems] = useState<MenuItemFormat[]>([]);
  const [modalState, setModalState] = useState<'closed' | 'login' | 'register'>('closed');
  
  const isDesktop = useMediaQuery('(min-width:1000px)');
  const hideLogoText = useMediaQuery('(max-width:650px)');

  useEffect(() => {
    const fetchSchools = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/schools');
        const data: SchoolData[] = await response.json();
        const formattedItems = data.map(item => ({ label: item.school, href: item.href }));
        setCourseItems(formattedItems);
      } catch (error) { 
        console.error("Failed to fetch schools:", error); 
      }
    };
    fetchSchools();
  }, []);

  const handleLogout = () => dispatch(logout());

  const MenuContent = ({ isVertical = false }: { isVertical?: boolean }) => (
    <Box className={`menu-content-box ${isVertical ? 'is-vertical' : 'is-horizontal'}`}>
      <Link  href="/" classes={{root:'nav-link'}}>TRANG CHỦ</Link>
      <HoverMenu items={courseItems} buttonLabel="KHOÁ HỌC" baseHref="/khoa-hoc" />
      <Link  href="/kich-hoat" className="nav-link">KÍCH HOẠT</Link>
      
      {isMounted && !isAuthenticated && (
        <IconButton className="header-cart-icon"><ShoppingCartIcon /></IconButton>
      )}
    </Box>
  );

  return (
    <AppBar position="sticky" classes={{ root: 'custom-header-appbar' }}>
      <Container maxWidth={false} disableGutters className="header-inner-container">
        <Toolbar classes={{ root: 'header-main-toolbar' }}>
          
          <Box className="header-logo-section">
            <NextLink href="/" > 
                <Box  className="logo-link">
              <img 
                src="https://onthisinhvien.com/_next/image?url=%2Fimages%2Flogo-otsv.png&w=128&q=75" 
                alt="Logo" 
                className="logo-img"
              />
              {!hideLogoText && (
                <Typography className="logo-text">
                  Ôn thi nhàn, Kết quả cao
                </Typography>
              )}
              </Box>
            </NextLink>
          </Box>

          {isDesktop ? <MenuContent /> : (
            <IconButton onClick={() => setMobileOpen(!mobileOpen)} className="mobile-menu-toggle">
              <MenuIcon />
            </IconButton>
          )}

          <Box className="header-auth-section">
            {isMounted && (
              isAuthenticated && user ? (
                <UserHeaderAction user={user} cartCount={0} onLogout={handleLogout} />
              ) : (
                <Box className="auth-buttons-group">
                  <AuthButton label="ĐĂNG NHẬP" onClick={() => setModalState('login')} variant="outlined" />
                  <AuthButton label="ĐĂNG KÝ" onClick={() => setModalState('register')} variant="contained" color="error" />
                </Box>
              )
            )}
          </Box>
        </Toolbar>
      </Container>

      {!isDesktop && (
        <Collapse in={mobileOpen} timeout="auto" unmountOnExit>
          <Box className="mobile-dropdown-container">
            <MenuContent isVertical={true} />
          </Box>
        </Collapse>
      )}

      <AuthLogin 
        open={modalState === 'login'} 
        onClose={() => setModalState('closed')} 
        onSwitchToRegister={() => setModalState('register')} 
      />
      <AuthRegister 
        open={modalState === 'register'} 
        onClose={() => setModalState('closed')} 
        onSwitchToLogin={() => setModalState('login')} 
      />
    </AppBar>
  );
};

export default Header;