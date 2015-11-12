var React = require('react');
var ReactDOM = require('react-dom');
var $ = require('jquery');
var FormStore = require('../stores/FormStore.js');
var MenuComponent = require('./Menu.react.jsx');
var DataComponent = require('./Data.react.jsx');
var MenuComponent = require('./Menu.react.jsx');


function getFormState() {
	return {
		newValue: FormStore.getNewInput()
	}
};



var FormComponent =  React.createClass({

  getInitialState: function() {
    return getFormState();
  },

  showData: function(e) {
    e.preventDefault();
    if(this.refs.innerValue.value != 0) {
      FormStore.showData(this.refs.innerValue.value);
    }
  },

  showMenu: function(e) {
    if(e.target.value.length > 0) {
      FormStore.showMenu(e.target.value);
    }
    else {
      FormStore.hideMenu();
    }
  },


  componentDidMount: function() {
    FormStore.addChangeListener(this._onChange);


	},

  // Remove change listeners from stores
  componentWillUnmount: function() {
    FormStore.removeChangeListener(this._onChange);
  },

  render: function() {
    return (
      <div>
        <section className="section-intro">
          <div className="container-fluid">
            <div className="row text-center">
              <div className="entry col-xs-12 text-center">
                <div className="col-xs-12 col-md-8 col-md-offset-2 text-center hidden-xs">
                  <form onSubmit={this.showData} >
                    <h2 className="h2-intro">Programming will bring you to a new world!</h2>
                    <div className="input-group">
                      <input onInput={this.showMenu} type="text" ref="innerValue" placeholder="Start your journey by choosing programming language:" className="form-control" />
                      <span className="input-group-btn">
                        <input type="submit" className="btn btn-danger" value="Travel" />
                      </span>
                    </div>
                  </form>
                  <div className="searchMenuField">
                    <MenuComponent />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <DataComponent />
      </div>
    )
  },

  _onChange() {
    this.setState(getFormState());
    console.log(this.state.newValue);
  }
});

module.exports = FormComponent;

/* After /form
<div className="searchMenuField">
  <MenuComponent active={this.state.active} passData={this.passData} innerValue={this.state.innerValue} setNewInnerValue={this.setNewInnerValue} />
</div>
*/
