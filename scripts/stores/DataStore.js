var IndexDispatcher = require('../dispatcher/IndexDispatcher.js');
var IndexConstants = require('../constants/IndexConstants');
var _ = require('underscore');
var EventEmitter = require('events').EventEmitter;

var _isVisible = false;
var _contentData = {};

var DataStore = _.extend({}, EventEmitter.prototype, {

  showData: function(data) {
    _isVisible = true;
    _contentData = data;
    this.emitChange();
  },

  getIsVisible: function() {
    return _isVisible;
  },

  getContentData: function() {
      return _contentData;
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
    case IndexConstants.DATA_HANDLE:
      //DataStore.showData(payload.action.data);
      break;

    default:
      return true;
  }

  DataStore.emitChange();

  return true;
});

module.exports = DataStore;
