import { useState, useEffect } from "react";
import SubmitButton from "../../components/ux/SubmitButton";
import { CiCirclePlus, CiCircleMinus } from "react-icons/ci";
import Button from "../../components/ux/Button";
import { GoTasklist } from "react-icons/go";
import { createTask, getTasks } from "../../api/blogapi";
import TaskCard from "./TaskCard";

function TaskManger() {
  const [display, setDisplay] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [taskData, setTaskData] = useState({
    title: "",
    dueDate: Date,
    priority: "low",
    description: ""
  });
  const [priority, setPriority] = useState("");
  const [status, setStatus] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      const response = createTask(taskData);
      setTaskData({
        title: "",
        dueDate: Date,
        priority: "low",
        description: ""
      });
      alert("Task created successfully.");
    } catch (error) {
      console.error("Error when creating task:", error);
      alert("Failed to create task.");
    }
  };

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await getTasks(status, priority);
        setTasks(response.data.tasks);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };

    fetchTasks();
  }, [priority, status])

  return (
    <>
    <div className="relative pb-1.5 pt-2 px-2 z-20 bg-slate-50">
      <div className="flex items-center justify-between">
        <h3 className="flex items-center justify-center gap-2 py-2">
          <GoTasklist />
          Tasks
        </h3>
        <button className="text-3xl font-extrabold cursor-pointer hover:scale-105 transition" onClick={() => setDisplay(!display)}>
          { !display ? <CiCirclePlus /> : <CiCircleMinus /> }
        </button>
      </div>
      <div className="flex gap-1.5">
        <Button className={`text-[var(--secondary-text-color)] ${priority === "low" ? "bg-[var(--primary-color)]" : "bg-[var(--primary-disabled)]"}`} event={(e) => {
          e.preventDefault()
          setPriority(state => state !== "low" ? state = "low" : state = "")
          }}>Low</Button>
        <Button className={`text-[var(--secondary-text-color)] ${priority === "medium" ? "bg-[var(--primary-color)]" : "bg-[var(--primary-disabled)]"}`} event={(e) => {
          e.preventDefault()
          setPriority(state => state !== "medium" ? state = "medium" : state = "")
          }}>Medium</Button>
        <Button className={`text-[var(--secondary-text-color)] ${priority === "high" ? "bg-[var(--primary-color)]" : "bg-[var(--primary-disabled)]"}`} event={(e) => {
          e.preventDefault()
          setPriority(state => state !== "high" ? state = "high" : state = "")
          }}>High</Button>
      </div>
      <div className="flex gap-1.5 mt-2">
        <button className={`text-[var(--secondary-color)] ${status === "pending" ? "bg-[var(--btn-color)]" : "bg-[var(--btn-disabled)]"} px-2 rounded-sm cursor-pointer`} onClick={(e) => {
          e.preventDefault()
          setStatus(state => state !== "pending" ? state = "pending" : state = "")
        }}>Pending</button>
        <button className={`text-[var(--secondary-color)] ${status === "in-progress" ? "bg-[var(--btn-color)]" : "bg-[var(--btn-disabled)]"} px-2 rounded-sm cursor-pointer`} onClick={(e) => {
          e.preventDefault()
          setStatus(state => state !== "in-progress" ? state = "in-progress" : state = "")
        }}>In-progress</button>
        <button className={`text-[var(--secondary-color)] ${status === "completed" ? "bg-[var(--btn-color)]" : "bg-[var(--btn-disabled)]"} px-2 rounded-sm cursor-pointer`} onClick={(e) => {
          e.preventDefault()
          setStatus(state => state !== "completed" ? state = "completed" : state = "")
        }}>Completed</button>
      </div>
      <form className={`absolute top-full flex flex-col gap-1 bg-[var(--primary-color)] p-2 rounded-b-sm -z-10 origin-top transition duration-500 ease-in-out ${display ? "scale-y-100" : "scale-y-0"} text-white`} onSubmit={handleSubmit}>
        <input type="text" name="task-name" id="task-name" placeholder="Task name..." value={taskData.title} onChange={(e) => setTaskData({ ...taskData, title: e.target.value })} className="text-gray-700"/>

        <label htmlFor="due-date">Due Date:</label>
        <input type="date" name="due-date" id="due-date" onChange={(e) => setTaskData({ ...taskData, dueDate: e.target.value })} className="text-gray-700"/>

        <label htmlFor="priority">Priority:</label>
        <select name="priority" id="priority" value={taskData.priority} onChange={(e) => setTaskData({ ...taskData, priority: e.target.value })} className="bg-slate-50 text-gray-700 py-2 px-3 rounded-md">
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>

        <textarea name="description" placeholder="Description..." value={taskData.description} onChange={(e) => setTaskData({ ...taskData, description: e.target.value })} className="text-gray-700"></textarea>

        <SubmitButton className="self-start text-[var(--secondary-text-color)] bg-[var(--btn-color)]">Create</SubmitButton>
      </form>
    </div>
    <div className="p-2 h-full flex flex-col gap-2">
      {tasks.length ? (tasks.map(task => (
        <TaskCard data={task} key={task._id} />
      ))) : (<p>No tasks yet. Create some.</p>)}
    </div>
    </>
  );
}

export default TaskManger;