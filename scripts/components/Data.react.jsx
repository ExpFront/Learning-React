var React = require('react');
var FormStore = require('../stores/FormStore.js');
var DataStore = require('../stores/DataStore.js');

function getData() {
  return {
    contentData: DataStore.getContentData(),
    isVisible: DataStore.getIsVisible()
  }
};

var DataComponent = React.createClass({

  getInitialState: function() {
    return getData();
  },

  componentDidMount: function() {
    DataStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function() {
    DataStore.removeChangeListener(this._onChange);
  },

  render: function() {
    if(this.state.isVisible) {
      return (
        <section className="section-about">
          <div className="container-fluid">
            <div className="row text-center">
              <div className="col-xs-6 col-xs-offset-3">
                <div>
                  <h2>
                    {this.state.contentData.language}
                  </h2>
                  <p className="lead">{this.state.contentData.about}</p>
                  <span>You can learn more: <a href={this.state.contentData.fullLink}>{this.state.contentData.link}</a></span>
                </div>
              </div>
            </div>
          </div>
        </section>
      )
    }
    else {
      return null;
    }
  },

  _onChange: function() {
    this.setState(getData());
  }
});

module.exports = DataComponent;
