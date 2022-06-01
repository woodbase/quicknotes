import express, { Express, Request, response, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";

dotenv.config();

const app: Express = express();
const port = process.env.PORT;
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:8081",
  })
);

app.use(bodyParser.urlencoded({ extended: true }));

interface Note {
  id: number;
  title: string;
  content: string;
  status: string;
}

let notes: Note[] = [
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

app.get("/notes", (req: Request, res: Response) => {
  res.status(200).json(notes);
});

app.post("/addNote", (req: Request, res: Response) => {
  const nextId =
    notes.length > 0
      ? notes.sort((a, b) => a.id - b.id)[notes.length - 1].id + 1
      : 1;
  const newNote: Note = {
    id: nextId,
    title: req.body.title,
    content: req.body.content,
    status: "New",
  };
  notes.push(newNote);
  res.status(200).send();
});

app.post("/deleteNotes", (req: Request, res: Response) => {
  const idsToDelete: number[] = req.body.notes;

  notes = notes.filter((x) => idsToDelete.indexOf(x.id) === -1);
  res.sendStatus(200);
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
});
