import React from 'react';
import ReactDOM from 'react-dom';

class SearchComponent extends React.Component {
  constuctor() {
    super();
    this.state = { data: [] };
  }
  render() {
    <SearchForm />
  }
}


class SearchForm extends React.Component {
  handleChange() {
    <Search />
  }
  handleSubmit(event) {
    event.preventDefault()
    const searchValue = this.refs.innerValue.value.trim();
    if(!searchValue) return;

    //TODO: send datas into .json
    return;
  }
  render() {
    <form onSubmit={this.handleSubmit.bind(this)}>
      <input type="text" ref="innerValue" placeholder="What are interested in?" onChange={this.handleChange.bind(this)} />
      <input type="submit" value="Search" />
    </form>
  }
}

ReactDOM.render() {
  <searchComponent />,
  document.getElementByClassName('col-xs-12')[0]
}
