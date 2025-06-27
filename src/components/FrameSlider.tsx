import { Box, Typography, Card, CardContent } from '@mui/material';
import Image from 'next/image';
import React, { useRef, useEffect, useState, useCallback } from 'react';

interface CardProps {
  items: any[];
  width?: number;
  height?: number;
  showDot?: boolean;
  showButton?: boolean;
  showBottom?: boolean;
  autoPlay?: boolean;
  visibleCards?: number;
}

const FrameSlider: React.FC<CardProps> = ({ items, autoPlay = false }) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const touchStartX = useRef(0);
  const touchStartY = useRef(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const [visibleCards, setVisibleCards] = useState(3);
  const [cardWidth, setCardWidth] = useState(320);
  const [imgHeight, setImgHeight] = useState(170);
  const [cardHeight, setCardHeight] = useState(360);
  const transitionRef = useRef<boolean>(true);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    const handleResize = () => {
      if (!containerRef.current) return;
      
      const containerWidth = containerRef.current.offsetWidth;
      const maxCardWidth = 180; 
      
      const calculatedWidth = Math.round((containerWidth - 32) / 3);
      setCardWidth(Math.min(maxCardWidth, calculatedWidth));
      setVisibleCards(3);
      
      if (calculatedWidth > 150) {
        setImgHeight(100);
        setCardHeight(260);
      } else if (calculatedWidth > 120) {
        setImgHeight(90);
        setCardHeight(240);
      } else {
        setImgHeight(80);
        setCardHeight(180);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handlePrev = useCallback(() => {
    setCurrentIndex((prevIndex) => {
      const newIndex = prevIndex - 1;
      if (newIndex < 0) {
        setTimeout(() => {
          transitionRef.current = false;
          setCurrentIndex(items.length - 1);
        }, 500);
        return 0;
      }
      return newIndex;
    });
  }, [items.length]);

  const handleNext = useCallback(() => {
    setCurrentIndex((prevIndex) => {
      const newIndex = prevIndex + 1;
      if (newIndex >= items.length) {
        setTimeout(() => {
          transitionRef.current = false;
          setCurrentIndex(0);
        }, 500);
        return items.length - 1;
      }
      return newIndex;
    });
  }, [items.length]);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const touchEndX = e.changedTouches[0].clientX;
    const touchEndY = e.changedTouches[0].clientY;
    const diffX = touchStartX.current - touchEndX;
    const diffY = touchStartY.current - touchEndY;
    if (Math.abs(diffX) > Math.abs(diffY)) {
      if (diffX > 50) {
        handleNext();
      } else if (diffX < -50) {
        handlePrev();
      }
    }
  };

  useEffect(() => {
    transitionRef.current = true;
  }, [currentIndex]);

  const NavigationButton = ({ direction }: { direction: 'left' | 'right' }) => (
    <Box
      className={`absolute top-1/2 -translate-y-1/2 z-10 cursor-pointer ${
        direction === 'left' ? 'left-4' : 'right-4'
      }`}
      onClick={direction === 'left' ? handlePrev : handleNext}>
      <svg
        width="48"
        height="48"
        viewBox="0 0 48 48"
        fill="#ffffff"
        xmlns="http://www.w3.org/2000/svg">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d={direction === 'left' 
            ? "M28.6507 13.9072C28.7505 13.9927 28.8324 14.097 28.8918 14.2142C28.9513 14.3314 28.987 14.4591 28.997 14.5901C29.0071 14.7211 28.9912 14.8528 28.9503 14.9777C28.9094 15.1025 28.8443 15.2181 28.7587 15.3178L21.3174 24.0005L28.7587 32.6832C28.8492 32.782 28.919 32.8981 28.9638 33.0244C29.0085 33.1508 29.0275 33.2849 29.0194 33.4187C29.0113 33.5525 28.9764 33.6833 28.9168 33.8034C28.8572 33.9235 28.774 34.0303 28.6722 34.1176C28.5705 34.2048 28.4522 34.2708 28.3244 34.3114C28.1967 34.3521 28.0621 34.3666 27.9286 34.3542C27.7951 34.3418 27.6655 34.3027 27.5474 34.2391C27.4294 34.1756 27.3253 34.089 27.2414 33.9845L19.2414 24.6512C19.0861 24.4699 19.0007 24.2391 19.0007 24.0005C19.0007 23.7618 19.0861 23.531 19.2414 23.3498L27.2414 14.0165C27.414 13.8154 27.6594 13.6911 27.9237 13.6708C28.1879 13.6506 28.4494 13.7361 28.6507 13.9085"
            : "M19.3493 13.9072C19.5507 13.7349 19.8123 13.6496 20.0766 13.6701C20.3408 13.6906 20.5862 13.8152 20.7586 14.0165L28.7586 23.3498C28.9139 23.531 28.9992 23.7618 28.9992 24.0005C28.9992 24.2391 28.9139 24.4699 28.7586 24.6512L20.7586 33.9845C20.5833 34.1759 20.3404 34.2917 20.0813 34.3073C19.8222 34.3229 19.5671 34.2372 19.3701 34.0682C19.1731 33.8992 19.0495 33.6602 19.0254 33.4017C19.0014 33.1433 19.0788 32.8856 19.2413 32.6832L26.6826 24.0005L19.2413 15.3178C19.0687 15.1167 18.983 14.8553 19.003 14.5911C19.023 14.3268 19.1471 14.0813 19.3479 13.9085"
          }
          fill={'#637381'}
        />
      </svg>
    </Box>
  );

  return (
    <Box ref={containerRef} className="relative w-full">
      <Box
        className="w-full mx-auto flex flex-col flex-nowrap justify-start items-center"
        style={{ height: `${cardHeight}px` }}>
        <Box
          style={{ height: cardHeight + 'px' }}
          className="relative w-full overflow-x-hidden">
          <NavigationButton direction="left" />
          <NavigationButton direction="right" />
          <Box
            className="absolute inset-0 flex transition-transform duration-500 gap-[16px] ease-in-out justify-center"
            style={{
              transition: 'transform 0.5s ease',
              transform: `translateX(calc(-${currentIndex * (100 / visibleCards)}% + ${(100 - (100 / visibleCards) * 3) / 2}%))`
            }}>
            {items.map((item, index) => (
              <Box
                key={index}
                onTouchStart={handleTouchStart}
                onTouchEnd={handleTouchEnd}
                className="absolute p-4 gap-4"
                style={{
                  border: 'rgb(28, 37, 46) 1px solid',
                  borderRadius: '6px',
                  marginLeft: '120px',
                  width: '280px',
                  left: `${index * (100 / visibleCards)}%`
                }}>
                <Box className="flex flex-col items-center justify-start">
                <Typography
                      className="text-[16px]"
                      sx={{
                        color: '#ffffff',
                        fontFamily: 'Barlow',
                        fontWeight: '700',
                        overflowY: 'hidden',
                        maxHeight: '40px',
                        lineHeight: '1.2'
                      }}>
                      {item?.title}
                    </Typography>
                  <Box
                      style={{ borderRadius: '5px', backgroundColor: '#000000', width: '240px', height: '140px', marginTop: '10px' }}
                    />
                  <CardContent className="p-3 flex flex-col items-center justify-center" >
                    
                    <Typography
                      style={{
                        color: '#637381',
                        fontFamily: 'Public Sans',
                        marginTop: '4px',
                        fontSize: '12px',
                        fontWeight: '400',
                        lineHeight: '1.4',
                        maxHeight: '40px',
                        overflow: 'hidden'
                      }}
                      className="w-full">
                      {item?.description}
                    </Typography>
                  </CardContent>
                </Box>
              </Box>
            ))}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default FrameSlider;

