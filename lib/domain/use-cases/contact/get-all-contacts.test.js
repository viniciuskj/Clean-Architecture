"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const get_all_contacts_1 = require("../../../../src/domain/use-cases/contact/get-all-contacts");
describe("Get All Contacts Use Case", () => {
    class MockContactRepository {
        createContact(contact) {
            throw new Error("Method not implemented.");
        }
        getContacts() {
            throw new Error("Method not implemented.");
        }
    }
    let mockContactRepository;
    beforeEach(() => {
        jest.clearAllMocks();
        mockContactRepository = new MockContactRepository();
    });
    test("should return data", async () => {
        const ExpectedResult = [{ id: "1", surname: "Smith", firstName: "John", email: "john@gmail.com" }];
        jest.spyOn(mockContactRepository, "getContacts").mockImplementation(() => Promise.resolve(ExpectedResult));
        const getAllContactsUse = new get_all_contacts_1.GetAllContacts(mockContactRepository);
        const result = await getAllContactsUse.execute();
        expect(result).toStrictEqual(ExpectedResult);
    });
});
