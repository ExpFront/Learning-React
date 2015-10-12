var Comment = React.createClass({displayName: "Comment",
  getInitialState: function() {
    return {data: []}
  },
  componentWillMount: function() {
    $.ajax({
    url: "test.html",
    context: document.body
  });
  }

});






var CommentList = React.createClass({displayName: "CommentList",

  handleSubmit: function(e) {
    e.preventDefault();
    var innerAuthor = this.refs.author.value.trim();
    var innerText = this.refs.text.value.trim();

    if (!innerAuthor & !innerText) return;

    // TODO: send new datas into an object

    this.refs.author.value = '';
    this.refs.text.value = '';

    return;
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
  React.createElement(CommentList, {url: "datas.json"}),
  document.getElementById('content')
)