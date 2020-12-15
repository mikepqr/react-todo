import React, { useState } from "react";
import ReactDOM from "react-dom";
import "./tailwind.css";

const DEFAULT_TASKS = [
  { id: 0, done: true, text: "Buy milk" },
  { id: 1, done: false, text: "Call mum" },
];

const NewTaskEntry = props => {
  const [taskText, setTaskText] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    if (taskText === "") {
      return;
    }
    props.addTask(taskText);
    setTaskText("");
  };

  const isTask = taskText !== "";

  return (
    <form onSubmit={handleSubmit}>
      <input
        className="border"
        type="text"
        autoFocus="autofocus"
        value={taskText}
        onChange={(event) => setTaskText(event.target.value)}
      />
      <input
        className={"border mx-2 px-2 " + (isTask ? "" : "text-gray-400")}
        type="submit"
        value="Add task"
      />
    </form>
  );
}

const ClearDoneButton = props => {
  return (
    <form onSubmit={props.clearDone}>
      <input className="border px-2" type="submit" value="Clear done" />
    </form>
  );
}

const TaskListItem = props => {
  return (
    <li>
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
    <TaskListItem key={task.id}
      task={task}
      onChangeTaskIdDone={() => props.onChangeTaskDone(task.id)}
    />
  ));
  return <ul className="list-none my-2">{items}</ul>;
}

const Project = (props) => {
  // Deep copy DEFAULT_TASKS, otherwise Projects share state. Round trip to
  // JSON is a simple way to do deep copy.
  const [tasks, setTasks] = useState(JSON.parse(JSON.stringify(DEFAULT_TASKS)))

  const handleChangeTaskDone = (taskId) => {
    const idx = tasks.findIndex((task) => task.id === taskId);
    const _tasks = tasks.slice();
    _tasks[idx].done = _tasks[idx].done ? false : true;
    setTasks(_tasks)
  };

  const addTask = (taskText) => {
    const maxId = tasks.length
      ? Math.max(...tasks.map((task) => task.id))
      : 0;
    // put new task at start of list
    setTasks([{ done: false, text: taskText, id: maxId + 1 }].concat(tasks))
  };

  const clearDone = (event) => {
    event.preventDefault();
    setTasks(tasks.filter(task => !task.done))
  };

  return (
    <div className="px-5 py-5">
      <h1 className="font-bold text-lg">{props.projectName}</h1>
      <NewTaskEntry addTask={addTask} />
      <TaskList
        tasks={tasks}
        onChangeTaskDone={handleChangeTaskDone}
      />
      <ClearDoneButton clearDone={clearDone} />
    </div>
  );
}

function App() {
  return (
    <div>
      <Project projectName="A" />
      <Project projectName="B" />
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));
