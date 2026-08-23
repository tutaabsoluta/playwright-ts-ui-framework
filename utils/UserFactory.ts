import { UUIDAdapter } from "../adapters/UUIDAdapter";
import { User } from "../types/User";



export class UserFactory {

    constructor(
        private readonly uuid: UUIDAdapter
    ) {

    }
    private generateUniqueEmail(): string {
        return `user${this.uuid.generate()}@mail.com`
    }

    private generatePassword(): string {
        return `Password123!`
    }

    generateUser(): User {
        const user: User = {
            name: "Sergio",
            email: this.generateUniqueEmail(),
            password: this.generatePassword(),
            title: "Mr",
            birth_date: "15",
            birth_month: "1",
            birth_year: "1994",
            firstname: "John",
            lastname: "Doe",
            company: "Company",
            address1: "New York",
            address2: "",
            country: "United States",
            zipcode: "10019",
            state: "New York",
            city: "New York",
            mobile_number: "7777777777",
        };

        return user;
    }

}
