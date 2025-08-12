// "use client";
// import { useState, useEffect } from "react";
// import { supabase } from "../../lib/supabase-client";
// import { useRouter } from "next/navigation";
// // import './globals'
// type Task = {
//   id: string;
//   title: string;
//   description: string;
//   completed: boolean;
// };

// export default function TasksPage() {
//   const [tasks, setTasks] = useState<Task[]>([]);
//   const [title, setTitle] = useState("");
//   const [description, setDescription] = useState("");
//   const router = useRouter();

//   useEffect(() => {
//     supabase.auth.getUser().then(({ data: { user } }) => {
//       if (!user) router.replace("/");
//       else fetchTasks();
//     });
//   }, [router]);

//   const fetchTasks = async () => {
//     const { data, error } = await supabase
//       .from("tasks")
//       .select("*")
//       .order("created_at", { ascending: false });

//     if (error) {
//       console.error("Error fetching tasks:", error);
//       return;
//     }
//     if (data) setTasks(data);
//   };

//   const addTask = async () => {
//     const {
//       data: { user },
//     } = await supabase.auth.getUser();
//     if (!user) return router.replace("/");

//     const { error } = await supabase
//       .from("tasks")
//       .insert([{ title, description, user_id: user.id }]);

//     if (error) {
//       console.error("Error adding task:", error);
//       return;
//     }
//     setTitle("");
//     setDescription("");
//     fetchTasks();
//   };

//   const deleteTask = async (id: string) => {
//     const { error } = await supabase.from("tasks").delete().eq("id", id);
//     if (error) {
//       console.error("Error deleting task:", error);
//       return;
//     }
//     fetchTasks();
//   };

//   const toggleComplete = async (id: string, completed: boolean) => {
//     const { error } = await supabase
//       .from("tasks")
//       .update({ completed: !completed })
//       .eq("id", id);

//     if (error) {
//       console.error("Error updating task:", error);
//       return;
//     }
//     fetchTasks();
//   };

//   return (
//     <div className="p-6 max-w-2xl mx-auto">
//       <button
//         onClick={async () => {
//           await supabase.auth.signOut();
//           router.replace("/");
//         }}
//         className="mb-4 bg-gray-700 text-white px-4 py-2 rounded"
//       >
//         Logout
//       </button>

//       <h1 className="text-2xl mb-4">My Tasks</h1>
//       <div className="flex flex-col gap-2 mb-4">
//         <input
//           className="border p-2"
//           placeholder="Task title"
//           value={title}
//           onChange={(e) => setTitle(e.target.value)}
//         />
//         <textarea
//           className="border p-2"
//           placeholder="Task description"
//           value={description}
//           onChange={(e) => setDescription(e.target.value)}
//         />
//         <button
//           onClick={addTask}
//           className="bg-blue-500 text-white px-4 py-2 disabled:opacity-50"
//           disabled={!title.trim()}
//         >
//           Add Task
//         </button>
//       </div>

//       {tasks.map((task) => (
//         <div
//           key={task.id}
//           className="flex justify-between items-center border p-3 mb-2"
//         >
//           <div>
//             <h2 className={`font-bold ${task.completed ? "line-through" : ""}`}>
//               {task.title}
//             </h2>
//             <p className="text-sm">{task.description}</p>
//           </div>
//           <div className="flex gap-2">
//             <button
//               onClick={() => toggleComplete(task.id, task.completed)}
//               className="bg-yellow-500 text-white px-2 py-1 rounded"
//             >
//               {task.completed ? "Undo" : "Complete"}
//             </button>
//             <button
//               onClick={() => deleteTask(task.id)}
//               className="bg-red-500 text-white px-2 py-1 rounded"
//             >
//               Delete
//             </button>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// }
"use client";

import { useState, useEffect } from "react";
import { supabase } from "../../lib/supabase-client";
import { useRouter } from "next/navigation";

type Task = {
  id: string;
  title: string;
  description: string;
  completed: boolean;
};

export default function TasksPage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [darkMode, setDarkMode] = useState(false);

  const router = useRouter();

  // Load user and tasks, redirect if no user
  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (!user) router.replace("/");
      else fetchTasks();
    });
  }, [router]);

  // Load dark mode preference on mount
  useEffect(() => {
    // Check system preference initially
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    setDarkMode(prefersDark);
  }, []);

  // Apply/remove dark mode class on <html>
  useEffect(() => {
    if (darkMode) document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");
  }, [darkMode]);

  const fetchTasks = async () => {
    const { data, error } = await supabase
      .from("tasks")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching tasks:", error);
      return;
    }
    if (data) setTasks(data);
  };

  const addTask = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) return router.replace("/");

    const { error } = await supabase
      .from("tasks")
      .insert([{ title, description, user_id: user.id }]);

    if (error) {
      console.error("Error adding task:", error);
      return;
    }
    setTitle("");
    setDescription("");
    fetchTasks();
  };

  const deleteTask = async (id: string) => {
    const { error } = await supabase.from("tasks").delete().eq("id", id);
    if (error) {
      console.error("Error deleting task:", error);
      return;
    }
    fetchTasks();
  };

  const toggleComplete = async (id: string, completed: boolean) => {
    const { error } = await supabase
      .from("tasks")
      .update({ completed: !completed })
      .eq("id", id);

    if (error) {
      console.error("Error updating task:", error);
      return;
    }
    fetchTasks();
  };

  return (
    <div className="p-6 max-w-2xl mx-auto min-h-screen transition-colors duration-300 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <header className="flex justify-between items-center mb-6">
        <button
          onClick={() => setDarkMode(!darkMode)}
          aria-label="Toggle Dark Mode"
          className="px-4 py-2 rounded border border-gray-500 dark:border-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 transition"
        >
          {darkMode ? "🌞 Light Mode" : "🌙 Dark Mode"}
        </button>

        <button
          onClick={async () => {
            await supabase.auth.signOut();
            router.replace("/");
          }}
          className="bg-gray-700 dark:bg-gray-300 dark:text-gray-900 text-white px-4 py-2 rounded hover:bg-gray-800 dark:hover:bg-gray-400 transition"
        >
          Logout
        </button>
      </header>

      <h1 className="text-3xl font-bold mb-6">My Tasks</h1>

      <div className="flex flex-col gap-3 mb-6">
        <input
          className="border border-gray-300 dark:border-gray-600 rounded p-2 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 transition"
          placeholder="Task title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          className="border border-gray-300 dark:border-gray-600 rounded p-2 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 transition"
          placeholder="Task description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button
          onClick={addTask}
          disabled={!title.trim()}
          className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white px-4 py-2 rounded transition"
        >
          Add Task
        </button>
      </div>

      {tasks.map((task) => (
        <div
          key={task.id}
          className="flex justify-between items-center border border-gray-300 dark:border-gray-700 p-3 mb-3 rounded transition"
        >
          <div>
            <h2
              className={`font-semibold ${
                task.completed ? "line-through" : ""
              }`}
            >
              {task.title}
            </h2>
            <p className="text-sm">{task.description}</p>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => toggleComplete(task.id, task.completed)}
              className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded transition"
            >
              {task.completed ? "Undo" : "Complete"}
            </button>
            <button
              onClick={() => deleteTask(task.id)}
              className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded transition"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
