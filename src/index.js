import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class Tasklist extends React.Component {
  render() {
    return (
      <ul>
      {
        this.props.tasks.map((task, index) =>
          <li key={index}>
          <input defaultChecked={task.done} type="checkbox" />
          {task.text}
          </li>
        )
      }
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
        {done: true, text: 'Buy milk'},
        {done: false, text: 'Call mum'}
      ]
    }
  }

  addTask(taskText) {
    const tasks = this.state.tasks;
    this.setState({
      tasks: tasks.concat({done:false, text: taskText})
    })
  }

  render() {
    return (
      <div>
        <Taskentry addTask={(taskText) => this.addTask(taskText)} />
        <Tasklist tasks={this.state.tasks} />
        <Remaining tasks={this.state.tasks} />
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
