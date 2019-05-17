import React from 'react';
import Header from './header';
import Footer from './footer';
import ListItem from './listItem';

export default class MainArea extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      todoInputValue: ""
    }
  }

  onChangeToDoInput(event) {
    this.setState({todoInputValue: event.target.value});
  }

  onClickAddButton(event) {
    this.setState({todoInputValue: ""});
    this.props.onAddTodo(this.state.todoInputValue)
  }

  onCompleteTodo(id) {
   this.props.onCompleteTodo(id);
  }

  onDeleteTodo(id) {
   this.props.onDeleteTodo(id);
  }

  renderToDoItems() {
    let todoItemDom = [];
    for (var i = 0; i < this.props.todoList.length; i++) {
      if (!this.props.todoList[i].completed && !this.props.todoList[i].deleted) {
        let todoItem = <ListItem
                       key={"item-"+i}
                       data={this.props.todoList[i]}
                       completeTodo={this.onCompleteTodo.bind(this)}
                       deleteTodo={this.onDeleteTodo.bind(this)}
                     />;
        todoItemDom.push(todoItem);
      }
    }
    return todoItemDom;
  }

  render() {

    return (
      <div className='main-area'>
        <Header
          groupName={this.props.groupName}/>
        <main className="list-area">
          <div className="todo-input-area">
            <input type="text"
                   className="todo-input"
                   placeholder="Todoを追加"
                   value={this.state.todoInputValue}
                   onChange={this.onChangeToDoInput.bind(this)}/>
            <button className="add-button"
                    onClick={this.onClickAddButton.bind(this)}>登録</button>
          </div>
          <ul className="todo-list">
            {this.renderToDoItems()}
          </ul>
        </main>
        <Footer />
      </div>
    )
  }
}