import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Box } from '@mui/material';
import './style.scss';

interface SlideItem {
  id: number | string;
  link: string;
  alt: string;
}

interface BannerProps {
  slidesData?: SlideItem[];
}

const INTERVAL = 4000;
const TRANS_MS = 100;
const FLASH_MS = 100;

const Banner: React.FC<BannerProps> = ({ slidesData = [] }) => {
  const [current, setCurrent] = useState<number>(0);
  const [slideClasses, setSlideClasses] = useState<string[]>(slidesData.map(() => ''));
  
  const currentRef = useRef(current);
  useEffect(() => {
    currentRef.current = current;
  }, [current]);

  const numSlides = slidesData.length;

  const nextSlide = useCallback(() => {
    if (numSlides <= 1) return;

    const currentIdx = currentRef.current;
    const next = (currentIdx + 1) % numSlides;

    // 1. Chuẩn bị slide tiếp theo (top)
    setSlideClasses(prev => {
      const updated = [...prev];
      updated[next] = 'top';
      return updated;
    });

    // 2. Kích hoạt flash cho slide hiện tại
    setSlideClasses(prev => {
      const updated = [...prev];
      updated[currentIdx] = 'flash';
      return updated;
    });

    // 3. Xóa flash
    setTimeout(() => {
      setSlideClasses(prev => {
        const updated = [...prev];
        if (updated[currentIdx] === 'flash') updated[currentIdx] = '';
        return updated;
      });
    }, FLASH_MS + 20);

    // 4. Kích hoạt transition (active)
    requestAnimationFrame(() => {
      setSlideClasses(prev => {
        const updated = [...prev];
        updated[next] = 'top active';
        return updated;
      });
    });

    // 5. Dọn dẹp slide cũ
    setTimeout(() => {
      setSlideClasses(prev => {
        const updated = [...prev];
        updated[currentIdx] = '';
        return updated;
      });
    }, 20);

    // 6. Hoàn tất dọn dẹp sau transition
    setTimeout(() => {
      setSlideClasses(() => {
        const reset = slidesData.map(() => '');
        reset[next] = 'active';
        return reset;
      });
      setCurrent(next);
    }, TRANS_MS + 40);

  }, [numSlides, slidesData]);

  // Autoplay
  useEffect(() => {
    if (numSlides <= 1) return;
    const timer = setInterval(nextSlide, INTERVAL);
    return () => clearInterval(timer);
  }, [nextSlide, numSlides]);

  // Khởi tạo slide đầu tiên
  useEffect(() => {
    if (numSlides > 0 && !slideClasses.some(c => c.includes('active'))) {
      setSlideClasses(prev => {
        const updated = [...prev];
        updated[0] = 'active';
        return updated;
      });
    }
  }, [numSlides, slideClasses]);

  return (
    <Box component="section" className="banner-root">
      <Box className="banner-container">
        {slidesData.map((slide, index) => (
          <img
            key={slide.id}
            src={slide.link}
            alt={slide.alt}
            style={{ 
              transform: slideClasses[index].includes('active') || slideClasses[index].includes('top') 
                ? 'translateX(0)' 
                : 'translateX(100%)',
              visibility: slideClasses[index].includes('active') || slideClasses[index].includes('top')
                ? 'visible' 
                : 'hidden',
            }}
            className={`slide-item ${slideClasses[index]}`}
          />
        ))}
      </Box>
    </Box>
  );
};

export default Banner;