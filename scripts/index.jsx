import React from 'react';
import ReactDOM from 'react-dom';
import SearchMenu from './components/search/menu.jsx';
import SearchData from './components/search/data.jsx';
import $ from 'jquery';

class SearchForm extends React.Component {
  constructor() {
    super();
    this.state = { innerValue: null};
    this.state = { newData: null };
    this.state = { newObj: {} };
    this.state = { appData: [] };
    this.state = { active: false };
    this.state = { dataActive: false}
    this.passData = this.passData.bind(this);
  }
  loadComponents() {
		$.ajax({
			url: 'langObject.json',
			dataType: 'json',
			cache: false,
			success: (appData) => {
				this.setState({appData});
			},
			error(xhr, status, err) {
				console.error(this.url, status, err.toString());
    	},
  	})
	}
  componentWillMount() {
    this.loadComponents();
  }
  handleChange(e) {
    const innerValue = this.refs.innerValue.value.trim();
    if (innerValue.length > 1) {
      this.setState({innerValue: e.target.value, active: true});
      document.getElementsByClassName('searchMenuField')[0].style.display = 'block';
    }
    else {
      document.getElementsByClassName('searchMenuField')[0].style.display = 'none';
    }
  }

  setNewInnerValue(newInnerValue) {
    this.refs.innerValue.value = newInnerValue;
  }

  handleSubmit(e) {
    e.preventDefault();
    if (this.state.newObj) {
      this.setState({newData: this.refs.innerValue.value, dataActive: true});
      document.getElementsByClassName('section-about')[0].style.display = 'block';
      $('body, html').animate({scrollTop: window.innerHeight}, 1000);
    }
    else {
      if (this.refs.innerValue.value != 0) {
        this.state.appData.map((appNode) => {
          if(appNode.language.toUpperCase().match(this.refs.innerValue.value.toUpperCase())) {
            this.setState({newObj: appNode, newData: this.refs.innerValue.value, dataActive: true});
            document.getElementsByClassName('section-about')[0].style.display = 'block';
            $('body, html').animate({scrollTop: window.innerHeight}, 1000);
          }
        })
      }
    }
  }

  passData(newText) {
    this.setState({ newObj: newText })
  }

  render() {
    return (
      <div>
        <section className="section-intro">
          <div className="container-fluid">
            <div className="row text-center">
              <div className="entry col-xs-12 text-center">
                <div className="col-xs-12 col-md-8 col-md-offset-2 text-center hidden-xs">
                  <form onSubmit={this.handleSubmit.bind(this)}>
                    <h2 className="h2-intro">Programming will bring you to a new world!</h2>
                    <div className="input-group">
                      <input type="text" ref="innerValue" placeholder="Start your journey by choosing programming language:" className="form-control" onChange={this.handleChange.bind(this)} />
                      <span className="input-group-btn">
                        <input type="submit" className="btn btn-danger" value="Travel" />
                      </span>
                    </div>
                  </form>
                  <div className="searchMenuField">
                    <SearchMenu active={this.state.active} passData={this.passData} innerValue={this.state.innerValue} setNewInnerValue={this.setNewInnerValue.bind(this)} />
                  </div>
                </div>
              </div>
            </div>
            <div className="goDown">Some Text</div>
          </div>
        </section>
        <section className="section-about">
          <div className="container-fluid">
            <div className="row text-center">
              <div className="col-xs-6 col-xs-offset-3">
                <SearchData dataActive={this.state.dataActive} newObj={this.state.newObj} />
              </div>
            </div>
          </div>
        </section>
      </div>
    )
  }
}

ReactDOM.render(
  <SearchForm />,
  document.getElementsByClassName('entry')[0]
)




// What if the user whats to delete previous values? It will stop at 3 chars in render.

//Via input value? pass it to the child, get back changed and changes value
