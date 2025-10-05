const Validator = {

    //TODO - валідація email

    validateEmail (email) {
        return email.match(
            /\w+@\w+\.\w+/g);
    },

    //TODO - валідація телефону

    validatePhone(phone){

    },
    //TODO - валідація паролю

    validatePassword(pass){
        
    }

}

export {Validator}