var Comment = React.createClass({displayName: "Comment",
  getInitialState: function() {
    return {data: []}
  },
  componentWillMount: function() {
    $.ajax({
    url: "test.html",
    context: document.body
  });
  },

  render: function() {
    return (
     React.createElement("div", null, 
        React.createElement(CommentList, null)

      )
    )
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
      React.createElement("div", null, 
        React.createElement("form", {className: "dataField", onSubmit: this.handleSubmit}, 
         React.createElement("input", {type: "text", ref: "author"}), 
         React.createElement("input", {type: "text", ref: "text"}), 
         React.createElement("input", {type: "submit"})
       ), 
       React.createElement(ShowDatas, null)
      )
    );
  }
});





ReactDOM.render(
  React.createElement(Comment, {url: "datas.json"}),
  document.getElementById('content')
)