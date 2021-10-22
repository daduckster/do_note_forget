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

const showAllBtn = document.querySelector('.searchbar-form-container__show-all-btn');

noteForm.addEventListener('submit', e => {
	createNote(e);
	yourNotesTitle.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'start' });
});
searchbar.addEventListener('keyup', tagSearch);
searchbar.addEventListener('search', tagSearch);
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
	const id = `${createID()}`;
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

	div.classList.add(`id${id}`);
	deleteBtn.classList.add('notes-container__div__delete-btn');
	pTitle.classList.add('notes-container__div__p-title');
	pText.classList.add('notes-container__div__p-text');
	pTag.classList.add('notes-container__div__p-tag');

	deleteBtn.addEventListener('click', e => deleteNote(id, e));

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
	console.log('went to func');
	if (searchbar.value === '') {
		populateList();
		showAllBtn.classList.add('hidden');
		return;
	}

	const searchInput = searchbar.value.toLowerCase();
	const fittingNotes = notesInStorage.filter(
		note =>
			note.tag.toLowerCase().includes(searchInput) ||
			note.text.toLowerCase().includes(searchInput) ||
			note.title.toLowerCase().includes(searchInput)
	);

	if (fittingNotes.length === 0) {
		const errorMessage = document.createElement('p');
		errorMessage.textContent = 'No notes found. Try another Tag!';
		errorMessage.classList.add('notes-container__div__error-message');
		notesContainer.appendChild(errorMessage);
		showAllBtn.classList.remove('hidden');
		showAllBtn.addEventListener('click', () => {
			searchbar.value = '';
			populateList();
			showAllBtn.classList.add('hidden');
			console.log('no fit');
		});
	} else {
		fittingNotes.map(({ title, text, tag, id }) => createNoteDOM(title, text, tag, id));
		showAllBtn.classList.remove('hidden');
		showAllBtn.addEventListener('click', () => {
			searchbar.value = '';
			populateList();
			showAllBtn.classList.add('hidden');
			console.log('fit');
		});
	}
}

function createID() {
	const randomID = Math.floor(Math.random() * 1000000000000000000000);
	return randomID;
}

function deleteNote(id, e) {
	const div = document.querySelector(`.id${id}`);
	div.classList.add('deleted');
	setTimeout(() => {
		const filteredNotes = notesInStorage.filter(note => note.id !== id);
		localStorage.setItem('notes', JSON.stringify(filteredNotes));
		notesInStorage = JSON.parse(localStorage.getItem('notes'));
		if (searchbar.value !== '') {
			tagSearch(e);
		} else {
			populateList();
		}
	}, 600);
}

function createToTopBtn() {
	const backToTopBtn = document.createElement('button');
	if (notesContainer.lastChild && notesContainer.lastChild.classList.contains('notes-container__back-to-top-btn')) {
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
}

// hide backToTopBtn when manually scolling to top of page
window.addEventListener('scroll', () => {
	if (notesInStorage.length !== 0) {
		if (window.scrollY <= 200) {
			if (notesContainer.lastChild.classList.contains('notes-container__back-to-top-btn')) {
				notesContainer.removeChild(notesContainer.lastChild);
			}
		}
	}
});
populateList();
