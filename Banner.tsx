import React from 'react';
import { InformationCircleIcon } from './icons/InformationCircleIcon';

const Banner: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => {
  return (
    <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-800 p-4 rounded-md mb-6" role="alert">
      <div className="flex">
        <div className="flex-shrink-0">
          <InformationCircleIcon className="h-5 w-5 text-yellow-500" />
        </div>
        <div className="ml-3">
          <p className="font-bold">{title}</p>
          <div className="text-sm">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
