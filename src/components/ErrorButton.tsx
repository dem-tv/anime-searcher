import React from 'react';
import { Button } from './Button.tsx';

type State = {
  error: boolean;
};

export class ErrorButton extends React.Component<object, State> {
  constructor(props: object) {
    super(props);

    this.onExplode = this.onExplode.bind(this);
  }

  state: State = {
    error: false,
  };

  onExplode() {
    this.setState({
      error: true,
    });
  }

  render() {
    if (this.state.error) {
      throw Error('EXPLOOOOOOOODE!!!');
    }

    return <Button onClick={this.onExplode}>Explode!</Button>;
  }
}
