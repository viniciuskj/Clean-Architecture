"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ContactsRouter;
const express_1 = __importDefault(require("express"));
function ContactsRouter(getAllContactsUseCase, createContactUseCase) {
    const router = express_1.default.Router();
    router.get('/', async (req, res) => {
        try {
            const contacts = await getAllContactsUseCase.execute();
            res.send(contacts);
        }
        catch (err) {
            res.status(500).send({ message: "Error fetching data" });
        }
    });
    router.post('/', async (req, res) => {
        try {
            await createContactUseCase.execute(req.body);
            res.statusCode = 201;
            res.json({ message: "Created" });
        }
        catch (err) {
            res.status(500).send({ message: "Error saving data" });
        }
    });
    return router;
}
