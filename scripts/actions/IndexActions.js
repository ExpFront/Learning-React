var IndexConstants = require('../constants/IndexConstants.js');
var IndexDispatcher = require('../dispatcher/IndexDispatcher.js');


var IndexActions = {
  receiveData: function(data) {
    IndexDispatcher.handleAction({
      actionType: IndexConstants.DATA_RECEIVE,
      data: data
    })
  },
  
  showMenu: function(data) {
    IndexDispatcher.handleAction({
      actionType: IndexConstants.MENU_ADD,
      data: data
    })
  },

  showData: function(data) {
    IndexDispatcher.handleAction({
      actionType: IndexConstants.DATA_SHOW,
      data: data
    })
  }
};

module.exports = IndexActions;
