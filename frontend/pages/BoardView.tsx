import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

interface Task {
  id: number;
  title: string;
  description?: string;
}

interface Column {
  id: number;
  name: string;
  tasks: Task[];
}

const BoardView: React.FC = () => {
  const { boardId } = useParams<{ boardId: string }>();
  const [columns, setColumns] = useState<Column[]>([]);
  const [loading, setLoading] = useState(true);
  const [newColumnName, setNewColumnName] = useState("");
  const [taskInputs, setTaskInputs] = useState<Record<number, string>>({});

  const fetchBoardColumns = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5001/api/boards/${boardId}/columns`
      );
      setColumns(res.data.columns ?? []);
    } catch (err) {
      console.error("Failed to fetch board columns:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (boardId) fetchBoardColumns();
  }, [boardId]);

  const handleAddColumn = async () => {
    if (!newColumnName.trim()) return;

    try {
      await axios.post("http://localhost:5001/api/boards/columns", {
        boardId,
        name: newColumnName,
      });
      setNewColumnName("");
      fetchBoardColumns();
    } catch (error) {
      console.error("Error adding new column:", error);
    }
  };

  const handleAddTask = async (columnId: number) => {
    const title = taskInputs[columnId]?.trim();
    if (!title) return;

    try {
      await axios.post("http://localhost:5001/api/tasks", {
        columnId,
        title,
      });
      setTaskInputs((prev) => ({ ...prev, [columnId]: "" }));
      fetchBoardColumns();
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  if (loading) {
    return <p className="text-white text-center">Loading board...</p>;
  }

  return (
    <div className="max-w-7xl mx-auto py-10 px-4 text-white">
      <h1 className="text-3xl font-bold mb-6 text-center">
        Viewing Board <span className="text-blue-400">#{boardId}</span>
      </h1>

      {/* Add Column */}
      <div className="mb-6 flex justify-center gap-2">
        <input
          type="text"
          placeholder="New column name"
          value={newColumnName}
          onChange={(e) => setNewColumnName(e.target.value)}
          className="px-3 py-2 rounded text-black w-64"
        />
        <button
          onClick={handleAddColumn}
          className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded text-white"
        >
          Add Column
        </button>
      </div>

      {/* Columns */}
      {columns.length === 0 ? (
        <p className="text-center text-gray-300">No columns yet on this board.</p>
      ) : (
        <div className="flex gap-4 overflow-x-auto pb-6">
          {columns.map((col) => (
            <div key={col.id} className="min-w-[300px] bg-zinc-800 p-4 rounded shadow">
              <h2 className="text-xl font-semibold mb-3">{col.name}</h2>

              {/* Tasks */}
              <ul className="space-y-2 mb-4">
                {col.tasks.length > 0 ? (
                  col.tasks.map((task) => (
                    <li key={task.id} className="bg-zinc-700 p-2 rounded">
                      <strong>{task.title}</strong>
                      {task.description && (
                        <p className="text-sm text-gray-300">{task.description}</p>
                      )}
                    </li>
                  ))
                ) : (
                  <li className="text-gray-400 text-sm italic">
                    No tasks in this column.
                  </li>
                )}
              </ul>

              {/* Add Task */}
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="New task title"
                  value={taskInputs[col.id] || ""}
                  onChange={(e) =>
                    setTaskInputs((prev) => ({
                      ...prev,
                      [col.id]: e.target.value,
                    }))
                  }
                  className="px-2 py-1 rounded text-black w-full"
                />
                <button
                  onClick={() => handleAddTask(col.id)}
                  className="bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded text-white"
                >
                  +
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BoardView;
