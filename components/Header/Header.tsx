import React from "react";
import styles from "./header.module.css"; // Assuming you have CSS modules for styling
import PersonIcon from "@mui/icons-material/Person";
import TuneIcon from '@mui/icons-material/Tune';
import IconButton from "@mui/material/IconButton";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import Link from "next/link";
import Image from "next/image"; // Import Image from Next.js
import logo from '../../public/assets/logo.jpeg'; // Adjust the path if necessary

interface HeaderProps {
  backButton?: string;
}

const Header: React.FC<HeaderProps> = ({ backButton }) => {
  return (
    <div className={styles.header}>
      {backButton ? (
        <Link href={backButton} passHref>
          <IconButton>
            <ArrowBackIosIcon className={styles.header__icon} fontSize="large" />
          </IconButton>
        </Link>
      ) : (
        <IconButton>
          <PersonIcon className={styles.header__icon} fontSize="large" />
        </IconButton>
      )}
      <Link href="/" passHref>
        <Image
          className={styles.header__logo}
          src={logo}
          alt="Quratr logo"
          width={100} // Set the desired width
          height={40} // Set the desired height
        />
      </Link>
      <Link href="/chat" passHref>
        <IconButton>
          <TuneIcon className={styles.header__icon} fontSize="large" />
        </IconButton>
      </Link>
    </div>
  );
};

export default Header;
