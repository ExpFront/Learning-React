import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../actions/languages';

import $ from 'jquery';

class About extends React.Component {
    render() {
      if (this.props.data) {
        return (
          <section className="section-about">
            <div className="container-fluid">
              <div className="row text-center">
                <div className="col-xs-6 col-xs-offset-3">
                  <div>
                    <h2>
                      {this.props.data[0].language}
                      </h2>
                      <p className="lead">{this.props.data[0].about}</p>
                    <span>You can learn more: <a href={this.props.data[0].fullLink}>{this.props.data[0].link}</a></span>
                  </div>
                </div>
              </div>
            </div>
          </section>
        );
      }

      return null;
    }
}

class List extends React.Component {
    render() {
      if (this.props.languages) {
        return (
          <ul>
            {this.props.languages.map((lang) => {
              return (
                <li key={lang.id} onClick={this.props.select.bind(null, lang.id)}><a>{lang.language}</a></li>
              );
            })}
          </ul>
        );
      }

      return null;
    }
}


class Landing extends React.Component {

  handleOnChange(e) {
    e.preventDefault();

    this.props.languages.selected = e.target.value;

    if (e.target.value.length > 0 ) {
      this.props.actions.filter(e.target.value);
    }
    else this.props.actions.hideList();
  }

  select(id) {
    this.props.actions.select(id);

    this.props.actions.hideList();
  }

  handleOnSubmit(e) {
    e.preventDefault();

    this.props.actions.showData(this.refs.input.value);

    $('body, html').animate({scrollTop: window.innerHeight}, 1000);
  }

  render() {
    console.log(this.props.languages);
    return (
      <div>
        <section className="section-intro">
          <div className="container-fluid">
            <div className="row text-center">
              <div className="entry col-xs-12 text-center">
                <div className="col-xs-12 col-md-8 col-md-offset-2 text-center hidden-xs">
                  <form onSubmit={this.handleOnSubmit.bind(this)}>
                    <h2 className="h2-intro">Programming will bring you to a new world!</h2>
                    <div className="input-group">
                      <input type="text" className="form-control" value={this.props.languages.selected} ref="input" placeholder="Start your journey by choosing programming language:" onChange={this.handleOnChange.bind(this)} />
                      <span className="input-group-btn">
                        <input type="submit" className="btn btn-danger" value="Travel" />
                      </span>
                    </div>
                  </form>
                  <div className="searchMenuField">
                    <List languages={this.props.languages.filtered} select={this.select.bind(this)} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <About data={this.props.languages.shown} />
      </div>
    );
  }
}


function selectState(state) {
  return {
    languages: state.languages,
  };
}

function passActions(dispatch) {
  return {
    actions: bindActionCreators({ ...actions }, dispatch),
  };
}

export default connect(selectState, passActions)(Landing);
