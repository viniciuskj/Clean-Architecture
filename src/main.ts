import { MongoClient } from "mongodb"
import { DatabaseWrapper } from "./data/interfaces/data-sources/database-wrapper";
import ContactsRouter from "./presentation/routers/contact-router";
import { GetAllContacts } from "./domain/use-cases/contact/get-all-contacts";
import { ContactRepositoryImpl } from "./domain/repositories/contact-repository";
import { MongoDBContactDataSource } from "./data/data-sources/mongodb/mongodb-contact-data-source";
import { CreateContact } from "./domain/use-cases/contact/create-contact";
import server from "./server";


(async () => {
    const client: MongoClient = new MongoClient("mongodb://localhost:27017/contacts");
    await client.connect();

    const db = client.db("CONTACTS_DB");


    const contactDatabase: DatabaseWrapper = {
        find: (query) =>   db.collection("contacts").find(query).toArray(),
        insertOne: (doc) => db.collection("contacts").insertOne(doc)
    }

    const contactMiddleWare = ContactsRouter (
        new GetAllContacts(new ContactRepositoryImpl(new MongoDBContactDataSource(contactDatabase))),
        new CreateContact(new ContactRepositoryImpl(new MongoDBContactDataSource(contactDatabase)))
    )

    server.use("/contact", contactMiddleWare);
    server.listen(4000, () => console.log("Running on server"))
})()