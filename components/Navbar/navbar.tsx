import React from 'react';
import Image from 'next/image';
import styles from './navbar.module.css'; // Importing CSS module for styling
import logo from '../../public/assets/images/logo.png'; // Adjust the path to your logo

const Navbar: React.FC = () => {
  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>
        <Image src={logo} alt="Logo" width={150} height={50} /> {/* Adjust dimensions as necessary */}
      </div>
      <div className={styles.navLinks}>
        {/* Add navigation links here if needed */}
      </div>
    </nav>
  );
};

export default Navbar;
