import React from 'react';
import Navbar from './components/Navbar/Navbar.component';

import Sidebar from './components/Sidebar/Sidebar.component';

const AppShell = ({ children }) => {
  return (
    <>
      <div className="flex">
        <Sidebar />
        <div className="flex flex-col w-full">
          <div className="p-4 border-b border-gray-200 shadow-md">
            <Navbar/>
          </div>
          <div className="px-4 sm:px-8 py-2 bg-gray-100">
            {children}
          </div>
        </div>
      </div>
    </>
  );
};

export default AppShell;