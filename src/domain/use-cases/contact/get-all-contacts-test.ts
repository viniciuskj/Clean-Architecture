import { Contact } from "../../entities/contact";
import { ContactRepository } from "../../interfaces/repositories/contact-repository";
import { GetAllContacts } from "./get-all-contacts";



describe("Get all contacts  Use Case", () => {
    
    class MockContactRepository implements ContactRepository {
        createContact(contact: Contact): Promise<boolean> {
            throw new Error("Method not implmented");
        }

        getContacts(): Promise<Contact[]> {
            throw new Error("Method not implemented");
        }
    }

    let mockContactRepository: ContactRepository;

    beforeEach(() => {
        jest.clearAllMocks();
        mockContactRepository = new MockContactRepository();
    })

    test("shoud return data", async () =>{
        const ExpectedResult = [{id: "1", surname: "Smith", firstName: "John", email: "john@gmail.com"}];

    jest.spyOn(mockContactRepository, "getContacts").mockImplementation(() => Promise.resolve(ExpectedResult));
    const getAllContactUse = new GetAllContacts(mockContactRepository);
    const result = await getAllContactUse.execute();
    expect(result).toStrictEqual(ExpectedResult);
    })
})