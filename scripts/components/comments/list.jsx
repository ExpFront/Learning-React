import React from 'react';
import ReactDOM from 'react-dom';

export default class CommentList extends React.Component {
  handleSubmit(event) {
    event.preventDefault();
    const innerAuthor = this.refs.author.value.trim();
    const innerText = this.refs.text.value.trim();
    const newId = this.props.id + 1;
    if (!innerAuthor || !innerText) return;

    this.props.handleSubmitRequest({author: innerAuthor, text: innerText, id: newId});

    this.refs.author.value = '';
    this.refs.text.value = '';

    return;
  }

  render() {
    return (
        <form className="dataField" onSubmit={this.handleSubmit}>
         <input type="text" ref="author" placeholder="Type your name: " />
         <input type="text" ref="text" placeholder="Say something: " />
         <input type="submit" value="Post" />
       </form>
    );
  }
}
