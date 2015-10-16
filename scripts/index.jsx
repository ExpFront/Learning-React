import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import CommentShowData from './components/comments/showData.jsx';
import CommentList from './components/comments/list.jsx';


class Comment extends React.Component {
  constructor() {
    super();
    this.state = { data: [] };
  }

  componentWillMount() {
    this.loadComponents();
  }

  loadComponents() {
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      cache: false,
      success: (data) => {
        this.setState({data});
      },
      error(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      },
    });
  }

  handleSubmitRequest(comment) {
    const newData = this.state.data.concat([comment]);
    this.setState({data: newData});
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      type: 'HEAD',
      cache: false,
      success: () => {
        this.setState({data: this.state.data});
      },
      error(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      },
    });
  }

  render() {
    return (
     <div>
        <CommentShowData data={this.state.data} />
        <CommentList id={this.state.data.length} handleSubmitRequest={this.handleSubmitRequest.bind(this)} />
      </div>
    );
  }
}

ReactDOM.render(
  <Comment url="datas.json" />,
  document.getElementById('content')
);
