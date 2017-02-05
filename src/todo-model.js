import {request} from 'mithril';

function api([path], id) {
  if (id) {
    return `http://localhost:3000/${path}${id}`;
  }
  return `http://localhost:3000/${path}`;
}

class TodoModel {

  // タスクを全部取ってくる
  async getTasks() {
    const tasks = await request(api`tasks`);
    return tasks;
  }

  // タスクを追加
  async addTask(task) {
    const latestTask = await request({
      method: 'POST',
      url: api`tasks`,
      data: task
    });
    return latestTask;
  }

  // タスクの状態を変更
  toggleComplete(task) {
    return () => {
      task.done = !task.done;
      request({
        method: 'PUT',
        url: api`tasks/${task.id}`,
        data: task
      });
    };
  }

  // タスクを削除
  removeTask(task) {
    request({
      method: 'DELETE',
      url: api`tasks/${task.id}`
    });
  }
}

export default new TodoModel();
