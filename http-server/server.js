import express from "express";

const app = express();
app.use(express.json());

let id = 0;
let data = [];

app.get("/", (req, res) => {
    res.status(200).send("Hello World");
});

app.post("/create/todo", (req, res) => {
    id++;

    const { title, description } = req.body;

    const obj = {
        id: id,
        title: title,
        description: description
    };

    data.push(obj);

    res.status(201).json(obj);
});

app.get("/todos", (req, res) => {
    res.json(data);
});

app.get("/todo", (req, res) => {
    const ids = parseInt(req.query.id);

    const todo = data.find(t => t.id === ids);

    if (!todo) {
        return res.status(404).json({
            error: "Todo not found"
        });
    }

    res.json(todo);
});

app.delete("/todo", (req, res) => {
    const ids = parseInt(req.query.id);

    const index = data.findIndex(t => t.id === ids);

    if (index === -1) {
        return res.status(404).json({
            error: "Todo not found"
        });
    }

    data.splice(index, 1);

    res.json({
        message: "Todo deleted"
    });
});

app.listen(3000, () => {
    console.log("Server running on port 3000");
});
