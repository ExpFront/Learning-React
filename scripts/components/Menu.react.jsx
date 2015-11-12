var React = require('react');
var ReactDOM = require('react-dom');
var $ = require('jquery');
var MenuStore = require('../stores/MenuStore');
var FormStore = require('../stores/FormStore');


function getMenuState() {
	return {
		menuNode: MenuStore.getMenuNode(),
		menuIsVisible: MenuStore.getMenuIsVisible()
	}
};

var MenuComponent = React.createClass ({

	getInitialState: function() {
		return getMenuState();
	},

	componentDidMount: function() {
    MenuStore.addChangeListener(this._onChange);

	},

  // Remove change listeners from stores
  componentWillUnmount: function() {
    MenuStore.removeChangeListener(this._onChange);
  },

	handleClick: function(e) {
		FormStore.changeInput(e.target.value);
		document.getElementsByClassName('searchMenuField')[0].style.display = 'none';
	},

	render: function() {
		if(this.state.menuIsVisible) {
			return (
				<ul>
				{
					this.state.menuNode.map((node) => {
            return <li key={node.id} value={node.lanuage} onClick={this.handleClick}><a>{node.language}</a></li>
					})
				}
				</ul>
			)
		}
		else {
			return null;
		}
	},
	_onChange() {
		this.setState(getMenuState());
	}
});

module.exports = MenuComponent;

// Compare this.props.innerValue with each data.language via indexOf() or alternative method in ES6. If the beginning is the same, show these full language name in .searchMenuField.
