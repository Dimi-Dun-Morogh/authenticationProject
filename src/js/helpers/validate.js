const regExpDic = {
  email: /^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{1,5}|[0-9]{1,3})(\]?)$/,
  password: /^[0-9a-zA-Z]{4,}$/,
  firstname:  /^[a-zA-Z]{2,}$/,
  lastname: /^[a-zA-Z]{2,}$/,
  phone: /^[0-9]{8,}/,
  city:/^[a-zA-Z]{1,}/,
  country:/^[a-zA-Z]{1,}/,
  Nickname:/^[a-zA-Z]{2,}$/


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
export function validateBirthDate(el){
  let arr = el.value.split('-');
  if(arr.length!=3) return false;
  return true

}
