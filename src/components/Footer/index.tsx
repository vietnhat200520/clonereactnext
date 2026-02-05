import React from 'react';
import { Box, Container, Typography, Link, List, ListItem } from '@mui/material';
import { LocationOn as LocationOnIcon } from '@mui/icons-material';
import NextLink from 'next/link';


import './style.scss';

// Định nghĩa interface cho menu items
interface FooterItem {
  label: string;
  href: string;
}

const Footer = () => {
  const utilities: FooterItem[] = [
    { label: 'Trang chủ', href: '/' },
    { label: 'Khoá học', href: '/courses' },
    { label: 'Đề thi', href: '/exams' },
  ];

  const policies: FooterItem[] = [
    { label: 'Chính sách bảo mật', href: '/policy' },
    { label: 'Hoàn trả học phí', href: '/refund' },
    { label: 'Hướng dẫn', href: '/guide' },
  ];

  const partners: FooterItem[] = [
    { label: 'Shopee NEU', href: '#' },
    { label: 'Shopee UEH', href: '#' },
    { label: 'Shopee TMU', href: '#' },
  ];

  return (
    <Box component="footer" className="footer-container">
      <Container maxWidth="lg" className="footer-inner">
        <Box className="footer-grid">
          
          {/* Cột 1: Thông tin liên hệ */}
          <Box className="footer-item col-info">
            <Typography className="column-title">THÔNG TIN</Typography>
            <Typography className="footer-text">Email: info@onthisinhvien.vn</Typography>
            <Typography className="footer-text">Hotline: 02473 010 929</Typography>
            <Typography className="footer-text">Giờ làm việc: 8h00 - 11h30, 14h - 17h30</Typography>
            <Box className="footer-address">
              <LocationOnIcon className="footer-icon" />
              <Typography className="footer-text">
                Địa chỉ: Số 355 ngõ Quỳnh, Bạch Mai, Hà Nội
              </Typography>
            </Box>
          </Box>

          {/* Cột 2: Tiện ích */}
          <Box className="footer-item col-util">
            <Typography className="column-title">TIỆN ÍCH</Typography>
            <List disablePadding>
              {utilities.map((item) => (
                <ListItem key={item.label} disablePadding>
                  <NextLink href={item.href} passHref>
                    <Link className="footer-link-item">
                      {item.label}
                    </Link>
                  </NextLink>
                </ListItem>
              ))}
            </List>
          </Box>

          {/* Cột 3: Chính sách */}
          <Box className="footer-item col-policy">
            <Typography className="column-title">CHÍNH SÁCH</Typography>
            <List disablePadding>
              {policies.map((item) => (
                <ListItem key={item.label} disablePadding>
                  <NextLink href={item.href} passHref>
                    <Link className="footer-link-item">
                      {item.label}
                    </Link>
                  </NextLink>
                </ListItem>
              ))}
            </List>
          </Box>

          {/* Cột 4: Liên kết đối tác */}
          <Box className="footer-item col-partner">
            <Typography className="column-title">LIÊN KẾT</Typography>
            <List disablePadding>
              {partners.map((item) => (
                <ListItem key={item.label} disablePadding>
                  <Link 
                    href={item.href} 
                    className="footer-link-item"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {item.label}
                  </Link>
                </ListItem>
              ))}
            </List>
          </Box>
        </Box>
      </Container>
      <Box className="footer-bottom">
        <Typography className="footer-copyright">
          ©2013 - Công ty Cổ phần Đầu tư và Phát triển Koolsoft
        </Typography>
      </Box>
    </Box>
  );
};

export default Footer;