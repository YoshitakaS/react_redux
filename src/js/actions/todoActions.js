export const todoActionNames = {
  ADD_TODO: 'ADD_TODO'
}

export const todoActions = {
  addTodo: (data) => {
    return {
      type: todoActionNames.ADD_TODO,
      payload: {
        data: data
      }
    }
  }
}