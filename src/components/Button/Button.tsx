import React, { type HTMLAttributes } from 'react';

type Props = {
  onClick?: () => void;
  children: React.ReactNode;
  type?: React.ButtonHTMLAttributes<HTMLButtonElement>['type'];
} & HTMLAttributes<HTMLButtonElement>;

export class Button extends React.Component<Props> {
  render() {
    return (
      <button
        className={
          'bg-pink-950 px-2 min-h-12 rounded-sm whitespace-nowrap border-2 text-white active:scale-90'
        }
        type={this.props.type || 'button'}
        onClick={this.props.onClick}
      >
        {this.props.children}
      </button>
    );
  }
}
