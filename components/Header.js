import React from 'react';
import styles from '../styles/Header.module.css';

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <img src="/logo.jpeg" alt="KukuFM Logo" className={styles.logoImage} />
      </div>
      <nav>
        <ul className={styles.navLinks}>
          <li><a href="#">Home</a></li>
          <li><a href="#">Explore</a></li>
          <li><a href="#">My Library</a></li>
          <li><a href="#">Profile</a></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
