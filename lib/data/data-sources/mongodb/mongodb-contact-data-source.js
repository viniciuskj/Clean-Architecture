"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MongoDBContactDataSource = void 0;
class MongoDBContactDataSource {
    constructor(database) {
        this.database = database;
    }
    async create(contact) {
        const result = await this.database.insertOne(contact);
        return result != null;
    }
    async getAll() {
        const result = await this.database.find({});
        return result.map(item => ({
            id: item._id.toString(),
            surname: item.surname,
            firstName: item.firstName,
            email: item.email
        }));
    }
}
exports.MongoDBContactDataSource = MongoDBContactDataSource;
