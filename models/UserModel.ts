import { faker } from '@faker-js/faker';

export class UserModel {
    constructor(
        public name: string,
        public lastName: string,
        public email: string,
        public password: string,
        public repeatPassword: string
    ) {}

    static createNewUser() {
        return new UserModel(
            faker.person.firstName(),
            faker.person.lastName(),
            'AT_' + faker.internet.email(),
            faker.internet.password(),
            faker.internet.password()
        );
    }
}