"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetAllContacts = void 0;
class GetAllContacts {
    constructor(contactReository) {
        this.contactRepository = contactReository;
    }
    async execute() {
        const result = await this.contactRepository.getContacts();
        return result;
    }
}
exports.GetAllContacts = GetAllContacts;
