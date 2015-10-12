var Comment = React.createClass({
  getInitialState: function() {
    return {data: []}
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

  render: function() {
    return (
     <div>
        <CommentList data={this.state.data} />
      </div>
    )
  }
});


var ShowDatas = function(data) {
  data.map(function(node) {
    return <h2>{node}</h2>
  })
};




var CommentList = React.createClass({

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
      <div>
        <form className="dataField" onSubmit={this.handleSubmit}>
         <input type="text" ref="author" />
         <input type="text" ref="text" />
         <input type="submit" />
       </form>
       <ShowDatas data={this.props.data} />
      </div>
    );
  }
});





ReactDOM.render(
  <Comment url="datas.json" />,
  document.getElementById('content')
)