import React, { ReactNode } from 'react';

// Avatar Component
interface AvatarProps {
  src?: string;
  alt?: string;
  fallback?: ReactNode;
  className?: string;
}

export const Avatar: React.FC<AvatarProps> = ({ src, alt, fallback, className }) => {
    return (
      <div className={`relative w-10 h-10 overflow-hidden bg-gray-100 rounded-full ${className}`}>
        {src ? (
          <img className="w-full h-full object-cover" src={src} alt={alt} />
        ) : (
          <div className="flex items-center justify-center w-full h-full bg-gray-300 text-gray-600">
            {fallback}
          </div>
        )}
      </div>
    );
  };

export const AvatarImage: React.FC<React.ImgHTMLAttributes<HTMLImageElement>> = (props) => {
  return <img {...props} className="w-full h-full object-cover" />;
};

export const AvatarFallback: React.FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <div className="flex items-center justify-center w-full h-full bg-gray-300 text-gray-600">
      {children}
    </div>
  );
};
