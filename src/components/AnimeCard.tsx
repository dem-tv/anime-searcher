import React from 'react';
import type { Anime } from '../api/types/anime.types.ts';

type Props = {
  anime: Anime;
};

export class AnimeCard extends React.PureComponent<Props> {
  render() {
    return (
      <div
        className={
          'shadow-md bg-white gap-4 flex flex-col rounded-sm cursor-pointer py-4 hover:shadow-2xl hover:-translate-y-3 transition-all'
        }
      >
        <h3 className={'text-center text-4xl px-8'}>
          {this.props.anime.title.english} ({this.props.anime.title.native})
        </h3>
        <img
          src={this.props.anime.bannerImage}
          alt={this.props.anime.title.english}
        />
        <p className={'px-8'}>{this.props.anime.description}</p>
      </div>
    );
  }
}
