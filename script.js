// Note Input Form
const noteForm = document.querySelector('.note-form');
const titleTextInputField = document.querySelector('.note-form__title-input');
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
searchbar.addEventListener('keyup', tagSearch);
searchForm.addEventListener('submit', tagSearch);
document.addEventListener('scroll', createToTopBtn);

function createNote(e) {
	e.preventDefault();

	if (!noteTextInputField.value) {
		return;
	}
	const title = titleTextInputField.value;
	const text = noteTextInputField.value;
	const tag = tagInputField.value || '';
	const id = `${createID()}${text}`;
	const note = { title, text, tag, id };

	notesInStorage.push(note);

	updateLocalStorage();

	titleTextInputField.value = '';
	noteTextInputField.value = '';
	tagInputField.value = '';

	createNoteDOM(title, text, tag, id);
}

function updateLocalStorage() {
	localStorage.setItem('notes', JSON.stringify(notesInStorage));
}

// ?? arguments: text, tags, *mysterious* ??
function createNoteDOM(title, text, tag, id) {
	const div = document.createElement('div');
	const deleteBtn = document.createElement('button');
	const pTitle = document.createElement('p');
	const pText = document.createElement('p');
	const pTag = document.createElement('p');

	deleteBtn.textContent = 'x';
	pTitle.textContent = title;
	pText.textContent = text;
	pTag.textContent = tag;

	div.classList.add('notes-container__div');
	deleteBtn.classList.add('notes-container__delete-btn');
	pTitle.classList.add('notes-container__div__p-title');
	pText.classList.add('notes-container__div__p-text');
	pTag.classList.add('notes-container__div__p-tag');

	deleteBtn.addEventListener('click', () => deleteNote(id));

	div.appendChild(pTitle);
	div.appendChild(deleteBtn);
	div.appendChild(pText);
	div.appendChild(pTag);

	notesContainer.insertBefore(div, notesContainer.firstChild);
	div.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'start' });
}

function populateList(data) {
	const notes = data || notesInStorage;
	notesContainer.innerHTML = '';
	notes.map(note => createNoteDOM(note.title, note.text, note.tag, note.id));
}

function tagSearch(e) {
	e.preventDefault();
	// clear button creator
	notesContainer.innerHTML = '';
	const showAllBtn = document.createElement('button');
	showAllBtn.textContent = 'Show All';
	showAllBtn.classList.add('notes-container__show-all-btn');
	showAllBtn.addEventListener('click', () => {
		searchbar.value = '';
		notesContainer.innerHTML = '';
		populateList();
	});

	notesContainer.insertBefore(showAllBtn, notesContainer.firstChild);

	if (searchbar.value === '') {
		notesContainer.removeChild(showAllBtn);
	}

	const searchInput = searchbar.value;
	const fittingNotes = notesInStorage.filter(note => note.tag.includes(searchInput));

	if (fittingNotes.length === 0) {
		const errorMessage = document.createElement('p');
		errorMessage.textContent = 'No notes found';
		errorMessage.classList.add('notes-container__error-message');
		notesContainer.appendChild(errorMessage);
	} else {
		fittingNotes.map(({ title, text, tag, id }) => createNoteDOM(title, text, tag, id));
	}
}

function createID() {
	const randomID = Math.floor(Math.random() * 1000000000000000000);
	return randomID;
}

function deleteNote(id) {
	const filteredNotes = notesInStorage.filter(note => note.id !== id);

	localStorage.setItem('notes', JSON.stringify(filteredNotes));

	populateList(filteredNotes);
}

function createToTopBtn() {
	const backToTopBtn = document.createElement('button');
	if (notesContainer.lastChild.classList.contains('notes-container__back-to-top-btn')) {
		return;
	} else {
		backToTopBtn.textContent = 'To the Top';
		backToTopBtn.classList.add('notes-container__back-to-top-btn');
		notesContainer.appendChild(backToTopBtn);
		backToTopBtn.addEventListener('click', returnToTop);
	}
}

function returnToTop() {
	window.scrollTo(0, 0);
	setTimeout(() => {
		notesContainer.removeChild(notesContainer.lastChild);
	}, 1);
}

populateList();
