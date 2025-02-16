function delete_item(element) {
    element.parentElement.remove();
}


const new_item = document.querySelector(".add .form-control"); 

new_item.addEventListener("keydown", function(event) {
    var todo_list = document.querySelector(".list-group.todos");

    if (event.key === "Enter") {
        event.preventDefault();

        let input_value = new_item.value.trim();
        if (input_value === "") return; 

        todo_list.innerHTML += `
            <li class="list-group-item d-flex justify-content-between align-items-center">
                <span>${input_value}</span>
                <i class="far fa-trash-alt delete" onclick="delete_item(this)"></i>
            </li>
        `;
        new_item.value = "";
    }
});


const search_bar = document.querySelector(".search input");

search_bar.addEventListener("keyup", () => {
    var todos = document.querySelectorAll("li.list-group-item");
    const searchText = search_bar.value.toLowerCase().trim();

    todos.forEach(todo => {
        const text = todo.querySelector("span");
        if (text.textContent.toLowerCase().includes(searchText)) {
            todo.className = "list-group-item d-flex justify-content-between align-items-center";
        } else {
            todo.className = "list-group-item d-none";
        }
    });
});
