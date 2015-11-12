var IndexDispatcher = require('../dispatcher/IndexDispatcher.js');
var IndexConstants = require('../constants/IndexConstants');
var DataStore = require('./DataStore.js');
var MenuStore = require('./MenuStore.js');
var _ = require('underscore');
var EventEmitter = require('events').EventEmitter;
var $ = require('jquery');

var languageData = null;
var completeData = {};
var initialInputValue = ''; //?
var menuVisible = false; //?
var dataVisible = false;
var _newInput = '';

function getLocalData(localData) {
  languageData = localData;
};

function showData(dataName) {
    languageData.map(function(node) {
      if(node.language.toUpperCase() === dataName.toUpperCase()) {
        DataStore.showData(node);
        $('body, html').animate({scrollTop: window.innerHeight}, 1000);
      }
    });
};

function showMenu(dataName) {
  var node = languageData.filter(function(node) {
    return (node.language.toUpperCase().match(dataName.toUpperCase()))
  });

  if(node.length !== 0 ) {
    MenuStore.showMenu(node);
  };
};

var FormStore = _.extend({}, EventEmitter.prototype, {

  showData: function(userData) {
      showData(userData);
  },

  showMenu: function(data) {
    showMenu(data);
  },

  hideMenu: function() {
    MenuStore.hideMenu();
  },

  getNewInput: function() {
    return _newInput;
  }, 
  changeInput: function(newInput) {
    _newInput =  newInput;
    this.emitChange();
  },
  emitChange: function() {
    this.emit('change');
  },

  addChangeListener: function(callback) {
    this.on('change', callback);
  },

  removeChangeListener: function(callback) {
    this.removeListener('change', callback);
  }
});

IndexDispatcher.register(function(payload) {
  switch (payload.action.actionType) {

    case IndexConstants.DATA_RECEIVE:
      getLocalData(payload.action.data);
      break;

    case IndexConstants.DATA_SHOW:
      showData(payload.action.data);
      break;

    default:
      return true;
  }

  FormStore.emitChange();

  return true;
});

module.exports = FormStore;
