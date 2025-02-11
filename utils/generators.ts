import { faker } from "@faker-js/faker";

const carBrands = [
    { id: 1, title: "Audi", models: [1, 2, 3, 4, 5] },
    { id: 2, title: "BMW", models: [6, 7, 8, 9, 10] },
    { id: 3, title: "Ford", models: [11, 12, 13, 14, 15] },
    { id: 4, title: "Porsche", models: [16, 17, 18] },
    { id: 5, title: "Fiat", models: [19, 20, 21, 22, 23] }
];

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

export function generateValidCar() {
    const selectedBrand = faker.helpers.arrayElement(carBrands);
    const selectedModel = faker.helpers.arrayElement(selectedBrand.models);
    return {
        carBrandId: selectedBrand.id,
        carModelId: selectedModel,
        mileage: faker.number.int({ min: 1000, max: 200000 })
    };
}
