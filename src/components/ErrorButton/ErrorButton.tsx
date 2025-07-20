import { useState } from 'react';
import { Button } from '../Button/Button.tsx';

export function ErrorButton() {
  const [error, setError] = useState(false);

  function onExplode() {
    setError(true);
  }

  if (error) {
    throw Error('EXPLOOOOOOOODE!!!');
  }

  return <Button onClick={onExplode}>Explode!</Button>;
}
