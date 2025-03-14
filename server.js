const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const fs = require("fs");

const app = express();
const PORT = 3000;

// JSON dosyasından görevleri okuma ve yazma yardımcı fonksiyonu
const dbPath = path.join(__dirname, "db.json");

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());  // JSON veri işleme için

// View Engine
app.set("view engine", "ejs");

// JSON dosyasını okuma fonksiyonu
function readTodos() {
    const data = fs.readFileSync(dbPath, "utf8");
    return JSON.parse(data).todos;
}

// JSON dosyasına yazma fonksiyonu
function writeTodos(todos) {
    const data = JSON.stringify({ todos: todos }, null, 2);
    fs.writeFileSync(dbPath, data, "utf8");
}

// Ana Sayfa (Tüm görevleri listeliyoruz)
app.get("/", (req, res) => {
    const todos = readTodos(); // JSON dosyasındaki görevleri al
    res.render("index", { todos: todos });
});

// Görev Ekleme (POST)
app.post("/todos", (req, res) => {
    const { task, description } = req.body;

    if (!task || !description) {
        return res.status(400).json({ message: "Görev adı ve açıklama gereklidir" });
    }

    const todos = readTodos(); // JSON dosyasındaki görevleri al
    const newTodo = {
        id: todos.length + 1,
        task: task,
        description: description,
        completed: false
    };

    todos.push(newTodo); // Yeni görevi ekle
    writeTodos(todos);   // JSON dosyasına yaz

    res.redirect("/"); // Ana sayfayı yeniden yükle
});

// Görev Silme (POST)
app.post("/todos/:id/delete", (req, res) => {
    const todoId = parseInt(req.params.id);
    let todos = readTodos(); // JSON dosyasındaki görevleri al
    todos = todos.filter(todo => todo.id !== todoId); // Silinen görevi kaldır

    writeTodos(todos); // Güncel listeyi JSON dosyasına yaz
    res.redirect("/"); // Ana sayfayı yeniden yükle
});

// Görev Düzenleme (GET)
app.get("/todos/:id/edit", (req, res) => {
    const todoId = parseInt(req.params.id);
    const todos = readTodos(); // JSON dosyasındaki görevleri al
    const todo = todos.find(todo => todo.id === todoId);

    if (!todo) {
        return res.status(404).send("Görev bulunamadı");
    }

    res.render("edit", { todo: todo }); // Düzenleme formunu gönder
});

// Görev Düzenleme (POST)
app.post("/todos/:id/edit", (req, res) => {
    const todoId = parseInt(req.params.id);
    const { task, description, completed } = req.body;

    const todos = readTodos(); // JSON dosyasındaki görevleri al
    const todoIndex = todos.findIndex(todo => todo.id === todoId);

    if (todoIndex === -1) {
        return res.status(404).send("Görev bulunamadı");
    }

    // Görevi güncelle
    todos[todoIndex] = {
        id: todoId,
        task: task,
        description: description,
        completed: completed === 'on'
    };

    writeTodos(todos); // Güncel listeyi JSON dosyasına yaz
    res.redirect("/"); // Ana sayfayı yeniden yükle
});

// Sunucuyu başlat
app.listen(PORT, () => {
    console.log(`Sunucu çalışıyor: http://localhost:${PORT}`);
});
