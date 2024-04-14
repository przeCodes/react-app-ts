import React, { useEffect, useState } from 'react';
import form from '../styles/components/Switch.module.css';

interface Props<Option> {
  onChange?(value: boolean): void;
  checked?: boolean;
}

export function SwitchButton({ onChange, checked }: Props<false>) {
  const [isChecked, setIsChecked] = useState(checked);

  useEffect(() => {
    setIsChecked(checked);
  }, [checked]);

  const checkHandler = () => {
    setIsChecked(!isChecked);

    onChange?.(!isChecked);
  };

  return (
    <div>
      <label className={form.switch}>
        <input type="checkbox" checked={isChecked} onChange={checkHandler} />
        <i />
      </label>
    </div>
  );
}
