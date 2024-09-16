"use client";
import { useEffect, useState, useRef } from 'react';
import { usePathname } from 'next/navigation';

const RouteLoader: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);
  const pathname = usePathname();
  const timer = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const startLoading = () => {
      setLoading(true);
      setProgress(30);

      if (timer.current) clearInterval(timer.current);
      timer.current = setInterval(() => {
        setProgress((prev) => (prev < 90 ? prev + 5 : prev));
      }, 20000);
    };

    const completeLoading = () => {
      if (timer.current) clearInterval(timer.current);
      setProgress(100);
      setTimeout(() => {
        setLoading(false);
        setProgress(0);
      }, 500);
    };

    startLoading();

    return () => {
      completeLoading();
    };
  }, [pathname]);

  return (
    <div
      className={`fixed top-0 left-0 h-1 bg-[#6F923E] z-50 transition-all duration-300 ease-out ${loading ? 'opacity-100' : 'opacity-0'}`}
      style={{ width: `${progress}%` }}
    />
  );
};

export default RouteLoader;
