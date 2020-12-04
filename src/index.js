import React from "react";
import ReactDOM from "react-dom";
import "./tailwind.css";

const DEFAULT_TASKS = [
  { id: 0, done: true, text: "Buy milk" },
  { id: 1, done: false, text: "Call mum" },
];

class NewTaskEntry extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      taskText: "",
    };
  }

  handleChange = (event) => {
    this.setState({
      taskText: event.target.value,
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    if (this.state.taskText === "") {
      return;
    }
    this.props.addTask(this.state.taskText);
    this.setState({
      taskText: "",
    });
  };

  render() {
    const isTask = this.state.taskText !== "";
    return (
      <form onSubmit={this.handleSubmit}>
        <input
          className="border"
          type="text"
          autofocus="autofocus"
          value={this.state.taskText}
          onChange={this.handleChange}
        />
        <input
          className={"border mx-2 px-2 " + (isTask ? "" : "text-gray-400")}
          type="submit"
          value="Add task"
        />
      </form>
    );
  }
}

function ClearDoneButton(props) {
  return (
    <form onSubmit={props.clearDone}>
      <input className="border px-2" type="submit" value="Clear done" />
    </form>
  );
}

function TaskListItem(props) {
  return (
    <li key={props.task.id}>
      <label>
        <input
          defaultChecked={props.task.done}
          onChange={props.onChangeTaskIdDone}
          type="checkbox"
          className="mr-2"
        />
        <span className={props.task.done ? "line-through text-gray-400" : ""}>
          {props.task.text}
        </span>
      </label>
    </li>
  );
}

function TaskList(props) {
  const items = props.tasks.map((task) => (
    <TaskListItem
      task={task}
      onChangeTaskIdDone={() => props.onChangeTaskDone(task.id)}
    />
  ));
  return <ul className="list-none my-2">{items}</ul>;
}

class Project extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // Deep copy DEFAULT_TASKS, otherwise Projects share state. Round trip to
      // JSON is a simple way to do deep copy.
      tasks: JSON.parse(JSON.stringify(DEFAULT_TASKS)),
      projectName: "Project",
    };
  }

  handleChangeTaskDone = (taskId) => {
    const tasks = this.state.tasks;
    const idx = this.state.tasks.findIndex((task) => task.id === taskId);
    tasks[idx].done = tasks[idx].done ? false : true;
    this.setState({
      tasks,
    });
  };

  addTask = (taskText) => {
    const tasks = this.state.tasks;
    const maxId = this.state.tasks.length
      ? Math.max(...this.state.tasks.map((task) => task.id))
      : 0;
    this.setState({
      // put new task at start of list
      tasks: [{ done: false, text: taskText, id: maxId + 1 }].concat(tasks),
    });
  };

  clearDone = (event) => {
    event.preventDefault();
    this.setState({
      tasks: this.state.tasks.filter((task) => !task.done),
    });
  };

  render() {
    return (
      <div className="px-5 py-5">
        <h1 className="font-bold text-lg">{this.state.projectName}</h1>
        <NewTaskEntry addTask={this.addTask} />
        <TaskList
          tasks={this.state.tasks}
          onChangeTaskDone={this.handleChangeTaskDone}
        />
        <ClearDoneButton clearDone={this.clearDone} />
      </div>
    );
  }
}

function App() {
  return (
    <div>
      <Project />
      <Project />
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));
