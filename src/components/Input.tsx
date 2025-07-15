import React from 'react';

type Props = {
  value: string;
  setValue: (value: string) => void;
};

export class Input extends React.Component<Props> {
  constructor(props: Props) {
    super(props);

    this.onInput = this.onInput.bind(this);
  }

  onInput(e: React.ChangeEvent) {
    const { value } = e.target as HTMLInputElement;

    this.props.setValue(value);
  }

  render() {
    return (
      <input
        type="text"
        value={this.props.value}
        onChange={this.onInput}
        className={
          'min-h-10 bg-white max-w-full min-w-96 border-2 border-gray-300 rounded outline-none hover:border-gray-400 focus-visible:border-gray-900 px-4 p-y2'
        }
      />
    );
  }
}
