import React, { useState } from 'react'
import axios from 'axios'
import { TodoItem } from '../components/TodoItem'
import { TodoItemType } from '../App'
import { useQuery } from 'react-query'

async function getTodos() {
  const response = await axios.get<TodoItemType[]>(
    'https://one-list-api.herokuapp.com/items?access_token=cohort22'
  )

  return response.data
}

export function TodoList() {
  const { data: todoItems = [], refetch } = useQuery('todos', getTodos)

  const [newTodoText, setNewTodoText] = useState('')

  async function handleCreateNewTodoItem() {
    const response = await axios.post(
      'https://one-list-api.herokuapp.com/items?access_token=cohort22',
      {
        item: { text: newTodoText },
      }
    )
    if (response.status === 201) {
      refetch()
    }
  }

  return (
    <>
      <ul>
        {todoItems.map(function (todoItem) {
          return (
            <TodoItem
              key={todoItem.id}
              todoItem={todoItem}
              reloadItems={() => refetch()}
            />
          )
        })}
      </ul>
      <form
        onSubmit={(event) => {
          event.preventDefault()
          handleCreateNewTodoItem()
        }}
      >
        <input
          type="text"
          placeholder="Whats up?"
          value={newTodoText}
          onChange={(event) => {
            setNewTodoText(event.target.value)
          }}
        />
      </form>
    </>
  )
}
