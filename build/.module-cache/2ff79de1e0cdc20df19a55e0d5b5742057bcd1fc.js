var notePad = {
	notes: ['Andrew', 'Financial University'],
	id: 1
};


var NotesList = React.createClass({displayName: "NotesList",
	render: function() {
		return (
			React.createElement("div", null, 
					notePad.notes.map(function (note) {
						return (
							React.createElement("div", null, note)
						);
					})
				
			)	
		);
	}
});

//Вывели все элементы


var SubmitNote = React.createClass({displayName: "SubmitNote",

	handleSubmit: function(e) {
		e.preventDefault();
		var newNote = React.findDOMNode(this.refs.text).value.trim();

		if(!newNote) return;

		notePad.notes.push(newNote);
		load();

		React.findDOMNode(this.refs.text).value = '';
	},

	handleDelete: function(e) {
		e.preventDefault();
		notePad.notes.pop();
		load();
	},

	render: function() {
		return (
			React.createElement("div", null, 
				React.createElement("form", null, 
					React.createElement("input", {type: "text", ref: "text", placeholder: "Your text here: "}), 
					React.createElement("input", {type: "submit", value: "Post", onClick: this.handleSubmit}), 
					React.createElement("button", {onClick: this.handleDelete}, "Clear the last added note")
				), 
				React.createElement(NotesList, null)
			)
			
		)
	}
});

var load = function() {
	React.render (
		React.createElement(SubmitNote, null),
		document.getElementById('content')
	);
};

load();







