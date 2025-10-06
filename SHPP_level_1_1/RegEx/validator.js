const Validator = {
  validateEmail(email) {
    return (/^[a-zA-Z0-9][a-zA-Z0-9\-\.\+]{1,20}@[\w\.\!\$\%\&\'\*\+\/\=\?\^\_\-]{1,15}\.\w{1,5}$/).
    test(email
    );
  },
  validatePhone(phone) {
    if (phone.length > 25) return false;
    phone = phone.replaceAll(" ", "").replaceAll("-", '');
    
    return (/^(\+\d\d)?(\(\d{3}\)|\d{3})\d{7}$/).test(phone);
  },
  validatePassword(pass) {
    return (/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/).test(pass);
  },
};

export { Validator };