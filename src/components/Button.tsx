import React from 'react';

type Props = {
  onClick?: () => void;
  children: React.ReactNode;
  type?: React.ButtonHTMLAttributes<HTMLButtonElement>['type'];
};

export class Button extends React.Component<Props> {
  public render() {
    return (
      <button
        className={
          'bg-pink-950 px-2 rounded-sm border-2 text-white active:scale-90'
        }
        type={this.props.type || 'button'}
        onClick={this.props.onClick}
      >
        {this.props.children}
      </button>
    );
  }
}
