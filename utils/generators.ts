import { faker } from '@faker-js/faker';

export function generateRandomString(length: number): string {
    return faker.string.alpha(length);
}

export function generateRandomDigits(length: number): string {
    return faker.string.numeric(length);
}

export function generatePassword() {
    let password = generateRandomString(12).toLowerCase(); 
    const upperCaseLetter = faker.string.alpha(1).toUpperCase();
    const randomDigit = generateRandomDigits(1);  

    password += upperCaseLetter;
    password += randomDigit;

    return password;
}
