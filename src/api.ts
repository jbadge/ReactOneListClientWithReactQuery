import axios from 'axios'
import { TodoItemType } from './App'
import { useMutation, useQuery } from 'react-query'

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

export function useDeleteItemMutation(id: string, onSuccess: () => void) {
  return useMutation(() => deleteOneTodo(id), {
    onSuccess,
  })
}

const EmptyTodoItem: TodoItemType = {
  id: undefined,
  text: '',
  complete: false,
  created_at: undefined,
  updated_at: undefined,
}

export function useLoadOneItem(id: string) {
  const { data: todoItem = EmptyTodoItem, isLoading: isTodoItemLoading } =
    useQuery(['todo', id], () => getOneTodo(id))

  return { todoItem, isTodoItemLoading }
}
