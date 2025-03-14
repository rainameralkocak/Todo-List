$(document).ready(function () {
    const apiUrl = "http://localhost:5000/todos";

    function fetchTodos() {
        $.get(apiUrl, function (data) {
            $("#todo-list").empty();
            data.forEach(todo => {
                $("#todo-list").append(`
                    <tr data-id="${todo.id}">
                        <td>${todo.task}</td>
                        <td>${todo.description}</td>
                        <td>
                            <button class="btn btn-warning btn-sm edit-btn">Düzenle</button>
                            <button class="btn btn-danger btn-sm delete-btn">Sil</button>
                        </td>
                    </tr>
                `);
            });
        });
    }

    fetchTodos(); // Sayfa açıldığında görevleri getir

    $("#todo-form").submit(function (e) {
        e.preventDefault();
        const task = $("#task-input").val().trim();
        const description = $("#desc-input").val().trim();

        if (task && description) {
            $.ajax({
                url: apiUrl,
                type: "POST",
                contentType: "application/json",
                data: JSON.stringify({ 
                    task, 
                    description,
                    completed: false 
                }),
                success: function () {
                    fetchTodos();  // Görevleri yenile
                    $("#task-input").val("");
                    $("#desc-input").val("");
                },
                error: function (xhr, status, error) {
                    console.error("Hata:", status, error);
                }
            });
        }
    });

    $("#todo-list").on("click", ".delete-btn", function () {
        const id = $(this).closest("tr").data("id");
        $.ajax({
            url: `${apiUrl}/${id}`,
            type: "DELETE",
            success: fetchTodos
        });
    });

    $("#todo-list").on("click", ".edit-btn", function () {
        const row = $(this).closest("tr");
        const id = row.data("id");
        const oldTask = row.find("td:nth-child(1)").text();
        const oldDesc = row.find("td:nth-child(2)").text();

        const newTask = prompt("Görev adını güncelle:", oldTask);
        const newDesc = prompt("Açıklamayı güncelle:", oldDesc);

        if (newTask !== null && newTask.trim() !== "" && newDesc !== null && newDesc.trim() !== "") {
            $.ajax({
                url: `${apiUrl}/${id}`,
                type: "PATCH",
                contentType: "application/json",
                data: JSON.stringify({ task: newTask, description: newDesc }),
                success: fetchTodos
            });
        }
    });
});
