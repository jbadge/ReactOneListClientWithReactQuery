import React from 'react'
import { TodoItemType } from '../App'
import { Link } from 'react-router-dom'
import { useMutation } from 'react-query'
import { toggleItemComplete } from '../api'

type TodoItemProps = {
  todoItem: TodoItemType
  reloadItems: () => void
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
