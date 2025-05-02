"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongodb_1 = require("mongodb");
const contact_router_1 = __importDefault(require("./presentation/routers/contact-router"));
const get_all_contacts_1 = require("./domain/use-cases/contact/get-all-contacts");
const contact_repository_1 = require("./domain/repositories/contact-repository");
const mongodb_contact_data_source_1 = require("./data/data-sources/mongodb/mongodb-contact-data-source");
const create_contact_1 = require("./domain/use-cases/contact/create-contact");
const server_1 = __importDefault(require("./server"));
(async () => {
    const client = new mongodb_1.MongoClient("mongodb://localhost:27017/contacts");
    await client.connect();
    const db = client.db("CONTACTS_DB");
    const contactDatabase = {
        find: (query) => db.collection("contacts").find(query).toArray(),
        insertOne: (doc) => db.collection("contacts").insertOne(doc)
    };
    const contactMiddleWare = (0, contact_router_1.default)(new get_all_contacts_1.GetAllContacts(new contact_repository_1.ContactRepositoryImpl(new mongodb_contact_data_source_1.MongoDBContactDataSource(contactDatabase))), new create_contact_1.CreateContact(new contact_repository_1.ContactRepositoryImpl(new mongodb_contact_data_source_1.MongoDBContactDataSource(contactDatabase))));
    server_1.default.use("/contact", contactMiddleWare);
    server_1.default.listen(4000, () => console.log("Running on server"));
})();
