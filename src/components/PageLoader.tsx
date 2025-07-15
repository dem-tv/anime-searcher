import React from 'react';

export class PageLoader extends React.PureComponent {
  render() {
    return (
      <div className="w-24 m-auto h-24 border-4 border-t-pink-200 border-gray-300 rounded-full animate-spin"></div>
    );
  }
}
