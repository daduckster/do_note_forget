const addNotes = document.querySelector('.add-notes');
const notesList = document.querySelector('.notes');
const notes = JSON.parse(localStorage.getItem('notes')) || [];
const inputNote = document.getElementById('input-note');
// const deleteNote = document.querySelector('.delete-note');

const inputTag = document.getElementById('input-tags');
const tags = JSON.parse(localStorage.getItem('tags')) || [];

const inputFilter = document.getElementById('input-filter');
const filterNotes = document.querySelector('.filter-notes');

function addNote(e) {
	e.preventDefault();
	if (inputTag.value) {
		const text = inputNote.value;
		const tagText = inputTag.value;
		let note = { text, tagText };
		notes.push(note);
		if (!tags.includes(tagText)) {
			tags.push(tagText);
		}
	} else {
		const text = inputNote.value;
		const tagText = '';
		let note = { text, tagText };
		notes.push(note);
	}

	populateList(notes, notesList);
	localStorage.setItem('notes', JSON.stringify(notes));
	localStorage.setItem('tags', JSON.stringify(tags));
	inputTag.value = '';
	this.reset();
}

function populateList(plates = [], platesList) {
	platesList.innerHTML = plates
		.map(plate => {
			return `
            <li class="note-text">${plate.text}</li>
            <li class="tag-text">${plate.tagText}</li>
						<button class="delete-note">X</button>
            `;
		})
		.join('');
}

function tagSearch() {
	console.log(tags);
	const searchInput = inputFilter.value;
	const searchedTags = tags.filter(tag => {
		return tag.includes(searchInput);
	});
	console.log(searchedTags);
	const wantedNotes = notes.filter(note => {
		for (i = 0; i < searchedTags.length; i++) {
			if (note.tagText === searchedTags[i]) {
				return note;
			}
		}
	});
	notesList.innerHTML = '';
	notesList.innerHTML = wantedNotes
		.map(note => {
			return `
        <li class="note-text">${note.text}</li>
        <li class="tag-text">${note.tagText}</li>
        `;
		})
		.join('');
	console.log(wantedNotes);
}

function noteDeleting(e) {
	console.dir(e);
}

addNotes.addEventListener('submit', addNote);
filterNotes.addEventListener('keyup', tagSearch);
// deleteNote.addEventListener('click', noteDeleting);
populateList(notes, notesList);
