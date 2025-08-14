import { useState } from "react";
import { MdDelete } from "react-icons/md";
import { updateTaskStatus } from "../../api/blogapi";
import { FaCaretDown } from "react-icons/fa";
import { deleteTask } from "../../api/blogapi";

function TaskCard({ data }) {
  const [statusData, setStatusData] = useState({
    status: ""
  });
  const [display, setDisplay] = useState(false);
  const date = new Date(data.dueDate).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
  });
  const completedDate = new Date(data.completedAt).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric"
  })

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      const response = updateTaskStatus(data._id, statusData);
      setStatusData({ status: "" });
      alert("Status changed.");
    } catch (error) {
      console.error("Failed to update task status:", error);
    }
  }

  const handleDelete = (e) => {
    e.preventDefault();
    try {
      deleteTask(data._id);
      alert("Task deleted successfully.");
    } catch (error) {
      console.error("Error when deleting task:", error);
      alert("Falied to delete task.");
    }
  }

  return (
    <div className="flex flex-col bg-slate-50 p-1 rounded-md shadow h-fit">
      <div className="flex items-center justify-between p-2">
        <p className="m-0 capitalize flex items-center gap-1 cursor-pointer" onClick={() => setDisplay(!display)}>
          <button className={`${!display ? "rotate-0" : "rotate-180"} transition duration-300`}>
            <FaCaretDown />
          </button>
          {data.title}
        </p>
        <small className="font-bold">Due: {date}</small>
        
        {data.status === "completed" && (
          <button
          className="flex items-center justify-center text-2xl w-fit cursor-pointer hover:scale-105"
          onClick={handleDelete}
          >
            <MdDelete />
          </button>
        )}
      </div>
      <div className={`bg-gray-400/40 px-2 py-1 rounded-sm ${display ? "block" : "hidden"}`}>
        <div className="flex justify-between items-center">
          <small className="capitalize font-bold">Status: {data.status}</small>
          <small>
            {data.status === "completed" ? (<p>Completed: {completedDate}</p>) : (
              <form className="flex gap-1.5 bg-slate-50 p-0.5 rounded-sm" onSubmit={handleSubmit}>
                <select name="status" value={statusData.status} onChange={(e) => setStatusData({ status: e.target.value })} className="cursor-pointer hover:bg-slate-200 px-1 rounded-sm">
                  <option value="pending">Pending</option>
                  <option value="in-progress">In-progress</option>
                  <option value="completed">Completed</option>
                </select>
                <button type="submit" className="bg-[var(--primary-color)] text-[var(--secondary-text-color)] px-1 rounded-sm cursor-pointer">Submit</button>
              </form>)
            }
          </small>
        </div>
        <small className="block pt-1.5">{data.description}</small>
      </div>
    </div>
  );
}

export default TaskCard;
