window.onload = () => {
  setTimeout();
};


setTimeout(() => {
  loader.classList.add('disappear');
  mainPage.classList.remove('disappear');
  mainPage.classList.add('show');
}, 3000);