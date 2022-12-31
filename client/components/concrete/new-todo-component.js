

class NewTodoComponent {
  htmlElement;

  constructor({ onSubmit }){
    this.htmlElement = document.createElement('form');
    this.htmlElement.innerHTML = `

    <input type="text" name="title" placeholder="New task" class="my-3 js-new-todo">
    
    <input type="checkbox" class="form-check-input js-done-checkbox" id="todo-done" name="done">
    <label class="form-check-label" for="todo-done">Done or not</label>
    <button type="submit" class="btn btn-primary mx-4">ADD</button>

    `;

    this.htmlElement.addEventListener('submit', async (e) => {
      e.preventDefault();

      const formData = new FormData(e.target);
      const title = formData.get('title');
      const done = formData.get('done') === 'on';

      onSubmit({ title, done });
    })
  }
}

export default NewTodoComponent;