import React from 'react'
import logo from './images/sdg-logo.png'
import { Route, Routes } from 'react-router'
import { TodoList } from './pages/TodoList'
import { TodoItemPage } from './pages/TodoItemPage'
import { Link } from 'react-router-dom'

export type TodoItemType = {
  id: number | undefined
  text: string
  complete: boolean
  created_at: Date | undefined
  updated_at: Date | undefined
}

export function App() {
  return (
    <div className="app">
      <header>
        <h1>One List</h1>
      </header>
      <main>
        <Routes>
          <Route path="/" element={<TodoList />} />
          <Route path="/items/:id" element={<TodoItemPage />} />
          <Route path="*" element={<p>404 - NOT FOUND!</p>} />
        </Routes>
      </main>
      <footer>
        <p>
          <Link to={'/'}>
            <img src={logo} height="42" alt="logo" />
          </Link>
        </p>
        <p>&copy; 2020 Suncoast Developers Guild</p>
      </footer>
    </div>
  )
}
