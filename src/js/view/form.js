/**
 *
 * @param {String} msg
 */
function inputErrorTemplate(msg) {
  return `
  <div class="invalid-feedback">${msg}</div>
`;
}

/**
 * Function showInputError
 * @param {HTMLInput} el
 */

export function showInputError(el) {
  const parent = el.parentElement;
  const msg = el.dataset.invalidMessage || 'Invalid Input';
  const template = inputErrorTemplate(msg);
  el.classList.add('is-invalid');
  parent.insertAdjacentHTML('beforeend', template);
}

export function removeInputError(el) {
  const parent = el.parentElement;
  const err = parent.querySelector('.invalid-feedback');
  if (!err) return;

  el.classList.remove('is-invalid');
  parent.removeChild(err);
}

export function gatherRegData(
  emailInput,
  pw,
  nick,
  fName,
  lName,
  phoneInput,
  sex,
  cityInput,
  countryInput,
  day,
  month,
  year,
) {
  return {
    email: emailInput.value,
    password: pw.value,
    nickname: nick.value,
    first_name: fName.value,
    last_name: lName.value,
    phone: phoneInput.value,
    gender_orientation: sex.value,
    city: cityInput.value.split(' ').join(''),
    country: countryInput.value.split(' ').join(''),
    date_of_birth_day: day,
    date_of_birth_month: month,
    date_of_birth_year: year,
  };
}
