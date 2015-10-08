
var Comment = React.createClass({

  getInitialState: function() {
    return {data: []}
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
      <div>
        <CommentList data={this.state.data} />
        <CommentForm onCommentSubmit={this.handleCommentSubmit} />
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
             <h3>{name}</h3>
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
    var author = this.refs.author.value.trim();
    var entry = this.refs.entry.value.trim();

    if(!author || !entry) return; //If this inputs are empty return

    this.props.onCommentSubmit({author: author, text: entry});

    this.refs.author.value = '';
    this.refs.entry.value = '';
    return;
  },

  render: function() {
    return (
      <form onSubmit={this.handleSubmit} onCommentSubmit={this.props.handleCommentSubmit} >
        <input type="text" ref="author" placeholder="Your name: "/>
        <input type="text" ref="entry" placeholder="Your text: "/>
        <input type="submit" value="Post" />
      </form>
    );

  }
});

React.render(
  <Comment url="datas.json" pollInterval={3000} />,
  document.getElementById('content')
);



// Take datas from input -> in an array -> full array back -> render full array