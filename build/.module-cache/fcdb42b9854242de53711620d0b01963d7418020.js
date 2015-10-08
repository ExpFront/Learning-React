
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
        React.createElement(CommentForm, {onCommentSubmit: this.handleCommentSubmit}), 
        React.createElement(CommentList, {data: this.state.data})
      )  
    );
  }
});

var CommentList = React.createClass({displayName: "CommentList",
  render: function() {
    return (
      React.createElement("div", null, 
        
          this.props.data.map(function (name) {
           return (
             React.createElement("h3", null, name, " ")
           );
          })
        
      )
    )
  }
});


var CommentForm = React.createClass({displayName: "CommentForm",

  handleSubmit: function(e) {
    e.preventDefault();
    var login = React.findDOMNode(this.refs.author).value.trim();
    var password = React.findDOMNode(this.refs.text).value.trim();

    if(!login || !password) return; //If this inputs are empty return

    this.props.onCommentSubmit({author: author, text: text});

    React.findDOMNode(this.refs.author).value = '';
    React.findDOMNode(this.refs.text).value = '';
    return;
  },

  render: function() {
    return (
      React.createElement("form", {onSubmit: this.handleSubmit, onCommentSubmit: this.props.handleCommentSubmit}, 
        React.createElement("input", {type: "text", ref: "author", placeholder: "Your name: "}), 
        React.createElement("input", {type: "text", ref: "text", placeholder: "Your text: "}), 
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