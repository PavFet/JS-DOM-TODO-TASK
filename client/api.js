const SERVER_ADDRESS = 'http://localhost:5000';
const TODOS_COLLECTION_NAME = 'todos';


const formatError = (error) => {
  return error.message;
}


const requestSettings = {
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  },
}


const API = {
  async getTodos() {
    try {
      const response = await fetch(`${SERVER_ADDRESS}/${TODOS_COLLECTION_NAME}`, requestSettings);
      const todos = await response.json();

      return todos;
    } catch (error) {
      throw formatError(error);
    }
  },
  async createTodo(todoData) {
    try {
      const response = await fetch(`${SERVER_ADDRESS}/${TODOS_COLLECTION_NAME}`, {
        ...requestSettings,
        method: 'POST',
        body: JSON.stringify(todoData),
      });

      if (response.status === 404) {
        throw new Error(`Failed to Create new Todo`)
      }

    } catch (error) {
      throw formatError(error);
    }
  },

  async deleteTodo(id) {
    try {
      const response = await fetch(`${SERVER_ADDRESS}/${TODOS_COLLECTION_NAME}/${id}`, {
        ...requestSettings,
        method: 'DELETE',
      });

      if (response.status === 404) {
        throw new Error(`Failed to Delete  Todo`)
      }

    } catch (error) {
      throw formatError(error);
    }
},

  async updateTodo({ id, props }) {
    try {
      const response = await fetch(`${SERVER_ADDRESS}/${TODOS_COLLECTION_NAME}/${id}`, {
        ...requestSettings,
        method: 'PATCH',
        body: JSON.stringify(props),
      });

      if (response.status === 404) {
        throw new Error(`Failed to update  Todo`)
      }

    } catch (error) {
      throw formatError(error);
    }
  }
};

export default API;