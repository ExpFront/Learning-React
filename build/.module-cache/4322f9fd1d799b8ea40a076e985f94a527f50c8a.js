
var CommentBox = React.createClass({displayName: "CommentBox",

  getInitialState: function() {
    return {data: []};
  },

  loadCommentsFromServer: function() {
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
    this.loadCommentsFromServer();
    setInterval(this.loadCommentsFromServer, this.props.pollInterval);
  },

  render: function() {
    return (
      React.createElement("div", null, 
        React.createElement(CommentForm, {onCommentSubmit: this.handleCommentSubmit}), 
        React.createElement(CommentList, {data: this.state.data})
      )  
    );
  }
});

var CommentList = React.createClass({displayName: "CommentList",
  render: function() {
    var commentNodes = this.props.data.map(function (comment) {
      return (
        React.createElement(Comment, {author: comment.author}, 
          comment.text
        )
      );
    });
    return (
      React.createElement("div", {className: "commentList"}, 
        commentNodes
      )
    );
  }
});


var CommentForm = React.createClass({displayName: "CommentForm",

  handleSubmit: function(e) {
    e.preventDefault();
    var author = this.refs.author.value.trim();
    var text = this.refs.text.value.trim();

    if(!author || !text) return; //If this inputs are empty return

    this.props.onCommentSubmit({author: author, text: text});

    this.refs.author.value = '';
    this.refs.author.value = '';
    return;
  },

  render: function() {
    return (
     React.createElement("form", {className: "commentForm", onSubmit: this.handleSubmit}, 
        React.createElement("input", {type: "text", placeholder: "Your name", ref: "author"}), 
        React.createElement("input", {type: "text", placeholder: "Say something...", ref: "text"}), 
        React.createElement("input", {type: "submit", value: "Post"})
      )
    );

  }
});

ReactDOM.render(
  React.createElement(CommentBox, {url: "datas.json", pollInterval: 3000}),
  document.getElementById('content')
);


// Take datas from input -> in an array -> full array back -> render full array