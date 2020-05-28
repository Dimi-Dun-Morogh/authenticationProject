import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap';
import '../css/style.css';
import 'jquery-ui-bundle/jquery-ui.css';
import UI from './config/ui.config';
import { validate, validateBirthDate } from './helpers/validate';
import { showInputError } from './view/form';
import { removeInputError, gatherRegData } from './view/form';
import { login, SignUp } from './services/auth.service';
import { notify } from './view/notifications';
import { getNews } from './services/news.service';
import { getCountries, getCities } from './services/locations.service';

import 'jquery-ui-bundle';

$(function () {
  $('#datepicker').datepicker();
});

const {
  form,
  signForm,
  inputEmail,
  inputPassword,
  correctCredBtn,
  SignUpBtn,
  inputCountry,
  inputCity,
  SexSelect,
  inputPhone,
  inputLastName,
  inputFirsName,
  inputNickName,
  inputBirthDate,
  inputEmailReg,
  inputPasswordReg,
} = UI;
const inputs = [inputEmail, inputPassword];
let ArrayCountries = [];

async function CountriesArray() {
  let countries = await getCountries();
 // console.log(Object.values(countries));
  let data = Object.values(countries);
  $(inputCountry).autocomplete({
    source: data,
  });
  ArrayCountries = data;
}
CountriesArray();

// Events
$(inputCountry).on('autocompleteselect', function () {
  inputCity.removeAttribute('disabled');
});

inputCity.addEventListener('focus', (e) => {
  const isThereACountry = inputCountry.value;
  if (isThereACountry) {
    getCityArray(ArrayCountries, isThereACountry);
  }
});

form.addEventListener('submit', (e) => {
  e.preventDefault();
  onSubmit();
});

inputs.forEach((el) =>
  el.addEventListener('focus', () => removeInputError(el)),
);

SignUpBtn.addEventListener('click', (e) => {
  onSignUp();
});

correctCredBtn.addEventListener('click', (e) => {
  e.preventDefault();
  correctCredentials();
});

//Handlers

async function getCityArray(arr, input) {
  let cities = await getCities(arr, input);
  let cityArray = Object.values(cities);
  $(inputCity).autocomplete({
    source: cityArray,
  });
}

function correctCredentials() {
  inputEmail.value = 'denis.m.pcspace@gmail.com';
  inputPassword.value = 'dmgame12345';
}

async function onSignUp() {
  const inputs = [
    inputPhone,
    inputLastName,
    inputFirsName,
    inputNickName,
    inputEmailReg,
    inputPasswordReg,
    inputBirthDate,
  ];
  const isValidForm = inputs.every((el) => {
    const isValidInput = validate(el);

    if (!isValidInput) {
      showInputError(el);
    }
    return isValidInput;
  });
  const isValidBirthDate = validateBirthDate(inputBirthDate);
  if (!isValidBirthDate) {
    showInputError(inputBirthDate);
    inputBirthDate.addEventListener('focus', () =>
      removeInputError(inputBirthDate),
    );
  }
  if (!isValidForm) {
    inputs.forEach((el) =>
      el.addEventListener('focus', () => removeInputError(el)),
    );
  }

  if (isValidForm && isValidBirthDate) {
    let [day, month, year] = inputBirthDate.value.split('-');
    let signCreds = gatherRegData(
      inputEmailReg,
      inputPasswordReg,
      inputNickName,
      inputFirsName,
      inputLastName,
      inputPhone,
      SexSelect,
      inputCity,
      inputCountry,
      day,
      month,
      year,
    );
    try {
      let data = await SignUp(signCreds);
      // console.log(data)
      if (data.error) {
        notify({
          msg: `Registration failed: ${data.message}`,
          className: 'alert-danger',
          timeout: 7000,
          clas: 'list-group-item-danger',
        });
        return;
      }
      notify({
        msg: `Registration success ${data.message}`,
        className: 'alert-success',
        timeout: 7000,
        clas: 'list-group-item-success',
      });
      signForm.reset();
    } catch (error) {
      console.log(error);
      notify({
        msg: `Registration failed ${error} ${error.response.data.message}`,
        className: 'alert-danger',
        timeout: 7000,
        clas: 'list-group-item-danger',
      });
    }
  }

  // console.log(isValidForm)
}

async function onSubmit() {
  const isValidForm = inputs.every((el) => {
    const isValidInput = validate(el);
    if (!isValidInput) {
      showInputError(el);
    }
    return isValidInput;
  });
  if (!isValidForm) return;
  try {
   let data = await login(inputEmail.value, inputPassword.value);
    await getNews();
    console.log(data)
    //show sucess notify
    notify({
      msg: `Login success,  user id: ${data.id} `,
      className: 'alert-success',
      clas: 'list-group-item-success',
    });
    form.reset();
  } catch (err) {
    //show error notify
console.log(err.response.data.message)
    notify({
      msg: `Login failed ${err} ${err.response.data.message} `,
      className: 'alert-danger',
      clas: 'list-group-item-danger',
    });
  }
  //console.log(isValidForm);
}
