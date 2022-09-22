import textErrors from '@/validation/textErrors';

export default {
  required: (val) => !val && textErrors.required,
  // проверка на tel, если нет то возвращаем текст ошибки
  tel: (val) => Number(val.length) !== 11 && textErrors.tel,
  // Оставим только цифры для проверки на длину номера телефона
  replaceNumber(number) {
    return number.replace(/[^/\d]/g, '');
  },
  email: (val) => val && textErrors.email,
  validEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})|(([a-zA-Z\-\d]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  },
  // проверка на количество символов в строке "Комментарий"
  comments: (val) => String(val).length >= 15 && textErrors.comments,
  // проверка на количество слов для ФИО
  name: (val) => val.length >= 3 && textErrors.name,
  splitString(stringToSplit, separator) {
    const arr = stringToSplit.split(separator);
    if (arr.length === 3 && arr[2] !== '') {
      return arr;
    }
    return false;
  },
};
