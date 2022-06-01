"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT;
app.use(express_1.default.json());
app.use((0, cors_1.default)({
    origin: "http://localhost:8081",
}));
app.use(body_parser_1.default.urlencoded({ extended: true }));
let notes = [
    {
        id: 1,
        title: "delectus aut autem",
        content: "Lorem ipsum",
        status: "New",
    },
    {
        id: 2,
        title: "quis ut nam facilis et officia qui",
        content: "Lorem ipsum",
        status: "Completed",
    },
    {
        id: 3,
        title: "fugiat veniam minus",
        content: "Lorem ipsum",
        status: "Not completed",
    },
];
app.get("/notes", (req, res) => {
    res.status(200).json(notes);
});
app.post("/addNote", (req, res) => {
    const nextId = notes.length > 0
        ? notes.sort((a, b) => a.id - b.id)[notes.length - 1].id + 1
        : 1;
    const newNote = {
        id: nextId,
        title: req.body.title,
        content: req.body.content,
        status: "New",
    };
    notes.push(newNote);
    res.status(200).send();
});
app.post("/deleteNotes", (req, res) => {
    const idsToDelete = req.body.notes;
    notes = notes.filter((x) => idsToDelete.indexOf(x.id) === -1);
    res.sendStatus(200);
});
app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
});
