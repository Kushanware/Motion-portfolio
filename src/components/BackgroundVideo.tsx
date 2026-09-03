import { useEffect, useRef, useState } from 'react';

interface BackgroundVideoProps {
  customSrc?: string;
  onCustomVideoLoaded?: (src: string) => void;
}

export default function BackgroundVideo({ customSrc, onCustomVideoLoaded }: BackgroundVideoProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const prevXRef = useRef<number | null>(null);
  const targetTimeRef = useRef<number>(0);
  const isSeekingRef = useRef<boolean>(false);
  const [videoSrc, setVideoSrc] = useState<string>(customSrc || '/aria_optimized_v2.mp4');

  // Keep videoSrc synced with customSrc prop if changed externally
  useEffect(() => {
    if (customSrc) {
      setVideoSrc(customSrc);
    }
  }, [customSrc]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const SENSITIVITY = 0.85;
    const interpolatedTimeRef = { current: 0 };
    const lastTimeRef = { current: performance.now() };
    let rafId: number;

    const handleLoadedMetadata = () => {
      targetTimeRef.current = video.currentTime || 0;
      interpolatedTimeRef.current = video.currentTime || 0;
    };

    // Smooth RAF loop: interpolates between video.currentTime and targetTimeRef.current
    const animateLoop = (now: number) => {
      const dt = Math.min((now - lastTimeRef.current) / 1000, 0.1);
      lastTimeRef.current = now;

      const duration = video.duration || 7.0;
      if (duration > 0) {
        const clampedTarget = Math.max(0, Math.min(duration, targetTimeRef.current));
        const diff = clampedTarget - interpolatedTimeRef.current;

        // Exponential smoothing factor for silky inertia
        // ~10 to 12 provides a responsive yet organic gliding interpolation
        const factor = 1 - Math.exp(-11 * dt);
        interpolatedTimeRef.current += diff * factor;

        // Only commit seek if not currently seeking and difference is visible
        if (!isSeekingRef.current && Math.abs(video.currentTime - interpolatedTimeRef.current) > 0.008) {
          isSeekingRef.current = true;
          video.currentTime = Math.max(0, Math.min(duration, interpolatedTimeRef.current));
        }
      }

      rafId = requestAnimationFrame(animateLoop);
    };

    rafId = requestAnimationFrame(animateLoop);

    const handleSeeked = () => {
      isSeekingRef.current = false;
    };

    // Mouse movement updates target time smoothly without abrupt direct video seek
    const handleMouseMove = (e: MouseEvent) => {
      if (prevXRef.current === null) {
        prevXRef.current = e.clientX;
        return;
      }

      const delta = e.clientX - prevXRef.current;
      prevXRef.current = e.clientX;

      const duration = video.duration || 7.0;
      if (duration > 0 && window.innerWidth > 0) {
        const timeOffset = (delta / window.innerWidth) * SENSITIVITY * duration;
        targetTimeRef.current = Math.max(0, Math.min(duration, targetTimeRef.current + timeOffset));
      }
    };

    // Page scroll integration: smoothly advances video timeline across page depth
    const handleScroll = () => {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const duration = video.duration || 7.0;
      if (maxScroll > 0 && duration > 0) {
        const scrollFraction = Math.max(0, Math.min(1, window.scrollY / maxScroll));
        // Interpolate target time smoothly with scroll depth
        targetTimeRef.current = scrollFraction * duration;
      }
    };

    // Mobile touch scrubbing support
    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        prevXRef.current = e.touches[0].clientX;
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        if (prevXRef.current === null) {
          prevXRef.current = e.touches[0].clientX;
          return;
        }
        const delta = e.touches[0].clientX - prevXRef.current;
        prevXRef.current = e.touches[0].clientX;

        const duration = video.duration || 7.0;
        if (duration > 0 && window.innerWidth > 0) {
          const timeOffset = (delta / window.innerWidth) * SENSITIVITY * duration;
          targetTimeRef.current = Math.max(0, Math.min(duration, targetTimeRef.current + timeOffset));
        }
      }
    };

    const handleTouchEnd = () => {
      prevXRef.current = null;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll, { passive: true });
    video.addEventListener('seeked', handleSeeked);
    video.addEventListener('loadedmetadata', handleLoadedMetadata);
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('touchend', handleTouchEnd, { passive: true });

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
      video.removeEventListener('seeked', handleSeeked);
      video.removeEventListener('loadedmetadata', handleLoadedMetadata);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [videoSrc]);

  // Drag-and-drop handler allowing user to optionally drop their original video file
  useEffect(() => {
    const handleDragOver = (e: DragEvent) => {
      e.preventDefault();
    };

    const handleDrop = (e: DragEvent) => {
      e.preventDefault();
      if (e.dataTransfer?.files && e.dataTransfer.files.length > 0) {
        const file = e.dataTransfer.files[0];
        if (file.type.startsWith('video/')) {
          const objectUrl = URL.createObjectURL(file);
          setVideoSrc(objectUrl);
          if (onCustomVideoLoaded) {
            onCustomVideoLoaded(objectUrl);
          }
        }
      }
    };

    window.addEventListener('dragover', handleDragOver);
    window.addEventListener('drop', handleDrop);

    return () => {
      window.removeEventListener('dragover', handleDragOver);
      window.removeEventListener('drop', handleDrop);
    };
  }, [onCustomVideoLoaded]);

  return (
    <video
      ref={videoRef}
      id="hero-background-video"
      src={videoSrc}
      playsInline
      preload="auto"
      className="fixed inset-0 w-full h-full object-cover z-0 pointer-events-none select-none"
      style={{
        objectPosition: '70% center',
      }}
    />
  );
}
