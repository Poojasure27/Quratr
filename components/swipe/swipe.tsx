import React from "react";
import styles from "./swipe.module.css"; // Updated to CSS Modules
import ReplayIcon from "@mui/icons-material/Replay";
import CloseIcon from "@mui/icons-material/Close";
import StarRateIcon from "@mui/icons-material/Grade";
import FavoriteIcon from '@mui/icons-material/Favorite';
import BoltIcon from '@mui/icons-material/Bolt';
import IconButton from "@mui/material/IconButton";

const SwipeButtons: React.FC = () => {
  return (
    <div className={styles.swipeButtons}>
      <IconButton className={styles.swipeButtons__repeat}>
        <ReplayIcon fontSize="large" />
      </IconButton>
      <IconButton className={styles.swipeButtons__left}>
        <CloseIcon fontSize="large" />
      </IconButton>
      <IconButton className={styles.swipeButtons__star}>
        <StarRateIcon fontSize="large" />
      </IconButton>
      <IconButton className={styles.swipeButtons__right}>
        <FavoriteIcon fontSize="large" />
      </IconButton>
      <IconButton className={styles.swipeButtons__lightning}>
        <BoltIcon fontSize="large" />
      </IconButton>
    </div>
  );
};

export default SwipeButtons;
