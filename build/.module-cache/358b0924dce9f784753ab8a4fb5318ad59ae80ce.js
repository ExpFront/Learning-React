var Comment = React.createClass({displayName: "Comment",
  getInitialState: function() {
    return {data: []};
  },

  loadComponents: function() {
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
        this.setState({data: this.state.data});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },

  componentDidMount: function() {
    this.loadComponents();
  },

  childContextTypes: {
    data: React.PropTypes.object,
    id: React.PropTypes.number,
    handleSubmitRequest: React.PropTypes.func
  },

  getChildContext: function() {
    return {
      data: this.state.data,
      id: this.state.data.length,
      handleSubmitRequest: this.handleSubmitRequest
    }
  },

  render: function() {
    return (
     React.createElement("div", null, 
        React.createElement(ShowDatas, {data: this.state.data}), 
        React.createElement(CommentList, {id: this.state.data.length, handleSubmitRequest: this.handleSubmitRequest})
      )
    )
  }
});


var ShowDatas = React.createClass({displayName: "ShowDatas",
  contextTypes: {
    data: React.PropTypes.array
  },

  render: function() {
    return (
      React.createElement("div", null, 
        
          this.context.data.map(function(node) {
            return React.createElement("h2", {key: node.id}, node.author, " said: ", node.text)
          })
        
      )
    );
  }
});




var CommentList = React.createClass({displayName: "CommentList",

  contextTypes: {
    handleSubmitRequest: React.PropTypes.func,
    id: React.PropTypes.number
  },


  handleSubmit: function(e) {
    e.preventDefault();
    var innerAuthor = this.refs.author.value.trim();
    var innerText = this.refs.text.value.trim();
    if (!innerAuthor || !innerText) return;

    this.context.handleSubmitRequest({author: innerAuthor, text: innerText, id: this.context.id++});

    this.refs.author.value = '';
    this.refs.text.value = '';

    return;
  },

  render: function() {
    return (
      React.createElement("div", null, 
        React.createElement("form", {className: "dataField", onSubmit: this.handleSubmit}, 
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
);