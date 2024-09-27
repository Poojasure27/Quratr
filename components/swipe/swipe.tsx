import React from "react";
import styles from "./swipe.module.css";
import ReplayIcon from "@mui/icons-material/Replay";
import CloseIcon from "@mui/icons-material/Close";
import StarRateIcon from "@mui/icons-material/Grade";
import FavoriteIcon from "@mui/icons-material/Favorite";
import BoltIcon from "@mui/icons-material/Bolt";
import IconButton from "@mui/material/IconButton";


interface SwipeButtonsProps {
  onSwipeLeft: () => void;
  onSwipeRight: () => void;
  onRepeatClick?: () => void;   
  onStarClick?: () => void;     
  onLightningClick?: () => void; 
}


const SwipeButtons: React.FC<SwipeButtonsProps> = React.memo(
  function SwipeButtons({
    onSwipeLeft,
    onSwipeRight,
    onRepeatClick,
    onStarClick,
    onLightningClick,
  }) {
    return (
      <div className={styles.swipeButtons}>
        {/* Replay button */}
        <IconButton 
          className={styles.swipeButtons__repeat} 
          onClick={onRepeatClick} 
          aria-label="Repeat">
          <ReplayIcon fontSize="large" />
        </IconButton>

        {/* Swipe Left button */}
        <IconButton 
          className={styles.swipeButtons__left} 
          onClick={onSwipeLeft} 
          aria-label="Swipe Left">
          <CloseIcon fontSize="large" />
        </IconButton>

        {/* Star button */}
        <IconButton 
          className={styles.swipeButtons__star} 
          onClick={onStarClick} 
          aria-label="Star">
          <StarRateIcon fontSize="large" />
        </IconButton>

        {/* Swipe Right button */}
        <IconButton 
          className={styles.swipeButtons__right} 
          onClick={onSwipeRight} 
          aria-label="Swipe Right">
          <FavoriteIcon fontSize="large" />
        </IconButton>

        {/* Lightning button */}
        <IconButton 
          className={styles.swipeButtons__lightning} 
          onClick={onLightningClick} 
          aria-label="Boost">
          <BoltIcon fontSize="large" />
        </IconButton>
      </div>
    );
  }
);

// Default props to avoid undefined handlers
SwipeButtons.defaultProps = {
  onRepeatClick: () => console.log("Repeat clicked!"),
  onStarClick: () => console.log("Star clicked!"),
  onLightningClick: () => console.log("Lightning clicked!"),
};

export default SwipeButtons;
