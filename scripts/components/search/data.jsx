const React = require('react');
const ReactDOM = require('react-dom');
const $ = require('jquery');

export default class SearchData extends React.Component {
  render() {
    if(this.props.dataActive) {
      return (
        <div>
          <h2>
            {this.props.newObj.language}
          </h2>
          <p className="lead">{this.props.newObj.about}</p>
          <span>You can learn more: <a href={this.props.newObj.fullLink}>{this.props.newObj.link}</a></span>
        </div>
      )
    }
    else {
      return null;
    }
  }
}
