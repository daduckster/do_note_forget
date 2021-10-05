// Note Input Form
const noteForm = document.querySelector('.note-form');
const noteTextInputField = document.querySelector('.note-form__text-input');
const tagInputField = document.querySelector('.note-form__tag-input');

// Search Form
const searchForm = document.querySelector('.searchbar-form');
const searchbar = document.querySelector('.searchbar-form__search-input');

// Notes Display
const notesContainer = document.querySelector('.notes-container');

// Local Storage Access
const notesInStorage = JSON.parse(localStorage.getItem('notes')) || [];

noteForm.addEventListener('submit', createNote);

function createNote(e) {
	e.preventDefault();

	if (!noteTextInputField.value) {
		return;
	}

	const text = noteTextInputField.value;
	const tag = tagInputField.value || '';
	const note = { text, tag };

	notesInStorage.push(note);

	updateLocalStorage();

	noteTextInputField.value = '';
	tagInputField.value = '';

	createNoteDOM(text, tag);
}

function updateLocalStorage() {
	localStorage.setItem('notes', JSON.stringify(notesInStorage));
}

// ?? arguments: text, tags, *mysterious* ??
function createNoteDOM(text, tag) {
	const div = document.createElement('div');
	const deleteBtn = document.createElement('button');
	const pText = document.createElement('p');
	const pTag = document.createElement('p');

	deleteBtn.textContent = 'x';
	pText.textContent = text;
	pTag.textContent = tag;

	div.classList.add('notes-container__div');
	deleteBtn.classList.add('notes-container__delete-btn');
	pText.classList.add('notes-container__div__p-text');
	pTag.classList.add('notes-container__div__p-tag');

	div.appendChild(deleteBtn);
	div.appendChild(pText);
	div.appendChild(pTag);

	notesContainer.appendChild(div);
}

function populateList() {
	notesInStorage.map(note => createNoteDOM(note.text, note.tag));
}

populateList();

// function tagSearch() {
// 	const searchInput = searchbar.value;
// 	const searchedTags = tagsInStorage.filter(tag => {
// 		return tag.includes(searchInput);
// 	});
// 	console.log(searchedTags);
// 	const wantedNotes = notesInStorage.filter(note => {
// 		for (i = 0; i < searchedTags.length; i++) {
// 			if (note.tagText === searchedTags[i]) {
// 				return note;
// 			}
// 		}
// 	});
// 	notesContainer.innerHTML = '';
// 	notesContainer.innerHTML = wantedNotes
// 		.map(note => {
// 			return `
//         <li class="note-text">${note.text}</li>
//         <li class="tag-text">${note.tagText}</li>
//         `;
// 		})
// 		.join('');
// 	console.log(wantedNotes);
// }

// TODO: Delete note function
