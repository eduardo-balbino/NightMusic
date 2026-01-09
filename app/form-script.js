const inputFields = document.querySelectorAll('input');
const registerform = document.getElementById('register-form');

registerform.addEventListener('submit', (e) => {
  for (let i = 0; i < inputFields.length; i++) {
    const input = inputFields[i];
    if (input === undefined) {
      return;
    }

    if (input.nextElementSibling.dataset.name === 'error') {
      input.nextElementSibling.remove();
    }

    const errorMessage = hasErrors(input);
    if (errorMessage) {
      e.preventDefault();
      displayError(input, errorMessage);
      break;
    }
  }
});

function hasErrors(input) {
  if (!input.value) {
    return 'this field is required';
  }

  const passwordField = document.getElementById('password');

  if (input.type === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.value)) {
    return 'write a valid email';
  }

  if (input.type === 'password' && !/^.{8,}$/.test(input.value)) {
    return 'your password is too short';
  }

  if (input.name === 'confirm-password' && input.value !== passwordField.value) {
    return "passwords don't match";
  }
}

function displayError(input, errorMessage) {
  const errorEl = document.createElement('span');
  errorEl.textContent = errorMessage;
  errorEl.classList.add('error-msg');
  errorEl.dataset.name = 'error';

  input.insertAdjacentElement('afterend', errorEl);
}
