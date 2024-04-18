import React from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useDeleteItemMutation, useLoadOneItem } from '../api'

export function TodoItemPage() {
  const { id } = useParams() as { id: string }
  const navigate = useNavigate()

  const { todoItem, isTodoItemLoading } = useLoadOneItem(id)

  const deleteMutation = useDeleteItemMutation(id, function () {
    navigate('/')
  })

  if (isTodoItemLoading) {
    return null
  }

  return (
    <div>
      <p>
        <Link to="/">Home</Link>
      </p>
      <p className={todoItem.complete ? 'completed' : ''}>{todoItem.text}</p>
      <p>Created: {todoItem.created_at}</p>
      <p>Updated: {todoItem.updated_at}</p>
      <button
        onClick={function () {
          deleteMutation.mutate()
        }}
      >
        Delete
      </button>
    </div>
  )
}
