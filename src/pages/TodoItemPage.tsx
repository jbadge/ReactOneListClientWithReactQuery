import React from 'react'
import { useNavigate, useParams } from 'react-router'
import { TodoItemType } from '../App'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { useQuery } from 'react-query'

async function getOneTodo(id: string) {
  const response = await axios.get<TodoItemType>(
    `https://one-list-api.herokuapp.com/items/${id}?access_token=cohort22`
  )

  return response.data
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
    () => getOneTodo(params.id!)
  )

  async function deleteTodoItem() {
    const response = await axios.delete(
      `https://one-list-api.herokuapp.com/items/${params.id}?access_token=cohort22`
    )

    if (response.status === 204) {
      navigate('/')
    }
  }

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
      <button onClick={deleteTodoItem}>Delete</button>
    </div>
  )
}
