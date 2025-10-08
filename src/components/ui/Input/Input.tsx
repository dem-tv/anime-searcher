import React from 'react';

type Props = {
  value: string;
  setValue: (value: string) => void;
  label: string;
  name: string;
};

export function Input(props: Props) {
  function onInput(event: React.ChangeEvent) {
    const { value } = event.target as HTMLInputElement;

    props.setValue(value);
  }

  return (
    <input
      aria-label={props.label}
      name={props.name}
      type="text"
      id={props.name}
      value={props.value}
      onChange={onInput}
      className={
        'min-h-10 bg-white max-w-96 border border-gray-300 rounded outline-none ' +
        'hover:border-gray-400 focus-visible:border-gray-900 px-4 p-y2 ' +
        'dark:bg-neutral-800 dark:border-gray-800 dark:focus-visible:bg-neutral-950 dark:focus-visible:border-pink-400'
      }
    />
  );
}
