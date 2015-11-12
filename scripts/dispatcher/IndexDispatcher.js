var Dispatcher = require('flux').Dispatcher;

// Create dispatcher instance
const IndexDispatcher = new Dispatcher();


IndexDispatcher.handleAction = function (action) {
  this.dispatch({
    source: 'VIEW_ACTION',
    action: action
  });
}

module.exports = IndexDispatcher;
