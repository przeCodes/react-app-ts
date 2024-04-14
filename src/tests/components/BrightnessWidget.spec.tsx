import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { BrightnessWidget } from '../../components/BrightnessWidget';

test('should data has been loaded from the server, you can switch the brightness scale', async () => {
  render(<BrightnessWidget />);

  await waitFor(
    () => {
      expect(screen.getByText('20%')).toBeInTheDocument();
    },
    { timeout: 3000 }
  );

  for (let i = 0; i < 6; i++)
    fireEvent.click(screen.getByTestId('increasing brightness'));
  expect(screen.getByText('100%')).toBeInTheDocument();

  for (let i = 0; i < 4; i++)
    fireEvent.click(screen.getByTestId('reducing brightness'));
  expect(screen.getByText('20%')).toBeInTheDocument();
});
