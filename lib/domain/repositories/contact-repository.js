"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContactRepositoryImpl = void 0;
class ContactRepositoryImpl {
    constructor(contactDataSource) {
        this.contactDataSource = contactDataSource;
    }
    getContacts() {
        throw new Error("Method not implemented.");
    }
    async createContact(contact) {
        const result = await this.contactDataSource.create(contact);
        return result;
    }
}
exports.ContactRepositoryImpl = ContactRepositoryImpl;
