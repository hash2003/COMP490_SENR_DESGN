import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface Board {
  id: number;
  name: string;
  created_at: string;
  members?: Member[];
}

interface Member {
  email: string;
  permission: "viewer" | "editor";
}

const MyBoards: React.FC = () => {
  const [boards, setBoards] = useState<Board[]>([]);
  const [loading, setLoading] = useState(true);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBoards = async () => {
      const email = localStorage.getItem("userEmail");
      setUserEmail(email);
      if (!email) return;

      try {
        // Fetch user ID
        const res = await fetch("/api/users/by-email", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email }),
        });

        const data = await res.json();
        const userId = data?.user?.id;
        if (!userId) return;

        // Fetch boards
        const boardRes = await fetch(`/api/boards?userId=${userId}`);
        const boardData = await boardRes.json();
        const boardsWithMembers: Board[] = [];

        for (const board of boardData.boards ?? []) {
          const memberRes = await fetch(`/api/boards/${board.id}/members`);
          const memberData = await memberRes.json();
          boardsWithMembers.push({ ...board, members: memberData.members });
        }

        setBoards(boardsWithMembers);
      } catch (err) {
        console.error("Error loading boards:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchBoards();
  }, []);

  return (
    <div className="max-w-3xl mx-auto py-10 px-4 text-white">
      <h1 className="text-2xl font-bold mb-6">My Boards</h1>

      {loading ? (
        <p>Loading boards...</p>
      ) : boards.length === 0 ? (
        <p>You’re not a part of any boards yet.</p>
      ) : (
        <ul className="space-y-6">
          {boards.map((board) => (
            <li key={board.id} className="bg-zinc-800 p-4 rounded shadow">
              <div className="flex justify-between items-center mb-2">
                <h2 className="text-lg font-semibold">{board.name}</h2>
                <button
                  className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm"
                  onClick={() => navigate(`/board/${board.id}`)}
                >
                  Open Board
                </button>
              </div>
              <p className="text-sm text-gray-400 mb-2">
                Created: {new Date(board.created_at).toLocaleString()}
              </p>

              {board.members && (
                <div className="mt-2">
                  <p className="font-semibold text-sm mb-1">Members:</p>
                  <ul className="text-sm space-y-1">
                    {board.members.map((m, idx) => (
                      <li key={idx}>
                        {m.email}{" "}
                        {m.email === userEmail ? (
                          <span className="italic text-green-400">(You - {m.permission})</span>
                        ) : (
                          <span className="italic text-gray-400">({m.permission})</span>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MyBoards;
