// Note Input Form
const noteForm = document.querySelector('.note-form');
const titleTextInputField = document.querySelector('.note-form__title-input');
const noteTextInputField = document.querySelector('.note-form__text-input');
const tagInputField = document.querySelector('.note-form__tag-input');

// Search Form
const searchForm = document.querySelector('.searchbar-form-container__searchbar-form');
const searchbar = document.querySelector('.searchbar-form-container__searchbar-form__search-input');

// Notes Display
const notesContainer = document.querySelector('.notes-container');

// Local Storage Access
let notesInStorage = JSON.parse(localStorage.getItem('notes')) || [];

const yourNotesTitle = document.querySelector('.your-notes-title');

noteForm.addEventListener('submit', e => {
	createNote(e);
	yourNotesTitle.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'start' });
});
searchbar.addEventListener('keyup', tagSearch);
searchForm.addEventListener('submit', tagSearch);
document.addEventListener('scroll', createToTopBtn);

function createNote(e) {
	e.preventDefault();

	if (!noteTextInputField.value) {
		return;
	}
	const title = titleTextInputField.value || '';
	const text = noteTextInputField.value;
	const tag = tagInputField.value || '';
	const id = `${createID()}${text}`;
	const note = { title, text, tag, id };

	updateLocalStorage(note);

	titleTextInputField.value = '';
	noteTextInputField.value = '';
	tagInputField.value = '';

	populateList();
}

function updateLocalStorage(note) {
	localStorage.setItem('notes', JSON.stringify([ ...notesInStorage, note ]));
	notesInStorage = JSON.parse(localStorage.getItem('notes'));
}

// ?? arguments: text, tags, *mysterious* ??
function createNoteDOM(title, text, tag, id) {
	const div = document.createElement('div');
	const deleteBtn = document.createElement('button');
	const pTitle = document.createElement('p');
	const pText = document.createElement('p');
	const pTag = document.createElement('p');

	deleteBtn.textContent = '✕';
	pTitle.textContent = title;
	pText.textContent = text;
	pTag.textContent = tag;

	div.classList.add('notes-container__div');
	deleteBtn.classList.add('notes-container__div__delete-btn');
	pTitle.classList.add('notes-container__div__p-title');
	pText.classList.add('notes-container__div__p-text');
	pTag.classList.add('notes-container__div__p-tag');

	deleteBtn.addEventListener('click', () => deleteNote(id));

	div.appendChild(pTitle);
	div.appendChild(deleteBtn);
	div.appendChild(pText);
	div.appendChild(pTag);

	notesContainer.insertBefore(div, notesContainer.firstChild);
}

function populateList() {
	const notes = notesInStorage;
	notesContainer.innerHTML = '';
	if (notes.length === 0) {
		return;
	}
	notes.map(note => createNoteDOM(note.title, note.text, note.tag, note.id));
}

function tagSearch(e) {
	e.preventDefault();
	notesContainer.innerHTML = '';

	if (searchbar.value === '') {
		populateList();
		return;
	}

	const searchInput = searchbar.value;
	const fittingNotes = notesInStorage.filter(note => note.tag.includes(searchInput));

	if (fittingNotes.length === 0) {
		const errorMessage = document.createElement('p');
		errorMessage.textContent = 'No notes found.  Try another Tag!';
		errorMessage.classList.add('notes-container__div__error-message');
		notesContainer.appendChild(errorMessage);
		const showAllBtn = document.createElement('button');
		showAllBtn.textContent = 'Show All';
		showAllBtn.classList.add('notes-container__div__show-all-btn');
		showAllBtn.addEventListener('click', () => {
			searchbar.value = '';
			populateList();
		});
		notesContainer.insertBefore(showAllBtn, notesContainer.firstChild);
	} else {
		fittingNotes.map(({ title, text, tag, id }) => createNoteDOM(title, text, tag, id));
		const showAllBtn = document.createElement('button');
		showAllBtn.textContent = 'Show All';
		showAllBtn.classList.add('notes-container__div__show-all-btn');
		showAllBtn.addEventListener('click', () => {
			searchbar.value = '';
			populateList();
		});
		notesContainer.insertBefore(showAllBtn, notesContainer.firstChild);
	}
}

function createID() {
	const randomID = Math.floor(Math.random() * 1000000000000000000);
	return randomID;
}

function deleteNote(id) {
	const filteredNotes = notesInStorage.filter(note => note.id !== id);
	localStorage.setItem('notes', JSON.stringify(filteredNotes));
	notesInStorage = JSON.parse(localStorage.getItem('notes'));

	populateList();
}

function createToTopBtn() {
	if (notesInStorage.length === 0) {
		return;
	}
	const backToTopBtn = document.createElement('button');
	if (notesContainer.lastChild.classList.contains('notes-container__back-to-top-btn')) {
		return;
	} else {
		backToTopBtn.textContent = 'To the top ▲';
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

// hide backToTopBtn when manually scolling to top of page
window.addEventListener('scroll', () => {
	if (window.scrollY <= 200) {
		if (notesContainer.lastChild.classList.contains('notes-container__back-to-top-btn')) {
			notesContainer.removeChild(notesContainer.lastChild);
		}
	}
});

populateList();
