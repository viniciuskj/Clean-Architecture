import supertest from "supertest";
import { Contact } from "../../domain/entities/contact";
import { CreateContactUseCase } from "../../domain/interfaces/use-cases/contact/create-contact";
import { GetAllContactsUseCase } from "../../domain/interfaces/use-cases/contact/get-all-contacts";
import server from "../../server";
import ContactsRouter from "./contact-router";

class MockGetAllContactsUseCase implements GetAllContactsUseCase{
    execute(): Promise<Contact[]> {
        throw new Error('Method not implemented');
    }
}

class MockCreateContactUseCase implements CreateContactUseCase {
    execute(contact: Contact): Promise<boolean> {
        throw new Error("Method not implemented");
    }
}

describe("Contact Router", ()=> {
    let mockCreateContactUseCase: MockCreateContactUseCase;
    let mockGetAllContactsUseCase: MockGetAllContactsUseCase;

    beforeAll(() => {
        mockCreateContactUseCase = new MockCreateContactUseCase();
        mockGetAllContactsUseCase = new MockGetAllContactsUseCase();
        server.use('/contact', ContactsRouter(mockGetAllContactsUseCase, mockCreateContactUseCase));
    })

    beforeEach(() => {
        jest.clearAllMocks();
    })

    describe('GET /contact', () => {

        test("should return 200 with data", async () => {
            const ExpectedData = [{id: "1", surname: "Smith", firstName: "John", email: "john@gmail.com"}];
            jest.spyOn(mockGetAllContactsUseCase, "execute").mockImplementation(() => Promise.resolve(ExpectedData))
            const response = await supertest(server).get("/contact");
            expect(response.status).toBe(200);
            expect(mockGetAllContactsUseCase.execute).toHaveBeenCalledTimes(1)
            expect(response.body).toStrictEqual(ExpectedData);
        });

        test("GET /contact returns 500 on use case error", async () => {
            jest.spyOn(mockGetAllContactsUseCase, "execute").mockImplementation(() => Promise.reject(Error()));
            const response = await supertest(server).get("/contact");
            expect(response.status).toBe(500);
            expect(response.body).toStrictEqual({ message: "Error fetching data" });
        });
    })

    describe("POST /contact", () => {

        test("POST /contact", async () => {
            const InputData = { id: "1", surname: "Smith", firstName: "John", email: "john@gmail.com" };
            jest.spyOn(mockCreateContactUseCase, "execute").mockImplementation(() => Promise.resolve(true));
            const response = await supertest(server).post("/contact").send(InputData);
            expect(response.status).toBe(201);
        });

        test("POST /contact returns 500 on use case error", async () => {
            const InputData = { id: "1", surname: "Smith", firstName: "John", email: "john@gmail.com" };
            jest.spyOn(mockCreateContactUseCase, "execute").mockImplementation(() => Promise.reject(Error()));
            const response = await supertest(server).post("/contact").send(InputData);
            expect(response.status).toBe(500);
        });
    })

})
