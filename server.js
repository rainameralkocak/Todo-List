const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const fs = require("fs");

const app = express();
const PORT = 3000;

// JSON dosyasının yolu
const dbPath = path.join(__dirname, "db.json");

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());  

// View Engine
app.set("view engine", "ejs");

// JSON dosyasını okuma fonksiyonu
function readTodos() {
    const data = fs.readFileSync(dbPath, "utf8");
    return JSON.parse(data).todos.sort((a, b) => new Date(a.deadline) - new Date(b.deadline));
}

// JSON dosyasına yazma fonksiyonu
function writeTodos(todos) {
    const data = JSON.stringify({ todos: todos }, null, 2);
    fs.writeFileSync(dbPath, data, "utf8");
}

// Ana Sayfa (Tüm görevleri listeliyoruz)
app.get("/", (req, res) => {
    const todos = readTodos(); 
    res.render("index", { todos: todos });
});

// Görev Ekleme (POST)
app.post("/todos", (req, res) => {
    const { task, description, deadline } = req.body;

    if (!task || !description || !deadline) {
        return res.status(400).json({ message: "Görev adı, açıklama ve deadline gereklidir." });
    }

    const todos = readTodos();
    const newTodo = {
        id: todos.length + 1,
        task,
        description,
        deadline,
        completed: false
    };

    todos.push(newTodo);
    writeTodos(todos);

    res.redirect("/");
});

// Görev Silme (POST)
app.post("/todos/:id/delete", (req, res) => {
    const todoId = parseInt(req.params.id);
    let todos = readTodos().filter(todo => todo.id !== todoId);

    writeTodos(todos);
    res.redirect("/");
});

// Görev Düzenleme (GET)
app.get("/todos/:id/edit", (req, res) => {
    const todoId = parseInt(req.params.id);
    const todos = readTodos();
    const todo = todos.find(todo => todo.id === todoId);

    if (!todo) {
        return res.status(404).send("Görev bulunamadı");
    }

    res.render("edit", { todo: todo });
});

// Görev Güncelleme (POST)
app.post("/todos/:id/edit", (req, res) => {
    const todoId = parseInt(req.params.id);
    const { task, description, deadline, completed } = req.body;

    const todos = readTodos();
    const todoIndex = todos.findIndex(todo => todo.id === todoId);

    if (todoIndex === -1) {
        return res.status(404).send("Görev bulunamadı");
    }

    todos[todoIndex] = {
        id: todoId,
        task,
        description,
        deadline,
        completed: completed === 'on'
    };

    writeTodos(todos);
    res.redirect("/");
});

// Sunucuyu başlat
app.listen(PORT, () => {
    console.log(`Sunucu çalışıyor: http://localhost:${PORT}`);
});
