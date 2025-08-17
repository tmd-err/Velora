import { useEffect, useRef, useState } from 'react';

interface UseInViewOptions {
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
}

export function useInView(options: UseInViewOptions = {}) {
  const { threshold = 0.1, rootMargin = '0px', triggerOnce = true } = options;
  const [isInView, setIsInView] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          if (triggerOnce) {
            observer.unobserve(element);
          }
        } else if (!triggerOnce) {
          setIsInView(false);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(element);

    return () => {
      observer.unobserve(element);
    };
  }, [threshold, rootMargin, triggerOnce]);

  return { ref, isInView };
}

interface ScrollAnimationProps {
  children: React.ReactNode;
  animation?: 'fadeUp' | 'fadeIn' | 'slideLeft' | 'slideRight' | 'scaleUp';
  delay?: number;
  duration?: number;
  className?: string;
}

export function ScrollAnimation({ 
  children, 
  animation = 'fadeUp', 
  delay = 0,
  duration = 0.6,
  className = '' 
}: ScrollAnimationProps) {
  const { ref, isInView } = useInView({ threshold: 0.1, rootMargin: '-50px' });

  const animationClasses = {
    fadeUp: isInView ? 'animate-fade-up-in' : 'animate-fade-up-out',
    fadeIn: isInView ? 'animate-fade-in' : 'opacity-0',
    slideLeft: isInView ? 'animate-slide-left-in' : 'animate-slide-left-out',
    slideRight: isInView ? 'animate-slide-right-in' : 'animate-slide-right-out',
    scaleUp: isInView ? 'animate-scale-up-in' : 'animate-scale-up-out'
  };

  return (
    <div
      ref={ref}
      className={`transition-all ${animationClasses[animation]} ${className}`}
      style={{
        transitionDelay: `${delay}ms`,
        transitionDuration: `${duration}s`
      }}
    >
      {children}
    </div>
  );
}