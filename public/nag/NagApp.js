import Component from '../Component.js';
import Header from '../common/Header.js';
import Loading from '../common/Loading.js';
import AddNag from './AddNag.js';
import NagList from './NagList.js';
import { getNags, addTodo, updateTodo, removeTodo } from '../services/todo-api.js';

class TodoApp extends Component {

    async onRender(dom) {
        const header = new Header({ title: 'My Nags' });
        dom.prepend(header.renderDOM());
        
        const main = dom.querySelector('main');
        const error = dom.querySelector('.error');

        const loading = new Loading({ loading: true });
        dom.appendChild(loading.renderDOM());

        const addTodoSection = new AddTodo({
            onAdd: async todo => {
                loading.update({ loading: true });
                // clear prior error
                error.textContent = '';

                try {
                    // part 1: do work on the server
                    const saved = await addTodo(todo);
                    
                    // part 2: integrate back into our list
                    const { nags } = this.state;
                    nags.push(saved);

                    // part 3: tell component to update
                    todoList.update({ nags });
                }
                catch (err) {
                    // display error
                    error.textContent = err;
                    // rethrow the error so form knows not to clear the input:
                    throw err;
                }
                finally {
                    loading.update({ loading: false });
                }
            }
        });
        main.appendChild(addTodoSection.renderDOM());

        const todoList = new TodoList({ 
            nags: [],
            onUpdate: async todo => {
                loading.update({ loading: true });
                // clear prior error
                error.textContent = '';

                try {
                    // part 1: do work on the server
                    const updated = await updateTodo(todo);
                    
                    // part 2: integrate back into our list
                    const { nags } = this.state;
                    // find the index of this type:
                    const index = nags.indexOf(todo);
                    // replace with updated object from server:
                    nags.splice(index, 1, updated);

                    // part 3: tell component to update
                    todoList.update({ nags });
                }
                catch (err) {
                    // display error
                    console.log(err);
                }
                finally {
                    loading.update({ loading: false });
                }
            },
            onRemove: async todo => {
                loading.update({ loading: true });
                // clear prior error
                error.textContent = '';

                try {
                    // part 1: do work on the server
                    await removeTodo(todo.id);
                    
                    // part 2: integrate back into our list
                    const { nags } = this.state;        
                    // find the index of this type:
                    const index = nags.indexOf(todo);
                    // remove from the list
                    nags.splice(index, 1);
    
                    // part 3: tell component to update
                    todoList.update({ nags });
                }
                catch (err) {
                    // display error
                    console.log(err);
                }
                finally {
                    loading.update({ loading: false });
                }
            }
        });
        main.appendChild(todoList.renderDOM());

        // initial todo load:
        try {
            const nags = await getNags();
            this.state.nags = nags;
            todoList.update({ nags });
        }
        catch (err) {
            // display error...
            console.log(err);
        }
        finally {
            loading.update({ loading: false });
        }

    }

    renderHTML() {
        return /*html*/`
            <div>
                <!-- header goes here -->
                <!-- show errors: -->
                <p class="error"></p>
                <main>
                    <!-- add todo goes here -->
                    <!-- todo list goes here -->
                </main>
            </div>
        `;
    }
}

export default TodoApp;
