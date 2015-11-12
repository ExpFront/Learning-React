var IndexActions = require('../actions/IndexActions.js');

module.exports = {
	getLanguageData: function() {
		var data = JSON.parse(localStorage.getItem('language'));
		IndexActions.receiveData(data);
	}
}
