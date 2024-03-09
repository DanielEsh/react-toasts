import { lazy, Suspense } from 'react'
import { createBrowserRouter } from 'react-router-dom'
import { PrivateRoute } from '@/components/PrivateRouter.tsx'
import { RootLayout } from '@/layouts/root-layout.tsx'
import { CategoriesCreate } from '@/routes/categories-create.tsx'
import { CategoriesDetails } from '@/routes/categories-details.tsx'
import { NotificationsPage } from '@/routes/notifications-page'
import { AuthLayout } from '@/layouts/auth-layout.tsx'
import { Login } from '@/routes/login.tsx'
import { SandboxPage } from '@/routes/sandbox-page'

const HomePage = lazy(async () => {
  const [moduleExports] = await Promise.all([
    import('@/routes/home.tsx'),
    new Promise((resolve) => setTimeout(resolve, 0)),
  ])
  return moduleExports
})

const CategoriesPage = lazy(async () => {
  const [moduleExports] = await Promise.all([
    import('@/routes/categories'),
    new Promise((resolve) => setTimeout(resolve, 0)),
  ])
  return moduleExports
})

export const router = createBrowserRouter([
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
      {
        path: '/notifications',
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <NotificationsPage />
          </Suspense>
        ),
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
  {
    path: '/sandbox',
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <SandboxPage />
      </Suspense>
    ),
  },
])
