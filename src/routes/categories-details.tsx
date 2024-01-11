import { useParams } from 'react-router-dom'

export const CategoriesDetails = () => {
  const { id } = useParams()

  return <div>Categories Details Page by id = {id}</div>
}
