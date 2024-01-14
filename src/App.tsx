import { createBrowserRouter, RouterProvider } from 'react-router-dom'
// import {CategoriesPage} from "./routes/categories.tsx";
import { CategoriesCreate } from './routes/categories-create.tsx'
import { CategoriesDetails } from './routes/categories-details.tsx'
import { RootLayout } from './layouts/root-layout.tsx'
import { AuthLayout } from './layouts/auth-layout.tsx'
import { Login } from './routes/login.tsx'
import { lazy, Suspense } from 'react'
import { PrivateRoute } from './components/PrivateRouter.tsx'

// const HomePage = lazy(() => import('./routes/home.tsx'))
const HomePage = lazy(async () => {
  const [moduleExports] = await Promise.all([
    import('./routes/home.tsx'),
    new Promise((resolve) => setTimeout(resolve, 0)),
  ])
  return moduleExports
})

const CategoriesPage = lazy(async () => {
  const [moduleExports] = await Promise.all([
    import('./routes/categories.tsx'),
    new Promise((resolve) => setTimeout(resolve, 0)),
  ])
  return moduleExports
})

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <PrivateRoute>
        <RootLayout />
      </PrivateRoute>
    ),
    children: [
      {
        path: '/',
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <HomePage />
          </Suspense>
        ),
        index: true,
      },
      {
        path: '/categories',
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <CategoriesPage />
          </Suspense>
        ),
        children: [
          {
            path: 'create',
            element: <CategoriesCreate />,
          },
          {
            path: ':id',
            element: <CategoriesDetails />,
          },
        ],
      },
    ],
  },
  {
    path: '/login',
    element: <AuthLayout />,
    children: [
      {
        index: true,
        element: <Login />,
      },
    ],
  },
])

export const App = () => {
  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}
