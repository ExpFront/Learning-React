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

  childContextTypes: {
    data: React.PropTypes.array,
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
     <div>
        <ShowDatas data={this.state.data} />
        <CommentList id={this.state.data.length} handleSubmitRequest={this.handleSubmitRequest} />
      </div>
    )
  }
});


var ShowDatas = React.createClass({
  contextTypes: {
    data: React.PropTypes.array
  },

  render: function() {
    return (
      <div>
        {
          this.context.data.map(function(node) {
            return <h2 key={node.id}>{node.author} said: {node.text}</h2>
          })
        }
      </div>
    );
  }
});




var CommentList = React.createClass({

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
      <div>
        <form className="dataField" onSubmit={this.handleSubmit}>
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