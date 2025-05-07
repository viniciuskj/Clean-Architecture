import { ContactDataSource } from "../../data/interfaces/data-sources/contact-data-source";
import { Contact } from "../entities/contact";
import { ContactRepository } from "../interfaces/repositories/contact-repository";


export class ContactRepositoryImpl implements ContactRepository {
    contactDataSource: ContactDataSource;

    constructor(contactDataSource: ContactDataSource) {
        this.contactDataSource = contactDataSource;
    }
    
    getContacts(): Promise<Contact[]> {
        const result = await this.contactDataSource.getAll()
        return result;
    }

    async createContact(contact: Contact): Promise<boolean> {
        const result = await this.contactDataSource.create(contact)
        return result;
    }
}
