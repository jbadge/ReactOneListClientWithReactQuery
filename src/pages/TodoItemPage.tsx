import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { TodoItemType } from '../App'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { useMutation, useQuery } from 'react-query'

async function getOneTodo(id: string | undefined) {
  const response = await axios.get<TodoItemType>(
    `https://one-list-api.herokuapp.com/items/${id}?access_token=cohort22`
  )

  return response.data
}

async function deleteOneTodo(id: string | undefined) {
  const response = await axios.delete(
    `https://one-list-api.herokuapp.com/items/${id}?access_token=cohort22`
  )

  return response
}

const EmptyTodoItem: TodoItemType = {
  id: undefined,
  text: '',
  complete: false,
  created_at: undefined,
  updated_at: undefined,
}

export function TodoItemPage() {
  const params = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { data: todoItem = EmptyTodoItem, isLoading } = useQuery(
    ['todo', params.id],
    () => getOneTodo(params.id)
  )

  const deleteMutation = useMutation((id: string) => deleteOneTodo(id), {
    onSuccess: function () {
      navigate('/')
    },
  })

  if (isLoading) {
    return null
  }

  console.table({ todoItem })
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
          deleteMutation.mutate(params.id!)
        }}
      >
        Delete
      </button>
    </div>
  )
}
