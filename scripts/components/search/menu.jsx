const React = require('react');
const ReactDOM = require('react-dom');
const $ = require('jquery');

export default class SearchMenu extends React.Component {
	constructor() {
		super();
		this.state = { data: [] };
	}
	loadComponents() {
		$.ajax({
			url: './../langObject.json',
			dataType: 'json',
			cache: false,
			success: (data) => {
				this.setState({data});
			},
			error(xhr, status, err) {
				console.error(this.url, status, err.toString());
    	},
  	})
	}
	handleClick(node, e) {
		{this.props.setNewInnerValue(node.language)}
		{this.props.passData(node)}
		document.getElementsByClassName('searchMenuField')[0].style.display = 'none';
	}

	componentWillMount() {
		this.loadComponents();
	}
	render() {
		if(this.props.active) {
			return (
				<ul>
					{
						this.state.data.map((node) => {
							if(node.language.toUpperCase().match(this.props.innerValue.toUpperCase())) {
            		return <li key={node.id} value={node.lanuage} onClick={this.handleClick.bind(this, node)}><a>{node.language}</a></li>;
          		}
						})
					}
				</ul>
			)
		}
		else {
			return null;
		}
	}
}

// Compare this.props.innerValue with each data.language via indexOf() or alternative method in ES6. If the beginning is the same, show these full language name in .searchMenuField.
