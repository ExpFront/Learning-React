
var Comment = React.createClass({

  getInitialState: function() {
    return {data: []}
  },

  loadCommentFromServer: function() {
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      cache: false,
      success: function(data) {
        this.setState({data: data});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },

  handleCommentSubmit: function(comment) {
    var comments = this.state.data;
    var newComments = comments.concat([comment]); // Добавляет новые данные к старым в json объект
    this.setState({data: newComments});
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      type: 'HEAD',
      data: comment,
      success: function(data) {
        this.setState({data: data});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },

  componentDidMount: function() {
    this.loadCommentFromServer();
    setInterval(this.loadCommentFromServer, this.props.pollInterval);
  },

  render: function() {
    return (
      <div>
        <CommentForm onCommentSubmit={this.handleCommentSubmit} />
        <CommentList data={this.state.data} />
      </div>  
    );
  }
});

var CommentList = React.createClass({
  render: function() {
    var commentNodes = this.props.data.map(function (comment) {
      return (
        <Comment author={comment.author}>
          {comment.text}
        </Comment>
      );
    });
    return (
      <div className="commentList">
        {commentNodes}
      </div>
    );
  }
});


var CommentForm = React.createClass({

  handleSubmit: function(e) {
    e.preventDefault();
    var login = React.findDOMNode(this.refs.login).value.trim();
    var password = React.findDOMNode(this.refs.password).value.trim();

    if(!login || !password) return; //If this inputs are empty return

    this.props.onCommentSubmit({login: login, password: password});

    React.findDOMNode(this.refs.login).value = '';
    React.findDOMNode(this.refs.password).value = '';
    return;
  },

  render: function() {
    return (
      <form className="commentForm" onSubmit={this.handleSubmit}>
        <input type="text" ref="login" placeholder="Your name: "/>
        <input type="text" ref="password" placeholder="Your password: "/>
        <input type="submit" value="Post"></input>
      </form>
    );

  }
});

React.render(
  <Comment url="datas.json" pollInterval="3000" />,
  document.getElementById('content')
);
