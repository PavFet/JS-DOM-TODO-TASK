import API from './api.js';
import TodosTableComponent from './components/concrete/todos-table.component.js';
import ContainerComponent from './components/wrapper/container-component.js';
import HeaderComponent from './components/concrete/header-component.js';
import NewTodoComponent from './components/concrete/new-todo-component.js';
import DoneAndUpdateComponent from './components/concrete/done-and-update-component.js';



const rootHtmlElement = document.querySelector('#root');

let todosTableComponent;
let doneAndUpdateComponent;

const onDeleteTodo = async ({ id }) => {
  await API.deleteTodo(id);
  const todos =  await API.getTodos();
  todosTableComponent.renderTodos(todos);
}

const onCreateTodo =  async ({ title, done }) => {
  await API.createTodo({ title, done });
  const todos =  await API.getTodos();
  todosTableComponent.renderTodos(todos);
}


const onUpdateTodo = async ({ id, props }) => {
  await API.updateTodo({ id, props });
  const todos =  await API.getTodos();
  todosTableComponent.renderTodos(todos);
}

API.getTodos()
  .then((todos) => {
    todosTableComponent = new TodosTableComponent({ todos, onDeleteTodo, onUpdateTodo });
    const newTodoComponent = new NewTodoComponent({
      onSubmit: onCreateTodo
    });

    doneAndUpdateComponent = new DoneAndUpdateComponent();
    const headerComponent = new HeaderComponent({
      text: 'ToDo tasks',
      className: 'm-4'
    });
    const containerComponent = new ContainerComponent([
      headerComponent.htmlElement,
      newTodoComponent.htmlElement,
      doneAndUpdateComponent.htmlElement,
      todosTableComponent.htmlElement,
    ]);

    rootHtmlElement.append(containerComponent.htmlElement);
});


