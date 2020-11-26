import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class Tasklist extends React.Component {
  handleChange(_, taskId) {
    this.props.toggleTaskDone(taskId)
  }

  render() {
    const items = (
      this.props.tasks.map((task) =>
        <li key={task.id}>
        <input
          defaultChecked={task.done}
          // onChange is passed a single argument, the event, by the browser. We
          // need it to know about the task.id, so we make it a closure.
          onChange={(event) => this.handleChange(event, task.id)}
          type="checkbox"
        />
        {task.text}
        </li>
      )
    )
    return (
      <ul>
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
        <input type="text" value={this.state.taskText} onChange={this.handleChange} />
        <input type="submit" value="Add task" />
      </form>
    )
  }
}

function Remaining(props) {
  const remaining = props.tasks.filter((task) => !task.done)
  return (
    <div>Remaining tasks: {remaining.length}</div>
  )
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
      tasks: tasks.concat({done:false, text: taskText, id: maxId + 1})
    })
  }

  render() {
    return (
      <div>
        <Taskentry addTask={(taskText) => this.addTask(taskText)} />
        <Tasklist
          tasks={this.state.tasks}
          toggleTaskDone={(taskId) => this.toggleTaskDone(taskId)}
        />
        <Remaining tasks={this.state.tasks} />
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
