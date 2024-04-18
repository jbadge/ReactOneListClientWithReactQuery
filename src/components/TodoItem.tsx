import React from 'react'
import axios from 'axios'
import { TodoItemType } from '../App'
import { Link } from 'react-router-dom'
import { useMutation } from 'react-query'

type TodoItemProps = {
  todoItem: TodoItemType
  reloadItems: () => void
}

async function toggleItemComplete(id: number | undefined, complete: boolean) {
  const response = await axios.put(
    `https://one-list-api.herokuapp.com/items/${id}?access_token=cohort22`,
    { item: { complete: !complete } }
  )
  return response
}

export function TodoItem({
  todoItem: { id, text, complete },
  reloadItems,
}: TodoItemProps) {
  const toggleMutation = useMutation(() => toggleItemComplete(id, complete), {
    onSuccess: function () {
      reloadItems()
    },
  })

  return (
    <li key={id} className={complete ? 'completed' : undefined}>
      <span
        onClick={function () {
          toggleMutation.mutate()
        }}
      >
        {text}
      </span>
      <Link to={`/items/${id}`}>Show</Link>
    </li>
  )
}
