import { todoActionNames } from '../actions/todoActions';
import { groupActionNames } from '../actions/groupActions';
import _ from 'lodash';

const todoInitState = {
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
  todoCount: 4
}

function todoReducer(state = todoInitState, action) {
  let _state = _.cloneDeep(state);
  let todoList = [];
  switch (action.type) {
    case todoActionNames.ADD_TODO:
      _state.todoCount++
      todoList = _state.todoList[action.payload.selectedGroup];
      let todoItem = {
        id: "item-" + _state.todoCount,
        label: action.payload.label,
        completed: false
      }
      todoList.push(todoItem);
      return _state;
    case todoActionNames.COMPLETE_TODO:
      todoList = _state.todoList[action.payload.selectedGroup];
      for (var i = 0; i < todoList.length; i++) {
        if (todoList[i].id == action.payload.id) {
          todoList[i].completed = true;
          break;
        }
      }
      return _state;
    case todoActionNames.DELETE_TODO:
      todoList = _state.todoList[action.payload.selectedGroup];
      for (var i = 0; i < todoList.length; i++) {
        if (todoList[i].id == action.payload.id) {
          todoList.splice(i, 1);
          break;
        }
      }
      return _state;
    case groupActionNames.ADD_GROUP:
      _state.todoList[action.payload.groupId] = [];
      return _state;
    case groupActionNames.DELETE_GROUP:
      delete _state.todoList[action.payload.id];
      return _state;
    default:
        return state;
  }
}

export default todoReducer;