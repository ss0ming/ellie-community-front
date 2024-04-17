const modalOpenButton = document.querySelector('#withdraw');
const modalCloseButton = document.querySelector('.cancel-btn');
const modalCloseButton2 = document.querySelector('.check-btn');
const modal = document.querySelector('.modal');

const dropdownBtn = document.querySelector(".header-profile-img");
const dropdownContent = document.querySelector(".dropdown-content");

modalOpenButton.addEventListener('click', () => {
    modal.classList.remove('hidden');
});

modalCloseButton.addEventListener('click', () => {
    modal.classList.add('hidden');
});

modalCloseButton2.addEventListener('click', () => {
    modal.classList.add('hidden');
});

dropdownBtn.addEventListener('click', () => {
    dropdownContent.classList.toggle('active');
    console.log("실행완료");
})