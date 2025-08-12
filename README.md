Task Manager App

A simple task management web app built with Next.js, Supabase, and Tailwind CSS with dark mode support.

## Features

- User authentication (sign up, sign in, sign out) using Supabase Auth
- Create, update, delete, and mark tasks as complete
- Tasks linked to authenticated users only
- Real-time UI updates (optional to add)
- Responsive design with light/dark mode toggle

## Tech Stack

- Next.js 13 (app router)
- React (with hooks)
- Supabase (PostgreSQL + Auth)
- Tailwind CSS (including dark mode)
- TypeScript

## Getting Started

### Prerequisites

- Node.js (v16 or later recommended)
- Supabase account with project created
- Supabase URL and anon/public API key

### Setup

1. Clone the repo

   ```bash
   git clone https://github.com/yourusername/task-manager.git
   cd task-manager
Install dependencies

bash
Copy code
npm install
Create .env.local file with your Supabase credentials

ini
Copy code
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
Run the development server

bash
Copy code
npm run dev
Open http://localhost:3000 in your browser

Supabase Database
Make sure you have a table tasks with columns:

id (UUID, primary key, default gen_random_uuid())

title (text)

description (text)

completed (boolean, default false)

user_id (UUID, foreign key referencing auth.users.id)

created_at (timestamp, default now())

Enable Row Level Security (RLS) on the tasks table and add policy to allow users to manage their own tasks.

Dark Mode
Toggle dark mode by clicking the moon/sun icon (if implemented). Uses Tailwind CSS dark: variant.

License
MIT License

Author
Your Name - your.email@example.com

yaml
Copy code

---

# How to add your project to GitHub

1. **Initialize Git (if not already):**

   ```bash
   git init
