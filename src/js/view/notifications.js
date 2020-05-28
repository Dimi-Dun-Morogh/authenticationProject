function getContainer() {
  return document.querySelector('.notify-container');
}

function getAlertIndex() {
  return document.querySelectorAll('.notify-container .alert').length;
}

function notifyContainerTemplate() {
  return `
<div class="notify-container" style="position: fixed; top: 10px; right: 10px; z-index:99;"> </div>
  `;
}

function createNotifyContainer() {
  const template = notifyContainerTemplate();
  document.body.insertAdjacentHTML('afterbegin', template);
}

function alertTemplate(msg, className, index) {
  return `
<div class="alert ${className}" data-index="${index}">
${msg}
</div>
  `;
}

/**
 * Function notify. Show notification message
 * @param {Object} settings
 * @param {string} settings.msg
 * @param {string} settings.className
 *  @param {Number} settings.timeout
 */
function postLog(msg,clas){
  const log = document.getElementById('log');
  const date = new Date();
  let hours = String(date.getHours()).length==1? "0"+date.getHours() : date.getHours();
  let minutes = String(date.getMinutes()).length==1? "0"+date.getMinutes() : date.getMinutes();;
  let seconds = String( date.getSeconds()).length==1? "0"+date.getSeconds() : date.getSeconds();
  log.classList.remove('hide')
  const message = `
  <li class="list-group-item ${clas }">${hours}:${minutes}:${seconds} -  ${msg}</li>
  `;
  log.insertAdjacentHTML('beforeend',message)
}
export function notify({
  msg = 'Info message',
  className = 'alert-info',
  timeout = 2000,
  clas=''
} = {}) {
  if (!getContainer()) {
    createNotifyContainer();
  }
  const index = getAlertIndex();
  const template = alertTemplate(msg, className, index);
  const container = getContainer();

  container.insertAdjacentHTML('beforeend', template);
  postLog(msg,clas)
  setTimeout(() => closeNotify(index), timeout);
}

export function closeNotify(index) {
  let alert;
  if (index === undefined) {
    alert = document.querySelector('.notify-container .alert');
  } else {
    alert = document.querySelector(
      `.notify-container .alert[data-index="${index}"]`,
    );
  }
  if (!alert) {
    console.warn('Alert not found');
    return;
  }
  const container = getContainer();
  container.removeChild(alert);
}
