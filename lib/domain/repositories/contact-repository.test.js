"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const contact_repository_1 = require("../../../src/domain/repositories/contact-repository");
class MockContactDataSource {
    create(contact) {
        throw new Error("Method not implemented.");
    }
    getAll() {
        throw new Error("Method not implemented.");
    }
}
describe("Contact Repository", () => {
    let mockContactDataSource;
    let contactRepository;
    beforeEach(() => {
        jest.clearAllMocks();
        mockContactDataSource = new MockContactDataSource();
        contactRepository = new contact_repository_1.ContactRepositoryImpl(mockContactDataSource);
    });
    describe("getAllContacts", () => {
        test("should return data", async () => {
            const expectedData = [{ id: "1", surname: "Smith", firstName: "John", email: "john@gmail.com" }];
            jest.spyOn(mockContactDataSource, "getAll").mockImplementation(() => Promise.resolve(expectedData));
            const result = await contactRepository.getContacts();
            expect(result).toBe(expectedData);
        });
    });
    describe("createContact", () => {
        test("should return true", async () => {
            const inputData = { id: "1", surname: "Smith", firstName: "John", email: "john@gmail.com" };
            jest.spyOn(mockContactDataSource, "create").mockImplementation(() => Promise.resolve(true));
            const result = await contactRepository.createContact(inputData);
            expect(result).toBe(true);
        });
    });
});
