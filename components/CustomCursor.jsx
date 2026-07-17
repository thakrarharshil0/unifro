'use client'
import { useState, useEffect, useRef } from 'react';

const CustomCursor = () => {
  
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [dotPosition, setDotPosition] = useState({ x: 0, y: 0 });
  const [circlePosition, setCirclePosition] = useState({ x: 0, y: 0 });
  const [cursorType, setCursorType] = useState('default'); // 'default', 'image', 'video', 'transparent', 'play-video'
  const [isVisible, setIsVisible] = useState(false);
  const animationFrameRef = useRef(null);
  const isAnimatingRef = useRef(false);
  const mousePositionRef = useRef({ x: 0, y: 0 });
  const dotPositionRef = useRef({ x: 0, y: 0 });
  const circlePositionRef = useRef({ x: 0, y: 0 });
  const cursorTypeRef = useRef('default');
  const isVisibleRef = useRef(false);

  useEffect(() => {
    let targetX = 0;
    let targetY = 0;

    const updateMousePosition = (e) => {
      targetX = e.clientX;
      targetY = e.clientY;
      mousePositionRef.current = { x: e.clientX, y: e.clientY };
      setMousePosition({ x: e.clientX, y: e.clientY });
      if (!isVisibleRef.current) {
        isVisibleRef.current = true;
        setIsVisible(true);
        // Start animation when mouse first moves
        if (!isAnimatingRef.current) {
          isAnimatingRef.current = true;
          animationFrameRef.current = requestAnimationFrame(animate);
        }
      }
    };

    // Smooth animation for dot following - runs continuously
    const animate = () => {
      if (!isVisibleRef.current) {
        isAnimatingRef.current = false;
        return;
      }

      // Animate dot following mouse
      const currentDotX = dotPositionRef.current.x;
      const currentDotY = dotPositionRef.current.y;
      
      const newDotX = currentDotX + (targetX - currentDotX) * 0.25;
      const newDotY = currentDotY + (targetY - currentDotY) * 0.25;
      
      dotPositionRef.current = { x: newDotX, y: newDotY };
      setDotPosition({ x: newDotX, y: newDotY });

      // Animate circle following dot (with slower speed for trailing effect)
      const currentCircleX = circlePositionRef.current.x;
      const currentCircleY = circlePositionRef.current.y;
      
      const newCircleX = currentCircleX + (newDotX - currentCircleX) * 0.15;
      const newCircleY = currentCircleY + (newDotY - currentCircleY) * 0.15;
      
      circlePositionRef.current = { x: newCircleX, y: newCircleY };
      setCirclePosition({ x: newCircleX, y: newCircleY });
      
      // Always continue animation
      animationFrameRef.current = requestAnimationFrame(animate);
    };

    // Start animation loop immediately
    isAnimatingRef.current = true;
    animationFrameRef.current = requestAnimationFrame(animate);

    const handleMouseMove = (e) => {
      const target = e.target;
      let newType = 'default';
      // PRIORITY: data-cursor attribute first
      if (target.hasAttribute('data-cursor')) {
        const cursorAttr = target.getAttribute('data-cursor');
        if (cursorAttr === 'play-video') newType = 'play-video';
        else if (cursorAttr === 'video') newType = 'video';
        else if (cursorAttr === 'image') newType = 'image';
        else if (cursorAttr === 'transparent') newType = 'transparent';
      } else if (target.tagName === 'VIDEO' || target.closest('video')) {
        newType = 'video';
      } else if (target.tagName === 'IMG' || target.closest('img')) {
        newType = 'image';
      }
      // Only update if type changed
      if (cursorTypeRef.current !== newType) {
        cursorTypeRef.current = newType;
        setCursorType(newType);
      }
    };

    // Add event listeners with throttling
    let rafId = null;
    const throttledMouseMove = (e) => {
      updateMousePosition(e);
      handleMouseMove(e);
    };

    window.addEventListener('mousemove', throttledMouseMove, { passive: true });

    // Use event delegation instead of adding listeners to each element
    const handleMouseOver = (e) => {
      const target = e.target;
      let newType = 'default';
      // PRIORITY: data-cursor attribute first
      if (target.hasAttribute('data-cursor')) {
        const cursorAttr = target.getAttribute('data-cursor');
        if (cursorAttr === 'play-video') newType = 'play-video';
        else if (cursorAttr === 'video') newType = 'video';
        else if (cursorAttr === 'image') newType = 'image';
        else if (cursorAttr === 'transparent') newType = 'transparent';
      } else if (target.tagName === 'VIDEO' || target.closest('video')) {
        newType = 'video';
      } else if (target.tagName === 'IMG' || target.closest('img')) {
        newType = 'image';
      }
      if (cursorTypeRef.current !== newType) {
        cursorTypeRef.current = newType;
        setCursorType(newType);
      }
    };

    const handleMouseOut = () => {
      if (cursorTypeRef.current !== 'default') {
        cursorTypeRef.current = 'default';
        setCursorType('default');
      }
    };

    document.addEventListener('mouseover', handleMouseOver, true);
    document.addEventListener('mouseout', handleMouseOut, true);

    // Hide cursor when mouse leaves window
    const handleMouseLeaveWindow = () => {
      isVisibleRef.current = false;
      setIsVisible(false);
    };

    const handleMouseEnterWindow = () => {
      isVisibleRef.current = true;
      setIsVisible(true);
    };

    document.addEventListener('mouseleave', handleMouseLeaveWindow);
    document.addEventListener('mouseenter', handleMouseEnterWindow);

    return () => {
      window.removeEventListener('mousemove', throttledMouseMove);
      document.removeEventListener('mouseover', handleMouseOver, true);
      document.removeEventListener('mouseout', handleMouseOut, true);
      document.removeEventListener('mouseleave', handleMouseLeaveWindow);
      document.removeEventListener('mouseenter', handleMouseEnterWindow);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      isAnimatingRef.current = false;
    };
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <>
      {/* Main cursor dot that follows smoothly */}
      <div
        className={`custom-cursor-dot ${cursorType === 'image' || cursorType === 'video' || cursorType === 'transparent' || cursorType === 'play-video' ? 'dot-hover' : ''}`}
        style={{
  left: `${circlePosition.x}px`,
  top: `${circlePosition.y}px`,
  transform: 'translate(-50%, -50%)',
}}


        
      />
      
      {/* Rounded cursor for images, videos, transparent elements, and play-video */}
      {(cursorType === 'image' || cursorType === 'video' || cursorType === 'transparent' || cursorType === 'play-video') && (
        <div
          className={`custom-cursor-circle ${
            cursorType === 'image' ? 'cursor-image' : 
            cursorType === 'video' ? 'cursor-video' : 
            cursorType === 'play-video' ? 'cursor-play-video' :
            'cursor-transparent'
          }`}
          style={{
  left: `${circlePosition.x}px`,
  top: `${circlePosition.y}px`,
  transform: 'translate(-50%, -50%)',
}}


          
        >
          {/* Only show CLICK ME if data-cursor="play-video" is set */}
          {cursorType === 'play-video' && (
            <span className="cursor-play-video-text">CLICK ME</span>
          )}
        </div>
      )}
    </>
  );
};

export default CustomCursor;