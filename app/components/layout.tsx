'use client';
import React from 'react';
import Menu from './sidebar/menu';

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="d-flex">
      <Menu />
      <main className="p-4" style={{ flex: 1 }}>
        {children}
      </main>
    </div>
  );
};

export default Layout;
