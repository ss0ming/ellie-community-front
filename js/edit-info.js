const modalOpenButton = document.querySelector('#withdraw');
const modalCloseButton = document.querySelector('.cancel-btn');
const modalCloseButton2 = document.querySelector('.check-btn');
const modal = document.querySelector('.modal');

modalOpenButton.addEventListener('click', () => {
modal.classList.remove('hidden');
});

modalCloseButton.addEventListener('click', () => {
modal.classList.add('hidden');
});

modalCloseButton2.addEventListener('click', () => {
    modal.classList.add('hidden');
});