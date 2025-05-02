"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const create_contact_1 = require("../../../../src/domain/use-cases/contact/create-contact");
describe("Create Contact Use Case", () => {
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
    test("should return true", async () => {
        const InputData = { id: "1", surname: "Smith", firstName: "John", email: "john@gmail.com" };
        jest.spyOn(mockContactRepository, "createContact").mockImplementation(() => Promise.resolve(true));
        const createContactUseCase = new create_contact_1.CreateContact(mockContactRepository);
        const result = await createContactUseCase.execute(InputData);
        expect(result).toBe(true);
    });
});
