import axios from 'axios'
import { TodoItemType } from './App'

const BASE_URL = 'https://one-list-api.herokuapp.com'

export async function getOneTodo(id: string) {
  const response = await axios.get<TodoItemType>(
    `${BASE_URL}/items/${id}?access_token=cohort22`
  )

  return response.data
}

export async function deleteOneTodo(id: string) {
  const response = await axios.delete(
    `${BASE_URL}/items/${id}?access_token=cohort22`
  )

  return response
}

export async function getTodos() {
  const response = await axios.get<TodoItemType[]>(
    `${BASE_URL}/items?access_token=cohort22`
  )

  return response.data
}

export async function createNewTodoItem(newTodoText: string) {
  const response = await axios.post(`${BASE_URL}/items?access_token=cohort22`, {
    item: { text: newTodoText },
  })

  return response
}

export async function toggleItemComplete(
  id: number | undefined,
  complete: boolean
) {
  const response = await axios.put(
    `${BASE_URL}/items/${id}?access_token=cohort22`,
    { item: { complete: !complete } }
  )
  return response
}
