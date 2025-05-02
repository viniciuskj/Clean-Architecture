import { Contact } from "../../entities/contact";
import { ContactRepository } from "../../interfaces/repositories/contact-repository";
import { GetAllContactsUseCase } from "../../interfaces/use-cases/contact/get-all-contacts";

export class GetAllContacts implements GetAllContactsUseCase {
    contactRepository: ContactRepository;

    constructor(contactReository: ContactRepository) {
        this.contactRepository = contactReository
    }

    async execute(): Promise<Contact[]> {
        const result = await this.contactRepository.getContacts();
        return result;
    }
}