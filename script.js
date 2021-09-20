const addNotes = document.querySelector('.add-notes');
const notesList = document.querySelector('.notes');
const notes = JSON.parse(localStorage.getItem('notes')) || [];
// const notes = [];
const inputNote = document.getElementById('input-note');

function addNote(e) {
	e.preventDefault();
	const text = inputNote.value;
	const note = { text };
	notes.push(note);
	populateList(notes, notesList);
	localStorage.setItem('notes', JSON.stringify(notes));
	this.reset();
}

function populateList(plates = [], platesList) {
	platesList.innerHTML = plates
		.map(plate => {
			return `
            <p>${plate.text}</p>
            `;
		})
		.join('');
}

addNotes.addEventListener('submit', addNote);
populateList(notes, notesList);
