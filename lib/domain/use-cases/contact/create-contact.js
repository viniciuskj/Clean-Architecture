"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateContact = void 0;
class CreateContact {
    constructor(contactRepository) {
        this.contactRepository = contactRepository;
    }
    async execute(contact) {
        const result = await this.contactRepository.createContact(contact);
        return result;
    }
}
exports.CreateContact = CreateContact;
