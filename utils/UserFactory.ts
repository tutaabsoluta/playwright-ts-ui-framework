import { UUIDAdapter } from "../adapters/UUIDAdapter";



export class UserFactory {

    constructor(
        private readonly uuid: UUIDAdapter
    ) {

    }
    generateUniqueEmail(): string {
        return `user${this.uuid.generate()}@mail.com`
    }

    generatePassword(): string {
        return `Password123!`
    }
    
}
