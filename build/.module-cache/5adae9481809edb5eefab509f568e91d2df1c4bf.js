
var Comment = React.createClass({displayName: "Comment",

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

  render: function() {
    return (
      React.createElement("div", null, 
      this.loadCommentFromServer, 
        
          this.state.data.map(function (name) {
            return React.createElement("h2", null, name) 
          })
        
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
      React.createElement("form", null, 
        React.createElement("input", {type: "text", ref: "login", placeholder: "Your name: "}), 
        React.createElement("input", {type: "text", ref: "password", placeholder: "Your password: "}), 
        React.createElement("input", {type: "submit", value: "Post"})
      )
    );
  }
});

var onLoad= function() {
  React.render(
    React.createElement(Comment, {url: "datas.json"}),
    document.getElementById('content')
  );
}

onLoad();


// Take datas from input -> in an array -> full array back -> render full array