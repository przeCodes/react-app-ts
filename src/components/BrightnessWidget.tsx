import React, { useEffect, useState } from 'react';
import { Button, CircularProgress, Fade } from '@mui/material';
import { Add, HorizontalRule, BatteryChargingFull } from '@mui/icons-material';
import { SwitchButton } from './SwitchButton';
import styles from '../styles/components/BrightnessWidget.module.scss';

interface Luminosity {
  brightness: number;
  timeLeft: number;
  nightVision: boolean;
  duskTillDawn: boolean;
  flashing: boolean;
}

export function BrightnessWidget() {
  const [loading, setLoading] = useState(true);
  const [brightness, setBrightness] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0);
  const [nightVision, setNightVision] = useState(false);
  const [duskTillDawn, setDuskTillDawn] = useState(false);
  const [flashing, setFlashing] = useState(false);
  const range = [20, 40, 60, 80, 100];

  useEffect(() => {
    fetchWidgetState().then(res => {
      setBrightness(res.brightness);
      setTimeLeft(res.timeLeft);
      setNightVision(res.nightVision);
      setDuskTillDawn(res.duskTillDawn);
      setFlashing(res.flashing);

      setLoading(false);
    });
  }, []);

  const fetchWidgetState = (): Promise<Luminosity> => {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve({
          brightness: 20, //%
          timeLeft: 12, //h
          nightVision: false,
          duskTillDawn: true,
          flashing: true
        });
      }, 2000);
    });
  };

  /** range from 0 to 100 */
  const getPercentages = function (val: number): number {
    return val <= 0 ? 0 : val >= 100 ? 100 : val;
  };

  return (
    <div className={styles.brightnessWidget}>
      <div className={styles.brightnessScale}>
        <div>THR 08</div>
        {range.map((item, index) => (
          <span
            className={item <= brightness ? styles.highlight : ''}
            key={index}
          />
        ))}
      </div>

      <div className={styles.brightnessControl}>
        <Button
          data-testid="increasing brightness"
          onClick={() => setBrightness(brightness + 20)}
          variant="contained"
          disabled={loading || brightness >= 100}>
          <Add fontSize={'large'} />
        </Button>

        <div className={styles.brightness}>{getPercentages(brightness)}%</div>

        <Button
          data-testid="reducing brightness"
          onClick={() => setBrightness(brightness - 20)}
          variant="contained"
          disabled={loading || brightness <= 0}>
          <HorizontalRule fontSize={'large'} />
        </Button>
      </div>

      <div className={styles.timerLampModesControl}>
        <div className={styles.timeLeft}>
          <BatteryChargingFull />
          <span>Time left</span>
          <span>{timeLeft}h</span>
        </div>
        <div>
          <span>Night Vision</span>
          <SwitchButton
            onChange={change => {
              console.log(`Night Vision: ${change ? 'NO' : 'OFF'}`);
            }}
            checked={nightVision}
          />
        </div>
        <div>
          <span>Dusk Till Down</span>
          <SwitchButton
            onChange={change => {
              console.log(`Dusk Till Down: ${change ? 'NO' : 'OFF'}`);
            }}
            checked={duskTillDawn}
          />
        </div>
        <div>
          <span>Flashing</span>
          <SwitchButton
            onChange={change => {
              console.log(`Flashing: ${change ? 'NO' : 'OFF'}`);
            }}
            checked={flashing}
          />
        </div>
      </div>

      <Fade in={loading} className={styles.spinnerLoading} unmountOnExit>
        <span>
          <CircularProgress size={90} />
        </span>
      </Fade>
    </div>
  );
}
