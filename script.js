// TODO List Functionality
        const todoForm = document.querySelector('.todo-form');
        const todoInput = document.querySelector('.todo-input');
        const todoList = document.querySelector('.todo-list');

        // Load saved todos from localStorage
        document.addEventListener('DOMContentLoaded', () => {
            const savedTodos = JSON.parse(localStorage.getItem('todos')) || [];
            savedTodos.forEach(todo => addTodoToDOM(todo));
        });

        todoForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const todoText = todoInput.value.trim();
            
            if (todoText) {
                addTodo(todoText);
                todoInput.value = '';
            }
        });

        function addTodo(todoText) {
            const todo = {
                id: Date.now(),
                text: todoText,
                completed: false
            };
            
            addTodoToDOM(todo);
            saveTodoToLocalStorage(todo);
        }

        function addTodoToDOM(todo) {
            const li = document.createElement('li');
            li.className = 'todo-item';
            li.dataset.id = todo.id;
            
            li.innerHTML = `
                <input type="checkbox" class="complete-btn" ${todo.completed ? 'checked' : ''}>
                <span class="task-text ${todo.completed ? 'completed' : ''}">${todo.text}</span>
                <button class="delete-btn">Delete</button>
            `;
            
            todoList.appendChild(li);
            
            // Add completion toggle functionality
            const completeBtn = li.querySelector('.complete-btn');
            const taskText = li.querySelector('.task-text');
            
            completeBtn.addEventListener('change', () => {
                todo.completed = completeBtn.checked;
                taskText.classList.toggle('completed', todo.completed);
                saveTodosToLocalStorage();
            });
            
            // Add delete functionality
            const deleteBtn = li.querySelector('.delete-btn');
            deleteBtn.addEventListener('click', () => {
                li.remove();
                removeTodoFromLocalStorage(todo.id);
            });
        }

        function saveTodosToLocalStorage() {
            const todos = [];
            document.querySelectorAll('.todo-item').forEach(item => {
                todos.push({
                    id: item.dataset.id,
                    text: item.querySelector('.task-text').textContent,
                    completed: item.querySelector('.complete-btn').checked
                });
            });
            localStorage.setItem('todos', JSON.stringify(todos));
        }

        function saveTodoToLocalStorage(todo) {
            const todos = JSON.parse(localStorage.getItem('todos')) || [];
            todos.push(todo);
            localStorage.setItem('todos', JSON.stringify(todos));
        }

        function removeTodoFromLocalStorage(id) {
            let todos = JSON.parse(localStorage.getItem('todos')) || [];
            todos = todos.filter(todo => todo.id != id);
            localStorage.setItem('todos', JSON.stringify(todos));
        }

        // Contact Form Functionality
        const contactForm = document.getElementById('contact-form');
        const feedback = document.getElementById('form-feedback');

        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const message = document.getElementById('message').value.trim();
            
            // Simple validation
            if (!name || !email || !message) {
                showFeedback('All fields are required', 'error');
                return;
            }
            
            if (!validateEmail(email)) {
                showFeedback('Please enter a valid email address', 'error');
                return;
            }
            
            // In a real app, you would send the form data to a server here
            showFeedback('Your message has been sent successfully!', 'success');
            contactForm.reset();
            
            // For demonstration, we'll just log the values
            console.log({ name, email, message });
        });

        function validateEmail(email) {
            const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return re.test(email);
        }

        function showFeedback(message, type) {
            feedback.textContent = message;
            feedback.className = `feedback ${type}`;
            feedback.style.display = 'block';
            
            // Hide after 5 seconds
            setTimeout(() => {
                feedback.style.display = 'none';
            }, 5000);
        }

        