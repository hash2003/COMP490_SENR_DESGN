import {
  DndContext,
  DragEndEvent,
  DragOverEvent,
  DragOverlay,
  DragStartEvent,
  MouseSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  horizontalListSortingStrategy,
} from "@dnd-kit/sortable";
import { useEffect, useMemo, useState } from "react";
import { Column, Task, kanbanActions } from "../store/kanbanSlice";
import { useAppDispatch, useAppSelector } from "../util/reduxHooks";
import KanbanColumn from "./KanbanColumn";
import KanbanTaskItem from "./KanbanTaskItem";
import { getParentIdOfTask } from "../util/kanbanUtils";
import axios from "axios";

function KanbanBoard() {
  const dispatch = useAppDispatch();
  const columns = useAppSelector((state) => state.kanban.columns) || [];
  const columnIds = useMemo(() => columns.map((col) => col.id.toString()), [columns]);

  const [boardId, setBoardId] = useState<number | null>(null);
  const [activeColumn, setActiveColumn] = useState<Column | null>(null);
  const [activeTask, setActiveTask] = useState<Task | null>(null);

  // 📥 Fetch or Create User's Default Board
  useEffect(() => {
    const setupDefaultBoard = async () => {
      try {
        const email = localStorage.getItem("userEmail");
        if (!email) return;

        const response = await axios.get(`/api/boards/default?email=${email}`);
        const { boardId, columns } = response.data;

        setBoardId(boardId);
        dispatch(kanbanActions.setBoard({ columns }));
      } catch (err) {
        console.error("❌ Failed to load default board:", err);
      }
    };

    setupDefaultBoard();
  }, [dispatch]);

  // ➕ Create a new column
  const handleAddColumn = async () => {
    if (!boardId) return;
    try {
      const res = await axios.post("/api/boards/columns", {
        boardId,
        name: `New Column`,
      });
      dispatch(kanbanActions.addColumn(res.data.column));
    } catch (err) {
      console.error("❌ Error adding column:", err);
    }
  };

  // 🖱️ Drag and Drop sensors
  const sensors = useSensors(
    useSensor(MouseSensor, { activationConstraint: { distance: 1 } })
  );

  const handleDragStart = (event: DragStartEvent) => {
    const current = event.active.data.current;
    if (!current) return;

    if (current.type === "column") {
      setActiveColumn(current.column);
    } else if (current.type === "task-item") {
      setActiveTask(current.task);
    }
  };

  const handleDragEnd = (event: DragEndEvent) => {
    setActiveColumn(null);
    setActiveTask(null);

    const { active, over } = event;
    const current = active.data.current;
    if (!over || !current) return;

    if (current.type === "column") {
      const fromIndex = columns.findIndex((col) => col.id === active.id);
      const toIndex = columns.findIndex((col) => col.id === over.id);
      dispatch(kanbanActions.moveColumns({ from: fromIndex, to: toIndex }));
    }
  };

  const handleDragOver = (event: DragOverEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const current = active.data.current;
    if (!current || current.type !== "task-item") return;

    if (over.data.current?.type === "task-item") {
      const fromId = current.task.id;
      const toId = over.data.current.task.id;
      const parentId = current.parentId;

      if (parentId === over.data.current.parentId) {
        dispatch(kanbanActions.swapItems({ fromId, toId, parentId }));
      }
    } else if (over.data.current?.type === "column") {
      const taskId = current.task.id;
      const targetColumnId = over.data.current.column.id;
      const currentColumnId = getParentIdOfTask(columns, taskId);

      if (currentColumnId !== targetColumnId) {
        dispatch(
          kanbanActions.moveTaskToColumn({
            taskId,
            columnId: targetColumnId,
          })
        );
      }
    }
  };

  return (
    <div className="flex items-start w-full max-w-[100rem] mx-auto">
      <div className="flex items-start min-w-full gap-3 overflow-x-auto pb-12">
        <DndContext
          sensors={sensors}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
          onDragOver={handleDragOver}
        >
          <SortableContext items={columnIds} strategy={horizontalListSortingStrategy}>
            {columns.map((col) => (
              <KanbanColumn key={col.id.toString()} column={col} />
            ))}
          </SortableContext>

          <DragOverlay>
            {activeColumn && <KanbanColumn column={activeColumn} />}
            {activeTask && <KanbanTaskItem task={activeTask} />}
          </DragOverlay>
        </DndContext>

        <button
          onClick={handleAddColumn}
          className="bg-zinc-800 text-white px-4 py-2 rounded-md border border-transparent hover:border-red-500 transition-all"
        >
          Create Column
        </button>
      </div>
    </div>
  );
}

export default KanbanBoard;
