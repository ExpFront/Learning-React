var IndexDispatcher = require('../dispatcher/IndexDispatcher.js');
var IndexConstants = require('../constants/IndexConstants');
var FormStore = require('./FormStore.js');
var _ = require('underscore');
var EventEmitter = require('events').EventEmitter;

var _menuNode = {};
var _menuIsVisible = false;

function getLocalData(localData) {
  languageData = localData;
};


var MenuStore = _.extend({}, EventEmitter.prototype, {

  showMenu: function(node) {
    _menuNode = node;
    _menuIsVisible = true;
    this.emitChange();
  },

  hideMenu: function() {
    _menuIsVisible = false;
    this.emitChange();
  },

  getMenuNode: function() {
    return _menuNode;
  },

  getMenuIsVisible: function() {
    return _menuIsVisible;
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

    case IndexConstants.CONTENT_ADD:
      addContent(payload.action.data);
      break;

    default:
      return true;
  }

  MenuStore.emitChange();

  return true;
});

module.exports = MenuStore;
