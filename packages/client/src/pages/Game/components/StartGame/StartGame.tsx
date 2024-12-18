import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import { Popup } from '@/components';
import { Button } from 'react-bootstrap';
import { IStartGameProps } from './StartGame.interface';
import { hints } from './utils/hints';
import styles from './StartGame.module.scss';

export const StartGame: React.FC<IStartGameProps> = ({ onComplete, isGameStarted }) => {
  const [currentHintIndex, setCurrentHintIndex] = useState(0);
  const [isCountdownActive, setIsCountdownActive] = useState(false);
  const [countdown, setCountdown] = useState(3);
  const [showGo, setShowGo] = useState(false);

  useEffect(() => {
    if (!isCountdownActive) return;

    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(prev => prev - 1), 1000);
      return () => clearTimeout(timer);
    }

    if (countdown === 0) {
      setShowGo(true);
      const goTimer = setTimeout(() => {
        setShowGo(false);
        onComplete();
      }, 1000);
      return () => clearTimeout(goTimer);
    }
  }, [isCountdownActive, countdown, onComplete]);

  const handleNext = () => {
    const nextIndex = currentHintIndex + 1;
    if (nextIndex < hints.length) {
      setCurrentHintIndex(nextIndex);
    } else {
      setIsCountdownActive(true);
    }
  };

  const handleSkip = () => {
    setIsCountdownActive(true);
  };

  if (isCountdownActive) {
    return (
      <div className={styles['game-start__countdown']}>
        {showGo ? (
          <h1 className={styles['countdown-go']}>Go!</h1>
        ) : (
          <h1 className={styles['countdown-number']}>{countdown}...</h1>
        )}
      </div>
    );
  }

  if (!isGameStarted) {
    return (
      <Popup open={!isGameStarted} withOverlay={true}>
        <div className={styles['game-start']}>
          <div className={styles['game-start__hint']}>
            <p>{hints[currentHintIndex].text}</p>
            {hints[currentHintIndex].image && (
              <div className={styles['game-start__tip']}>
                <img src={hints[currentHintIndex].image} alt="Hint tip" />
              </div>
            )}
          </div>
          <div
            className={classNames(styles['game-start__buttons'], {
              [styles.centered]: currentHintIndex === hints.length - 1,
            })}>
            {currentHintIndex < hints.length - 1 ? (
              <>
                <Button
                  className={classNames(
                    styles['game-start__button'],
                    styles['game-start__button_skip'],
                  )}
                  onClick={handleSkip}>
                  Skip
                </Button>
                <Button className={styles['game-start__button']} onClick={handleNext}>
                  Next
                </Button>
              </>
            ) : (
              <Button className={styles['game-start__button']} onClick={handleNext}>
                Ready!
              </Button>
            )}
          </div>
        </div>
      </Popup>
    );
  }

  return null;
};
