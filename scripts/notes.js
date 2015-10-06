/*var notePad = {
	notes: [],
	id: 0
};


var NewNote = React.createClass({
	addNewNote: function() {
		notePad.notes.push(this.props.note);
	},
	render: function() {
		return (
			<div>{this.props.key}</div>
		)
	}
});


var NotesForm = React.createClass({
	handleSubmit: function(e) {
		e.preventDefault();
		var note = React.findDOMNode(this.refs.note).value.trim();
		if(!note) return;

		return (
			<NewNote key={note} />
		);
	},

	render: function() {
		return (
			<div>
				<form>
					<input type="text" ref="note" placeholder="Type your text:" />
					<input type="submit" onClick={this.handleSubmit} value="Post" />
				</form>
			</div>	
		)
	}
});


var Change = function() {
	React.render(
		<NotesForm />,
		document.getElementById('content')
	)
}


Change();*/




var notePad = {
	notes: ['Andrew', 'Financial University'],
	id: 1
};


var NotesList = React.createClass({
	render: function() {
		return (
			<div>
				{
					notePad.notes.map(function (note) {
						return (
							<div>{note}</div>
						);
					})
				}
			</div>	
		);
	}
});

//Вывели все элементы


var SubmitNote = React.createClass({

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
			<div>
				<form>
					<input type="text" ref="text" placeholder="Your text here: " />
					<input type="submit" value="Post" onClick={this.handleSubmit} />
					<button onClick={this.handleDelete}>Clear the last added note</button>
				</form>
				<NotesList />
			</div>
			
		)
	}
});

var load = function() {
	React.render (
		<SubmitNote />,
		document.getElementById('content')
	);
};

load();







