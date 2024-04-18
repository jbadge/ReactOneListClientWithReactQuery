import React, { useState } from 'react'
import axios from 'axios'
import { TodoItem } from '../components/TodoItem'
import { TodoItemType } from '../App'
import { useMutation, useQuery } from 'react-query'

async function getTodos() {
  const response = await axios.get<TodoItemType[]>(
    'https://one-list-api.herokuapp.com/items?access_token=cohort22'
  )

  return response.data
}

async function createNewTodoItem(newTodoText: string) {
  const response = await axios.post(
    'https://one-list-api.herokuapp.com/items?access_token=cohort22',
    {
      item: { text: newTodoText },
    }
  )
  return response
}

export function TodoList() {
  const { data: todoItems = [], refetch: refetchTodos } = useQuery(
    'todos',
    () => getTodos()
  )

  const todoItemMutation = useMutation(
    (newTodoText: string) => createNewTodoItem(newTodoText),
    {
      onSuccess: function () {
        refetchTodos()
        setNewTodoText('')
      },
    }
  )

  const [newTodoText, setNewTodoText] = useState('')

  return (
    <>
      <ul>
        {todoItems.map(function (todoItem) {
          return (
            <TodoItem
              key={todoItem.id}
              todoItem={todoItem}
              reloadItems={() => refetchTodos()}
            />
          )
        })}
      </ul>
      <form
        onSubmit={(event) => {
          event.preventDefault()
          todoItemMutation.mutate(newTodoText)
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
