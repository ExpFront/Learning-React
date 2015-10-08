
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
      type: 'POST',
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
      <div>
        <CommentForm onCommentSubmit={this.handleCommentSubmit} />
        <CommentList data={this.state.data} />
      </div>  
    );
  }
});

var CommentList = React.createClass({
  render: function() {
    return (
      <div>
        {
          this.props.data.map(function (name) {
           return (
             <h3>{name} </h3>
           );
          })
        }
      </div>
    )
  }
});


var CommentForm = React.createClass({

  handleSubmit: function(e) {
    e.preventDefault();
    var author = React.findDOMNode(this.refs.author).value.trim();
    var text = React.findDOMNode(this.refs.text).value.trim();

    if(!author || !text) return; //If this inputs are empty return

    this.props.onCommentSubmit({author: author, text: text});
    onLoad();

    React.findDOMNode(this.refs.author).value = '';
    React.findDOMNode(this.refs.text).value = '';
    return;
  },

  render: function() {
    return (
      <form onSubmit={this.handleSubmit} onCommentSubmit={this.props.handleCommentSubmit} >
        <input type="text" ref="author" placeholder="Your name: "/>
        <input type="text" ref="text" placeholder="Your text: "/>
        <input type="submit" value="Post" />
      </form>
    );

  }
});

var onLoad= function() {
  React.render(
    <Comment url="datas.json" />,
    document.getElementById('content')
  );
}

onLoad();


// Take datas from input -> in an array -> full array back -> render full array