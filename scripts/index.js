import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';

const Comment = React.createClass({
  getInitialState() {
    return {data: []};
  },

  componentWillMount() {
    this.loadComponents();
  },
  loadComponents() {
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      cache: false,
      success(data) {
        this.setState({data: data});
      },
      error(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }
    });
  },

  handleSubmitRequest(comment) {
    const newData = this.state.data.concat([comment]);
    this.setState({data: newData});
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      type: 'HEAD',
      cache: false,
      success(data) {
        this.setState({data: this.state.data});
      },
      error(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }
    });
  },

  render() {
    return (
     <div>
        <ShowDatas data={this.state.data} />
        <CommentList id={this.state.data.length} handleSubmitRequest={this.handleSubmitRequest} />
      </div>
    )
  }
});


const ShowDatas = React.createClass({
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
});




const CommentList = React.createClass({
  handleSubmit(e) {
    e.preventDefault();
    const innerAuthor = this.refs.author.value.trim();
    const innerText = this.refs.text.value.trim();
    const newId = this.props.id + 1;
    if (!innerAuthor || !innerText) return;

    this.props.handleSubmitRequest({author: innerAuthor, text: innerText, id: newId});

    this.refs.author.value = '';
    this.refs.text.value = '';

    return;
  },

  render() {
    return (
      <div>
        <form className="dataField" onSubmit={this.handleSubmit}>
         <input type="text" ref="author" placeholder="Type your name: " />
         <input type="text" ref="text" placeholder="Say something: " />
         <input type="submit" value="Post" />
       </form>
      </div>
    );
  }
});



ReactDOM.render(
  <Comment url="datas.json" />,
  document.getElementById('content')
);
