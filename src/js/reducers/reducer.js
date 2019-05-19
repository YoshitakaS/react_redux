import { todoActionNames } from '../actions/todoActions';

const initialState  = {
  groupList: [
    {
      id: "inbox",
      label: "受信箱"
    },
    {
      id: "group-1",
      label: "グループ1"
    }
  ],
  todoList: {
    "inbox": [
                {
                  id:    "item-1",
                  label: "Todo1",
                  completed: false
                },
                {
                  id:    "item-2",
                  label: "Todo2",
                  completed: false
                },
                {
                  id:    "item-5",
                  label: "Todo5",
                  completed: false
                }
             ],
    "group-1": [
                  {
                    id:    "item-3",
                    label: "Todo3",
                    completed: false
                  },
                  {
                    id:    "item-4",
                    label: "Todo4",
                    completed: false
                  }
               ]
  },
  todoCount: 4,
  groupCount: 1,
  selectedGroup: "inbox"
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case todoActionNames.ADD_TODO:
      let _state = Object.assign({}, state);
      _state.todoCount++
      let todoList = _state.todoList[_state.selectedGroup];
      let todoItem = {
        id: "item-" + _state.todoCount,
        label: action.payload.data,
        completed: false
      }
      todoList.push(todoItem);
      return _state;

    default:
      return state;
  }
}

export default reducer;