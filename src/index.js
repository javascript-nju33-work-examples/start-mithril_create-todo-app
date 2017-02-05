import m, {mount} from 'mithril';
import todoModel from './todo-model';
import TodoView from './todo-view';

class TodoApp {
  view() {
    return (
      <div>
        <h1>Todo</h1>
        <TodoView model={todoModel}></TodoView>
      </div>
    )
  }
}

mount(document.body, new TodoApp());
