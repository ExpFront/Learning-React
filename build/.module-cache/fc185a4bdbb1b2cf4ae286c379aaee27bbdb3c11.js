var Comment = React.createClass({displayName: "Comment",
  getInitialState: function() {
    return {data: []};
  },

  componentWillMount: function() {
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

  handleSubmitRequest: function(comment) {
    var newData = this.state.data.concat([comment]);
    this.setState({data: newData});
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      type: 'HEAD',
      cache: false,
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
        React.createElement(ShowDatas, {data: this.state.data}), 
        React.createElement(CommentList, {handleSubmitRequst: this.handleSubmitRequest})
      )
    )
  }
});


var ShowDatas = React.createClass({displayName: "ShowDatas",
  render: function() {
    return (
      React.createElement("div", null, 
        
          this.props.data.map(function(node) {
            return React.createElement("h2", null, node.author)
          })
        
      )
    );
  }
});




var CommentList = React.createClass({displayName: "CommentList",

  handleSubmit: function(e) {
    e.preventDefault();
    var innerAuthor = this.refs.author.value.trim();
    var innerText = this.refs.text.value.trim();

    if (!innerAuthor || !innerText) return;

    this.props.handleSubmitRequest({author: innerAuthor, text: innerText});

    this.refs.author.value = '';
    this.refs.text.value = '';

    return;
  },

  render: function() {
    return (
      React.createElement("div", null, 
        React.createElement("form", {className: "dataField", onSubmit: this.handleSubmit, handleSubmitRequest: this.props.handleSubmitRequest}, 
         React.createElement("input", {type: "text", ref: "author"}), 
         React.createElement("input", {type: "text", ref: "text"}), 
         React.createElement("input", {type: "submit"})
       )
      )
    );
  }
});





ReactDOM.render(
  React.createElement(Comment, {url: "datas.json"}),
  document.getElementById('content')
)