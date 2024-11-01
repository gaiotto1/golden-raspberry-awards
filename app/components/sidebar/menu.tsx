'use client';
import Link from 'next/link';
import { FaHome, FaFilm, FaBars } from 'react-icons/fa';
import { useState, useEffect } from 'react';
import styles from './menu.module.scss';

const Menu = () => {
  const [isCollapsed, setIsCollapsed] = useState(window.innerWidth < 900);

  const toggleMenu = () => {
    setIsCollapsed(!isCollapsed);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 900) {
        setIsCollapsed(true);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <aside className={`${styles.menu} ${isCollapsed ? styles.collapsed : ''}`}>
      <button className={styles['menu-toggle']} onClick={toggleMenu} aria-label="Toggle menu">
        <FaBars />
      </button>
      <ul className="nav flex-column">
        <li className="nav-item">
          <Link href="/dashboard" className={styles['nav-link']}>
            <FaHome />
            {!isCollapsed && <span>Dashboard</span>}
          </Link>
        </li>
        <li className="nav-item">
          <Link href="/all-films" className={styles['nav-link']}>
            <FaFilm />
            {!isCollapsed && <span>All Films</span>}
          </Link>
        </li>
      </ul>
    </aside>
  );
};

export default Menu;