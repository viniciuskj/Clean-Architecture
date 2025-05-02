"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongodb_contact_data_source_1 = require("../../../../src/data/data-sources/mongodb/mongodb-contact-data-source");
describe("MongoDB DataSource", () => {
    let mockDatabase;
    beforeAll(async () => {
        mockDatabase = {
            find: jest.fn(),
            insertOne: jest.fn()
        };
    });
    beforeEach(() => {
        jest.clearAllMocks();
    });
    test("getAll", async () => {
        const ds = new mongodb_contact_data_source_1.MongoDBContactDataSource(mockDatabase);
        jest.spyOn(mockDatabase, "find").mockImplementation(() => Promise.resolve([{ surname: "Smith", _id: "123", firstName: "John", email: "john@gmail.com" }]));
        const result = await ds.getAll();
        expect(mockDatabase.find).toHaveBeenCalledWith({});
        expect(result).toStrictEqual([{ surname: "Smith", id: "123", firstName: "John", email: "john@gmail.com" }]);
    });
    test("create", async () => {
        const ds = new mongodb_contact_data_source_1.MongoDBContactDataSource(mockDatabase);
        jest.spyOn(mockDatabase, "insertOne").mockImplementation(() => Promise.resolve({ insertedId: "123" }));
        const result = await ds.create({ surname: "Smith", email: "john@gmail.com", firstName: "John" });
        expect(mockDatabase.insertOne).toHaveBeenCalledWith({ surname: "Smith", email: "john@gmail.com", firstName: "John" });
        expect(result).toStrictEqual(true);
    });
});
