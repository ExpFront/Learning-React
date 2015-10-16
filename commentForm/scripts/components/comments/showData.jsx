import React from 'react';
import ReactDOM from 'react-dom';

export default class CommentShowData extends React.Component {
render() {
  return (
    <div>
      {
        this.props.data.map(
          node => <h2 key={node.id}>{node.author} said: {node.text}</h2>
        )
      }
      </div>
    );
  }
}