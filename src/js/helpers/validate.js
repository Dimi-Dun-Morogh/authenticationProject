const regExpDic = {
  email: /^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{1,5}|[0-9]{1,3})(\]?)$/,
  password: /^[0-9a-zA-Z]{4,}$/,
};
/**
 *  Function validate check input in RegExp provided  in regExpDic
 * @param {HTMLInputElement} el
 * @returns {Boolean} -return true if input valid or false if not
 */

export function validate(el) {
  const regExpName = el.dataset.required;
  if (!regExpDic[regExpName]) return true; //если в датасете нет имени для словаря

  return regExpDic[regExpName].test(el.value);
}
