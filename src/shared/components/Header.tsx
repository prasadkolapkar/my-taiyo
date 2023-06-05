import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Path, TitleDisplayNameMap } from '../../utils/enum';
const Header = () => {
  const [heading, setHeading] = useState<string>('Contact Management');
  const location = useLocation();

  useEffect(() => {
    setHeading(TitleDisplayNameMap[location.pathname as Path])
  }, [location.pathname])

  return (
    <div className="bg-gray-800 text-white">
      <div className="container mx-auto py-4 w-full">
        <h1 className="text-2xl sm:text-4xl text-center text-base md:text-lg lg:text-xl xl:text-2xl">{heading}</h1>
      </div>
    </div>
  );
};

export default Header;
