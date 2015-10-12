






var CommentList = React.createClass({displayName: "CommentList",

  handleSubmit: function(e) {
    e.preventDefault();
    var innerAuthor = this.refs.author.value.trim();
    var innerText = React.findDOMNode(this.refs.text).value.trim();

    if (!innerAuthor || !innerText) return;


  },

  render: function() {
    return (
      React.createElement("form", {className: "dataField", onSubmit: this.handleSubmit}, 
        React.createElement("input", {type: "text", ref: "author"}), 
        React.createElement("input", {type: "text", ref: "text"}), 
        React.createElement("input", {type: "submit"})
      )
    );
  }
});





ReactDOM.render(
  React.createElement(CommentList, null),
  document.getElementById('content')
)