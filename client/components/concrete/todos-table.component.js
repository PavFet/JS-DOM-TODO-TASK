

class TodosTableComponent {
  htmlElement;
  tbodyHtmlElement;
  onDeleteTodo;
  onUpdateTodo;
  
  constructor({
    todos,
    onDeleteTodo,
    onUpdateTodo
  }) {
    this.htmlElement = document.createElement('table');
    this.htmlElement.className = 'todo-table table table-striped shadow-sm';
    this.htmlElement.innerHTML = `
    <tbody>
    </tbody>`;
    this.onDeleteTodo = onDeleteTodo;
    this.onUpdateTodo = onUpdateTodo;
    this.tbodyHtmlElement = this.htmlElement.querySelector('tbody');
    this.renderTodos(todos);
  }





  enableRowEditAction = ({
    id,
    initialState,
    tr,
    titleColumn,
    doneCheckbox
  }) => {
    let isBeingEdited = false;
    const doneLabel = tr.querySelector(`.js-done-col-label`)
   

    const cancelEditing = () => {
      tr.classList.remove('todo-table__row--editable');
      updateButton.innerHTML = 'EDIT';
      titleColumn.setAttribute('contenteditable', 'false');
      titleColumn.innerHTML = initialState.title;
      doneCheckbox.checked = initialState.done;
      doneLabel.textContent = initialState.done ? 'Yes' : 'No';
      isBeingEdited = false;
    }


    const enableEditing = () => {
      tr.classList.add('todo-table__row--editable');
      updateButton.innerHTML = 'CANCEL EDITING';
      titleColumn.setAttribute('contenteditable', 'true');
      doneCheckbox.checked = initialState.done;
      isBeingEdited = true;
    }



    document.addEventListener('click', (e) => {
      e.stopPropagation();
      if (!tr.contains(e.target)) cancelEditing();
    });


    doneCheckbox.addEventListener('change', () => {
      doneLabel.textContent = doneCheckbox.checked ? 'Yes' : 'No';
    })

    const updateButton = tr.querySelector(`.js-update-btn-${id}`);
    updateButton.addEventListener('click', () => {
      if (isBeingEdited) cancelEditing()
      else enableEditing();
    });

  }


  enableRowDeleteAction = ({
    id,
    title,
    tr
  }) => {
    const delButton = tr.querySelector(`.js-del-btn-${id}`);
    delButton.addEventListener('click', () => this.onDeleteTodo({
      id,
      title
    }));
  }

  enableRowUpdateAction = ({
    id,
    tr,
    titleColumn,
    doneCheckbox,
    initialState
  }) => {
    const updateButton = tr.querySelector(`.js-confirm-btn-${id}`);
    updateButton.addEventListener('click', () => {
      const props = {
        id, 
        title: titleColumn.textContent,
        done: doneCheckbox.checked,
      };
      if(initialState.title !== props.title || initialState.done !== props.done) {
        this.onUpdateTodo({ id, props })
      }
    }
      
  
    )}
    
  createRowHtmlElement = ({
    title,
    done,
    id
  }) => {
    const tr = document.createElement('tr');
    tr.classList = 'todo-table__row';
    tr.innerHTML = `
  <td class="d-none">${id}</td>
  <td class="js-done-col-${id}">
  <label class="js-done-col-label" for="${id}">${done ? 'Yes' : 'No'}</label>
  <input class="js-done-input-${id}" type="checkbox" id="${id}"/>
  </td>
  <td class="js-title-col">${title}</td> 
  <td class="d-flex justify-content-end gap-2 todo-table__last-cell">
  <button class="btn js-confirm-btn-${id} btn-success btn-sm">CONFIRM</button>
  <button class="btn js-update-btn-${id} btn-warning btn-sm">EDIT</button>
  <button class="btn js-del-btn-${id} btn-danger btn-sm">DELETE</button>
</td>`;

    const rowProps = {
      id,
      tr,
      initialState: {
        title,
        done
      },
      titleColumn:tr.querySelector('.js-title-col'),
      doneCheckbox:tr.querySelector(`.js-done-input-${id}`)
    };

    this.enableRowDeleteAction(rowProps);
    this.enableRowEditAction(rowProps);
    this.enableRowUpdateAction(rowProps);

    return tr;
  }

  renderTodos = (todos) => {
    this.tbodyHtmlElement.innerHTML = null;
    const rowsHtmlElements = todos.map(this.createRowHtmlElement);
    this.tbodyHtmlElement.append(...rowsHtmlElements);
  }
}

export default TodosTableComponent;