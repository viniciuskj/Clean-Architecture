import express, { Router } from "express";
import { Request, Response } from "express"
import { GetAllContactsUseCase } from "../../domain/interfaces/use-cases/contact/get-all-contacts";
import { CreateContactUseCase } from "../../domain/interfaces/use-cases/contact/create-contact"

export default function ContactsRouter (
    getAllContactsUseCase: GetAllContactsUseCase,
    createContact: CreateContactUseCase
){
    const router =  express.Router();

    router.get('/', async(req: Request, res: Response) => {
        try {
            const contacts = await getAllContactsUseCase.execute()
            res.send(contacts);
        } catch (error) {
            res.status(500).send({message: 'Error fetching data'});
        }
    });

    router.post('/', async(req: Request, res: Response) => {
        try {
            const contacts = await createContact.execute(req.body);
            res.statusCode = 201;
        } catch (error) {
            res.status(500).send({message: 'Error saving data'});
        }
    });


    return router;
}