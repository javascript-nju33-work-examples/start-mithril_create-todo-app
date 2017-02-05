import m from 'mithril';

class TodoView {
  constructor() {
    this.tasks = null;
  }

  oninit(vnode) {
    const {model} = vnode.attrs;
    model.getTasks().then(tasks => {
      this.tasks = tasks;
    });
  }

  handleSubmit(model) {
    return async e => {
      e.preventDefault();
      const contentElem = e.target[0]
      const content = contentElem.value;

      if (!content) {
        return;
      }

      const latestTask = await model.addTask({
        content,
        done: false
      });
      console.log(latestTask);
      this.tasks.push(latestTask);

      contentElem.value = ''
    };
  }

  removeTask(model, task, idx) {
    return () => {
      model.removeTask(task);
      this.tasks.splice(idx, 1);
    };
  }

  view(vnode) {
    const {model} = vnode.attrs;

    if (this.tasks === null) {
      return <section>Loading...</section>;
    }

    return (
      <section>
        {this.count}
        <ul>
          {(this.tasks || []).map((task, idx) => (
            <li>
              <span>{task.content}</span>
              <input type="checkbox"
                     onclick={model.toggleComplete(task)}
                     checked={task.done ? true : false}/>
              <button onclick={this.removeTask(model, task, idx)}
                      style={task.done ? 'display:inline' : 'display:none'}>
                Delete
              </button>
            </li>
          ))}
        </ul>
        <form onsubmit={this.handleSubmit(model)}>
          <input type="text"/>
          <input type="submit"/>
        </form>
      </section>
    )
  }
}

export default new TodoView();
