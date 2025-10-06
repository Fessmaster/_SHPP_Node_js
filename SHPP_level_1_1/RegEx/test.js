import { Validator } from "./validator.js";

console.log('--E-mail tests:');

console.log('true 1: '+Validator.validateEmail('fi@secondpart.end'));
console.log('true 2: '+Validator.validateEmail('first-part@.se=cond%p.art.end'));
console.log('true 3: '+Validator.validateEmail('first.part@se=cond%part.r'));
console.log('true 4: '+Validator.validateEmail('12first.part@se=cond%part.r'));

console.log();

console.log('false 1: '+Validator.validateEmail('f@secondart.end,'));
console.log('false 2: '+Validator.validateEmail('first-part@.se=cond@part.end'));
console.log('false 3: '+Validator.validateEmail('-firstpart@.se=cond%.enddeded'));
console.log('false 4: '+Validator.validateEmail('firs_tpart@.se.en'));
console.log('false 5: '+Validator.validateEmail('firstpart@.se.enddeded'));
console.log();

console.log('--Phone tests:');

console.log('true 1: '+Validator.validatePhone('+38 (099) 567 8901'));
console.log('true 2: '+Validator.validatePhone('+38 099 5 6 7 8 9  01'));
console.log('true 3: '+Validator.validatePhone('(09-9) 567-890-1'));
console.log('true 4: '+Validator.validatePhone('--  (099) 567 890-1'));

console.log();

console.log('false 1: '+Validator.validatePhone('+38 (099) 567 8901 0'));
console.log('false 2: '+Validator.validatePhone('+38 099 a0000000'));
console.log('false 3: '+Validator.validatePhone('+38 (0989) 567 8901'));
console.log('false 4: '+Validator.validatePhone('+48 (0989) 567 8901'));
console.log();

console.log('--Password tests:');
console.log('true 1: '+Validator.validatePassword('C00l_Pass'));
console.log('true 2: '+Validator.validatePassword('SupperPas1'));
console.log('true 3: '+Validator.validatePassword('123qazQAZ1234_'));
console.log('true 4: '+Validator.validatePassword('___123qazQAZ'));

console.log();

console.log('false 1: '+Validator.validatePassword('Cool_pass'));
console.log('false 2: '+Validator.validatePassword('C00l'));
console.log('false 3: '+Validator.validatePassword('zxcvbnmm'));
console.log('false 4: '+Validator.validatePassword('123.=zxcv'));