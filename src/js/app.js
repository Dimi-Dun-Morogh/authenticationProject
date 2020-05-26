import 'bootstrap/dist/css/bootstrap.css';
import '../css/style.css';
import UI from './config/ui.config';
import { validate } from './helpers/validate';
import { showInputError } from './view/form';
import { removeInputError } from './view/form';
import { login } from './services/auth.service';
import { notify} from './view/notifications';
const { form, inputEmail, inputPassword } = UI;
const inputs = [inputEmail, inputPassword];
// Events

form.addEventListener('submit', (e) => {
  e.preventDefault();
  onSubmit();
});

inputs.forEach((el) =>
  el.addEventListener('focus', () => removeInputError(el)),
);

//Handlers
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
    await login(inputEmail.value, inputPassword.value);
    //show sucess notify
    notify({ msg: 'Login success', className: 'alert-success' });
    form.reset();
  } catch (err) {
    //show error notify
    notify({ msg: 'Login failed', className: 'alert-danger' });
  }
  console.log(isValidForm);
}

/*
login: denis.m.pcspace@gmail.com
pw: dmgame12345
*/
