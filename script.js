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
// Tags Array for Search Function
const tagsInStorage = JSON.parse(localStorage.getItem('tags')) || [];

noteForm.addEventListener('submit', createNote);
searchForm.addEventListener('submit', tagSearch);

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

	populateList(notesInStorage, notesContainer);
}

function updateLocalStorage() {
	localStorage.setItem('notes', JSON.stringify(notesInStorage));
	localStorage.setItem('tags', JSON.stringify(tagsInStorage)); // remove
}

// IDEA: rewrite with createElement?
// needs classes: note-text / tag-text (maybe rewrite too btw)

/*
<div>
<button>X</button>
<p>text</p> 
	<p>tag</p>
</div>
*/

// PSEUDO CODE
/* 
x create div
x create delete button
x create p - text
x create p - tag

x add class for div
x add class for button
x add class for p - text
x add class for p - tag

x append button to div
x append p - text to div
x append p - tag to div
x append div to notesContainer
*/

// function populateNotesContainer() {
// 	const div = document.createElement('div');
// 	const deleteBtn = document.createElement('button');
// 	const pText = document.createElement('p');
// 	const pTag = document.createElement('p');

// 	div.classList.add('notes-container__div');
// 	deleteBtn.classList.add('notes-container__delete-btn');
// 	pText.classList.add('notes-container__div__p-text');
// 	pTag.classList.add('notes-container__div__p-tag');

// 	div.appendChild(deleteBtn);
// 	div.appendChild(pText);
// 	div.appendChild(pTag);
// 	notesContainer.appendChild(div);
// }

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

// REMOVE tags array in local storage after new tagSearch function
function tagSearch() {
	console.log(tagsInStorage);
	const searchInput = searchbar.value;
	const searchedTags = tagsInStorage.filter(tag => {
		return tag.includes(searchInput);
	});
	console.log(searchedTags);
	const wantedNotes = notesInStorage.filter(note => {
		for (i = 0; i < searchedTags.length; i++) {
			if (note.tagText === searchedTags[i]) {
				return note;
			}
		}
	});
	notesContainer.innerHTML = '';
	notesContainer.innerHTML = wantedNotes
		.map(note => {
			return `
        <li class="note-text">${note.text}</li>
        <li class="tag-text">${note.tagText}</li>
        `;
		})
		.join('');
	console.log(wantedNotes);
}

// TODO: Delete note function

populateList(notesInStorage, notesContainer);

// addNotes = noteForm
// notesContainer = notesContainer
// notes = notesInStorage
// noteTextInputField = noteTextInputField
// tagInputField = tagInputField
// tags = tagsInStorage
// inputFilter = searchbar
// *DEPRECATED* filterNotes = submit button for searchbar -> use searchForm (submit event)
