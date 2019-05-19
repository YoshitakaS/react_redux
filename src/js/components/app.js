import React from 'react';
import SideArea from './sideArea';
import MainArea from '../containers/mainArea';

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
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
  }

  onCompleteTodo(id) {
    let _state = Object.assign({}, this.state);
    let todoList = _state.todoList[_state.selectedGroup];
    for (var i = 0; i < todoList.length; i++) {
      if (todoList[i].id == id) {
        todoList[i].completed = true;
        break;
      }
    }
    this.setState(_state);
  }

  onDeleteTodo(id) {
    let _state = Object.assign({}, this.state);
    let todoList = _state.todoList[_state.selectedGroup];
    for (var i = 0; i < todoList.length; i++) {
      if (todoList[i].id == id) {
        todoList.splice(i, 1);
        break;
      }
    }
    this.setState(_state);
  }

  onSelectGroup(id) {
    this.setState({selectedGroup: id});
  }

  onAddGroup(groupName) {
    let _state = Object.assign({}, this.state);
    _state.groupCount++;
    let groupId = "group-" + _state.groupCount;
    let groupItem = {
      id: groupId,
      label: groupName
    }
    _state.groupList.push(groupItem);
    _state.todoList[groupId] = [];
    this.setState({_state});
  }

  onEditGroup(id, groupName) {
    let _state = Object.assign({}, this.state);
    for (let i = 0; i < _state.groupList.length; i++) {
      if (_state.groupList[i].id == id) {
        _state.groupList[i].label = groupName;
        break;
      }
    }
    this.setState({_state});
  }

  onDeleteGroup(id) {
    let _state = Object.assign({}, this.state);
    for (let i = 0; i < _state.groupList.length; i++) {
      if(_state.groupList[i].id == id) {
        _state.groupList.splice(i, 1);
        break;
      }
    }
    delete _state.todoList[id];
    this.setState({_state});
  }

  render() {

    return (
      <div className='wrap'>
        <SideArea
          groupList={this.state.groupList}
          onSelect={this.onSelectGroup.bind(this)}
          onAddGroup={this.onAddGroup.bind(this)}
          onEditGroup={this.onEditGroup.bind(this)}
          onDeleteGroup={this.onDeleteGroup.bind(this)}/>
        <MainArea />
      </div>
    )
  }
}