// "use client";

// import { useState } from "react";
// import { supabase } from "@/lib/supabase-client";
// import { useRouter } from "next/navigation";

// export default function AuthForm() {
//   const router = useRouter();
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [isSignUp, setIsSignUp] = useState(false);
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);

//   // Simple email validation regex
//   const validateEmail = (email: string) => {
//     const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     return re.test(email);
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setError("");

//     const trimmedEmail = email.trim();

//     if (!trimmedEmail || !password) {
//       setError("Email and password are required.");
//       return;
//     }

//     if (!validateEmail(trimmedEmail)) {
//       setError("Please enter a valid email address.");
//       return;
//     }

//     setLoading(true);

//     try {
//       if (isSignUp) {
//         const { error } = await supabase.auth.signUp({
//           email: trimmedEmail,
//           password,
//         });
//         if (error) throw error;

//         alert(
//           "Account created! Please check your email to confirm before logging in."
//         );
//         setIsSignUp(false);
//         setEmail("");
//         setPassword("");
//       } else {
//         const { error } = await supabase.auth.signInWithPassword({
//           email: trimmedEmail,
//           password,
//         });
//         if (error) throw error;

//         router.push("/tasks");
//       }
//     } catch (err: any) {
//       console.error("Auth error:", err);
//       setError(err.message || "Something went wrong.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
//       <form
//         onSubmit={handleSubmit}
//         className="bg-white p-6 rounded-lg shadow-md max-w-md w-full"
//         aria-label={isSignUp ? "Sign Up Form" : "Sign In Form"}
//       >
//         <h2 className="text-2xl font-bold mb-6 text-center">
//           {isSignUp ? "Sign Up" : "Sign In"}
//         </h2>
//         {error && (
//           <p className="text-red-600 text-sm mb-4 text-center" role="alert">
//             {error}
//           </p>
//         )}
//         <label htmlFor="email" className="sr-only">
//           Email address
//         </label>
//         <input
//           id="email"
//           type="email"
//           placeholder="Email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           className="border border-gray-300 rounded px-4 py-2 mb-4 w-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
//           autoComplete="email"
//           required
//           disabled={loading}
//         />
//         <label htmlFor="password" className="sr-only">
//           Password
//         </label>
//         <input
//           id="password"
//           type="password"
//           placeholder="Password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           className="border border-gray-300 rounded px-4 py-2 mb-4 w-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
//           autoComplete={isSignUp ? "new-password" : "current-password"}
//           required
//           disabled={loading}
//         />
//         <button
//           type="submit"
//           className={`bg-indigo-600 text-white py-2 rounded w-full hover:bg-indigo-700 transition ${
//             loading ? "opacity-50 cursor-not-allowed" : ""
//           }`}
//           disabled={loading}
//         >
//           {loading
//             ? isSignUp
//               ? "Signing up..."
//               : "Signing in..."
//             : isSignUp
//             ? "Sign Up"
//             : "Sign In"}
//         </button>
//         <p
//           className="mt-4 text-center text-indigo-600 cursor-pointer hover:underline select-none"
//           onClick={() => {
//             if (loading) return;
//             setIsSignUp(!isSignUp);
//             setError("");
//           }}
//           role="button"
//           tabIndex={0}
//           onKeyDown={(e) => {
//             if (e.key === "Enter" || e.key === " ") {
//               e.preventDefault();
//               if (!loading) setIsSignUp(!isSignUp);
//             }
//           }}
//         >
//           {isSignUp
//             ? "Already have an account? Sign In"
//             : "Don't have an account? Sign Up"}
//         </p>
//       </form>
//     </div>
//   );
// }
"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase-client";
import { useRouter } from "next/navigation";

export default function AuthForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    // On mount, check if user prefers dark mode
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    setDarkMode(prefersDark);
  }, []);

  // Toggle dark mode and update <html> class
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const trimmedEmail = email.trim();

    if (!trimmedEmail || !password) {
      setError("Email and password are required.");
      return;
    }

    if (!validateEmail(trimmedEmail)) {
      setError("Please enter a valid email address.");
      return;
    }

    setLoading(true);

    try {
      if (isSignUp) {
        const { error } = await supabase.auth.signUp({
          email: trimmedEmail,
          password,
        });
        if (error) throw error;

        alert(
          "Account created! Please check your email to confirm before logging in."
        );
        setIsSignUp(false);
        setEmail("");
        setPassword("");
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email: trimmedEmail,
          password,
        });
        if (error) throw error;

        router.push("/tasks");
      }
    } catch (err: any) {
      console.error("Auth error:", err);
      setError(err.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-300 p-6">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 transition-colors duration-300">
        {/* Dark mode toggle */}
        <div className="flex justify-end mb-4">
          <button
            onClick={() => setDarkMode(!darkMode)}
            aria-label="Toggle Dark Mode"
            className="focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded"
          >
            {darkMode ? (
              <span className="text-yellow-400 text-2xl">☀️</span>
            ) : (
              <span className="text-gray-700 text-2xl">🌙</span>
            )}
          </button>
        </div>

        <h2 className="text-3xl font-extrabold mb-6 text-center text-gray-900 dark:text-gray-100">
          {isSignUp ? "Sign Up" : "Sign In"}
        </h2>

        {error && (
          <p className="text-red-600 text-center mb-4 select-text" role="alert">
            {error}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <label htmlFor="email" className="sr-only">
            Email address
          </label>
          <input
            id="email"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
            required
            disabled={loading}
            className="w-full rounded-md border border-gray-300 px-4 py-3 text-gray-900 dark:text-gray-100 bg-gray-50 dark:bg-gray-700 placeholder-gray-400 dark:placeholder-gray-400
              focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
          />

          <label htmlFor="password" className="sr-only">
            Password
          </label>
          <input
            id="password"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete={isSignUp ? "new-password" : "current-password"}
            required
            disabled={loading}
            className="w-full rounded-md border border-gray-300 px-4 py-3 text-gray-900 dark:text-gray-100 bg-gray-50 dark:bg-gray-700 placeholder-gray-400 dark:placeholder-gray-400
              focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
          />

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 rounded-md text-white font-semibold ${
              loading
                ? "bg-indigo-400 cursor-not-allowed"
                : "bg-indigo-600 hover:bg-indigo-700"
            } transition`}
          >
            {loading
              ? isSignUp
                ? "Signing up..."
                : "Signing in..."
              : isSignUp
              ? "Sign Up"
              : "Sign In"}
          </button>
        </form>

        <p
          className="mt-6 text-center text-indigo-600 cursor-pointer hover:underline select-none"
          onClick={() => {
            if (!loading) {
              setIsSignUp(!isSignUp);
              setError("");
            }
          }}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if ((e.key === "Enter" || e.key === " ") && !loading) {
              e.preventDefault();
              setIsSignUp(!isSignUp);
              setError("");
            }
          }}
        >
          {isSignUp
            ? "Already have an account? Sign In"
            : "Don't have an account? Sign Up"}
        </p>
      </div>
    </div>
  );
}
