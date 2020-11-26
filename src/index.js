import React from 'react';
import ReactDOM from 'react-dom';
import './tailwind.css';

class Tasklist extends React.Component {
  handleChange(_, taskId) {
    this.props.toggleTaskDone(taskId)
  }

  render() {
    const items = (
      this.props.tasks.map((task) =>
        <li key={task.id}><label>
        <input
          defaultChecked={task.done}
          // onChange is passed a single argument, the event, by the browser. We
          // need it to know about the task.id, so we make it a closure.
          onChange={(event) => this.handleChange(event, task.id)}
          type="checkbox"
          className="mx-2"
        />
        <span className={task.done ? "line-through text-gray-400" : ""}>{task.text}</span>
        </label></li>
      )
    )
    return (
      <ul className="list-none my-2">
        {items}
      </ul>
    )
  }
}

class Taskentry extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      taskText: ''
    }
  }

  handleChange = (event) => {
    this.setState({
      taskText: event.target.value
    })
  }

  handleSubmit = (event) => {
    event.preventDefault()
    this.props.addTask(this.state.taskText)
    this.setState({
      taskText: ''
    })
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input className="border" type="text" value={this.state.taskText} onChange={this.handleChange} />
        <input className="border mx-2 px-2" type="submit" value="Add task" />
      </form>
    )
  }
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: [
        {id: 0, done: true, text: 'Buy milk'},
        {id: 1, done: false, text: 'Call mum'}
      ]
    }
  }

  toggleTaskDone(taskId) {
    const tasks = this.state.tasks
    const idx = this.state.tasks.findIndex((task) => task.id === taskId)
    tasks[idx].done = (tasks[idx].done ? false : true)
    this.setState({
      tasks
    })
  }

  addTask(taskText) {
    const tasks = this.state.tasks;
    const maxId = Math.max(...this.state.tasks.map((task) => task.id))
    this.setState({
      tasks: [{done:false, text: taskText, id: maxId + 1}].concat(tasks)
    })
  }

  clearDone(event) {
    event.preventDefault()
    this.setState({
      tasks: this.state.tasks.filter((task) => !task.done)
    })
  }

  render() {
    const clearDoneButton = (
      <form onSubmit={(event) => this.clearDone(event)}>
        <input className="border px-2" type="submit" value="Clear done" />
      </form>
    )
    return (
      <div className="px-5 py-5">
        <h1 className="font-bold text-lg">Todo</h1>
        <Taskentry addTask={(taskText) => this.addTask(taskText)} />
        <Tasklist
          tasks={this.state.tasks}
          toggleTaskDone={(taskId) => this.toggleTaskDone(taskId)}
        />
        {clearDoneButton}
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
