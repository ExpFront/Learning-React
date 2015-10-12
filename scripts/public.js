var Comment = React.createClass({
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

  render: function() {
    return (
     <div>
        <ShowDatas data={this.state.data} />
        <CommentList id={this.state.data.length} handleSubmitRequest={this.handleSubmitRequest} />
      </div>
    )
  }
});


var ShowDatas = React.createClass({
  render: function() {
    return (
      <div>
        {
          this.props.data.map(function(node) {
            return <h2 key={node.id}>{node.author} said: {node.text}</h2>
          })
        }
      </div>
    );
  }
});




var CommentList = React.createClass({

  handleSubmit: function(e) {
    e.preventDefault();
    var innerAuthor = this.refs.author.value.trim();
    var innerText = this.refs.text.value.trim();
    if (!innerAuthor || !innerText) return;

    this.props.handleSubmitRequest({author: innerAuthor, text: innerText, id: this.props.id++});

    this.refs.author.value = '';
    this.refs.text.value = '';

    return;
  },

  render: function() {
    return (
      <div>
        <form className="dataField" onSubmit={this.handleSubmit} handleSubmitRequest={this.props.handleSubmitRequest}>
         <input type="text" ref="author" />
         <input type="text" ref="text" />
         <input type="submit" />
       </form>
      </div>
    );
  }
});



ReactDOM.render(
  <Comment url="datas.json" />,
  document.getElementById('content')
);