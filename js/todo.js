const host = "http://127.0.0.1:7000";
const todosContainer = document.querySelector('.todos-container');

function getTodos() {
    axios.get(`${host}/todo`)
        .then(response => {
            console.log(response.data);
            renderTodos(response.data.todos);
        })
        .catch(error => {
            console.error('Error fetching todos:', error);
            // 임의의 값을 표시
            renderMockTodos();
        });
}

function renderMockTodos() {
    todosContainer.innerHTML = ''; // todosContainer 초기화
    const mockTodos = [
        { nickname: 'Example Nickname 1', item: 'Example Comment 1', timestamp: new Date() },
        { nickname: 'Example Nickname 2', item: 'Example Comment 2', timestamp: new Date() },
        { nickname: 'Example Nickname 3', item: 'Example Comment 3', timestamp: new Date() },
    ];
    renderTodos(mockTodos);
}

function renderTodos(todos) {
    todosContainer.innerHTML = ''; // todosContainer 초기화
    todos.forEach(todo => {
        const todoDiv = document.createElement('div');
        todoDiv.classList.add('todo-item');

        const nicknameDiv = document.createElement('div');
        nicknameDiv.classList.add('nickname');
        nicknameDiv.textContent = todo.nickname;

        const itemDiv = document.createElement('div');
        itemDiv.classList.add('item');
        itemDiv.textContent = todo.item;

        const timestampDiv = document.createElement('div');
        timestampDiv.classList.add('timestamp');
        const date = new Date(todo.timestamp);
        timestampDiv.textContent = date.toLocaleString();

        todoDiv.appendChild(nicknameDiv);
        todoDiv.appendChild(itemDiv);
        todoDiv.appendChild(timestampDiv);

        //삭제 버튼 생성 및 이벤트 처리
        const deleteBtn = document.createElement('button');
        deleteBtn.classList.add('delete-btn');
        deleteBtn.textContent = 'x';

        deleteBtn.addEventListener('click', function () {
            deleteTodo(todo.id);
        });
        // todoDiv에 삭제버튼 추가
        todoDiv.appendChild(deleteBtn);
        todosContainer.appendChild(todoDiv);
    });
}

window.addEventListener('DOMContentLoaded', function () {
    getTodos();
});

const nicknameInput = document.getElementById('nickname');
const commentInput = document.getElementById('comment');
const submitBtn = document.getElementById('submit-btn');

submitBtn.addEventListener('click', function () {
    addTodo();
});

function addTodo() {
    const nickname = nicknameInput.value.trim();
    const comment = commentInput.value.trim();
    let todoData = {
        id: 0,
        nickname: nickname,
        item: comment,
        timestamp: new Date().toISOString()
    };

    if (nickname === '' || comment === '') {
        alert("Please enter both nickname and comment!");
        return;
    }

    axios.post(`${host}/todo`, todoData)
        .then(response => {
            nicknameInput.value = '';
            commentInput.value = '';
            getTodos();
        })
        .catch(error => {
            console.error('Error adding todo:', error);
        });
}

function deleteTodo(todoId) {
    axios.delete(`${host}/todo/${todoId}`)
        .then(function (response) {
            console.log('Todo deleted:', response.data);
            getTodos();
        })
        .catch(function (error) {
            console.error('Error deleting todo:', error);
        });
}


/*다른요소들*/

// JavaScript를 사용하여 스크롤 이벤트를 감지하고 텍스트의 투명도를 조절합니다.
window.addEventListener('scroll', function () {
    var scrollTop = window.scrollY; // 스크롤 위치를 가져옵니다.
    var overlay = document.querySelector('.overlay');

    // 투명도를 조절합니다. 스크롤이 더 많이 될수록 투명해집니다.
    overlay.style.opacity = 1 - (scrollTop / 10); // 스크롤 값에 따라 조절 가능합니다.
});


document.addEventListener('DOMContentLoaded', function () {
    // Modal functionality
    var modal = document.getElementById("modal");
    var btn = document.getElementById("learnMoreBtn");
    var span = document.getElementsByClassName("close")[0];

    btn.onclick = function () {
        modal.style.display = "block";
    }

    span.onclick = function () {
        modal.style.display = "none";
    }

    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }

    // Scroll animation
    var elements = document.querySelectorAll('.project-card');
    var windowHeight = window.innerHeight;

    function checkPosition() {
        for (var i = 0; i < elements.length; i++) {
            var element = elements[i];
            var positionFromTop = elements[i].getBoundingClientRect().top;

            if (positionFromTop - windowHeight <= 0) {
                element.classList.add('fade-in');
            }
        }
    }

    window.addEventListener('scroll', checkPosition);
    checkPosition(); // Initial check
});

// 상단 이동 버튼 기능
let mybutton = document.getElementById("topBtn");

// 스크롤할 때 버튼 표시
window.onscroll = function () {
    scrollFunction();
};

function scrollFunction() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        mybutton.style.display = "block";
    } else {
        mybutton.style.display = "none";
    }
}

// 상단으로 이동
function topFunction() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}

