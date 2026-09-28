import { useState, useEffect } from 'react';

interface ToastProps {
  message: string;
  type?: 'error' | 'success';
  onClose: () => void;
}

export function Toast({ message, type = 'error', onClose }: ToastProps) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      setTimeout(onClose, 300);
    }, 4000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div
      className={`fixed top-4 right-4 z-50 px-4 py-3 rounded-lg shadow-lg text-white text-sm transition-opacity duration-300 ${
        visible ? 'opacity-100' : 'opacity-0'
      } ${type === 'error' ? 'bg-red-500' : 'bg-green-500'}`}
    >
      {message}
    </div>
  );
}
