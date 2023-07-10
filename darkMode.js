
let botonToggle = document.getElementById('toggle-modo');
let headerElement = document.querySelector('header');
let mainElement = document.querySelector('main');

botonToggle.addEventListener('click', () => {
  document.body.classList.toggle('modo-oscuro');
  mainElement.classList.toggle(`modo-oscuro`);
  headerElement.classList.toggle(`modo-oscuro`);
});
