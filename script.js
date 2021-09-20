const addNotes = document.querySelector('.add-notes');
const notesList = document.querySelector('.notes');
const notes = JSON.parse(localStorage.getItem('notes')) || [];
const inputNote = document.getElementById('input-note');
const inputTag = document.getElementById('input-tags');

function addNote(e) {
	e.preventDefault();
	if (inputTag.value) {
		const text = inputNote.value;
		const tagText = inputTag.value;
		let note = { text, tagText };
		notes.push(note);
	} else {
		const text = inputNote.value;
		const tagText = '';
		let note = { text, tagText };
		notes.push(note);
	}

	populateList(notes, notesList);
	localStorage.setItem('notes', JSON.stringify(notes));
	inputTag.value = '';
	this.reset();
}

function populateList(plates = [], platesList) {
	platesList.innerHTML = plates
		.map(plate => {
			return `
            <p id="note-text">${plate.text}</p>
            <p id="tag-text">${plate.tagText}</p>
            `;
		})
		.join('');
}

addNotes.addEventListener('submit', addNote);
populateList(notes, notesList);
