/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports) {

	const Comment = React.createClass({displayName: "Comment",
	  getInitialState: function() {
	    return {data: []};
	  },

	  componentWillMount: function() {
	    this.loadComponents();
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

	  render: function() {
	    return (
	     React.createElement("div", null,
	        React.createElement(ShowDatas, {data: this.state.data}),
	        React.createElement(CommentList, {id: this.state.data.length, handleSubmitRequest: this.handleSubmitRequest})
	      )
	    )
	  }
	});


	const ShowDatas = React.createClass({displayName: "ShowDatas",
	  render: function() {
	    return (
	      React.createElement("div", null,

	          this.props.data.map(function(node) {
	            return React.createElement("h2", {key: node.id}, node.author, " said: ", node.text)
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

	    this.props.handleSubmitRequest({author: innerAuthor, text: innerText, id: this.context.id++});

	    this.refs.author.value = '';
	    this.refs.text.value = '';

	    return;
	  },

	  render: function() {
	    return (
	      React.createElement("div", null,
	        React.createElement("form", {className: "dataField", onSubmit: this.handleSubmit},
	         React.createElement("input", {type: "text", ref: "author", placeholder: "Type your name: "}),
	         React.createElement("input", {type: "text", ref: "text", placeholder: "Say something: "}),
	         React.createElement("input", {type: "submit", value: "Post"})
	       )
	      )
	    );
	  }
	});



	ReactDOM.render(
	  React.createElement(Comment, {url: "datas.json"}),
	  document.getElementById('content')
	);


/***/ }
/******/ ]);
