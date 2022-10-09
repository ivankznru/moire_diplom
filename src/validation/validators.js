import textErrors from '@/validation/textErrors';

export default {
  required: (val) => !val && textErrors.required,
  payment: (val) => !val && textErrors.payment,
  deliveries: (val) => !val && textErrors.deliveries,
  // проверка на tel, если нет то возвращаем текст ошибки
  // Оставим только цифры для проверки на длину номера телефона
  tel: (val) => Number(val?.replace(/[^/\d]/g, '').length) !== 11 && textErrors.tel,
  // Проверка на наличие символов
  email: (val) => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3})|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return !re.test(val) && val && textErrors.email;
  },
  // проверка на количество символов в строке "Комментарий"
  comments: (val) => String(val).length <= 15 && val && textErrors.comments,
  // проверка на количество слов для ФИО
  name: (val) => {
    let check = false;
    const arr = val?.split(' ');
    if (arr?.length >= 3 && arr[2] !== '') {
      check = true;
    }
    return !check && val && textErrors.name;
  },
};
