import React from 'react';

type Props = {
  value: string;
  setValue: (value: string) => void;
  label: string;
  name: string;
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
      <div>
        <label className={'opacity-0 h-0'} htmlFor={this.props.name}>
          {this.props.label}
        </label>
        <input
          name={this.props.name}
          type="text"
          id={this.props.name}
          value={this.props.value}
          onChange={this.onInput}
          className={
            'min-h-10 bg-white max-w-96 border-2 border-gray-300 rounded outline-none hover:border-gray-400 focus-visible:border-gray-900 px-4 p-y2'
          }
        />
      </div>
    );
  }
}
