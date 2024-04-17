import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { TodoItem } from '../components/TodoItem'
import { TodoItemType } from '../App'

export function TodoList() {
  const [todoItems, setTodoItems] = useState<TodoItemType[]>([])
  const [newTodoText, setNewTodoText] = useState('')

  function loadAllTheItems() {
    async function fetchListOfItems() {
      const response = await axios.get(
        'https://one-list-api.herokuapp.com/items?access_token=cohort22'
      )

      if (response.status === 200) {
        setTodoItems(response.data)
      }
    }
    fetchListOfItems()
  }

  useEffect(loadAllTheItems, [])

  async function handleCreateNewTodoItem() {
    const response = await axios.post(
      'https://one-list-api.herokuapp.com/items?access_token=cohort22',
      {
        item: { text: newTodoText },
      }
    )
    if (response.status === 201) {
      loadAllTheItems()
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
              reloadItems={loadAllTheItems}
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
