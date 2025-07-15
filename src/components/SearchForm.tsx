import React from 'react';
import { Input } from './Input';
import { Button } from './Button';
import { LS } from '../utils/localStorage.ts';

type Props = {
  onSubmit: (search: string) => void;
};

type State = {
  search: string;
};

export class SearchForm extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.onSearchChange = this.onSearchChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  state: State = {
    search: '',
  };

  onSearchChange(search: string) {
    LS.set('search', search);

    this.setState({
      search,
    });
  }

  onSubmit(e: React.FormEvent) {
    e.preventDefault();

    this.props.onSubmit(this.state.search);
  }

  componentDidMount() {
    const search = LS.get('search') || '';

    this.setState({
      search,
    });

    if (search) {
      this.props.onSubmit(search);
    }
  }

  render() {
    return (
      <form className={'flex gap-4'} onSubmit={this.onSubmit}>
        <Input value={this.state.search} setValue={this.onSearchChange} />
        <Button type="submit">Explode anime!</Button>
      </form>
    );
  }
}
