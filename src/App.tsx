import { createBrowserRouter, RouterProvider } from 'react-router-dom'
// import {CategoriesPage} from "./routes/categories.tsx";
import { CategoriesCreate } from './routes/categories-create.tsx'
import { CategoriesDetails } from './routes/categories-details.tsx'
import { RootLayout } from './layouts/root-layout.tsx'
import { AuthLayout } from './layouts/auth-layout.tsx'
import { Login } from './routes/login.tsx'
import { lazy, Suspense } from 'react'
import { PrivateRoute } from './components/PrivateRouter.tsx'
import { ThemeProvider } from './modules/core/themes'
import { DarkModeToggle } from './modules/core/themes/DarkModeToggle.tsx'
import { NotificationsPage } from '@/routes/notifications-page'

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
])

const enum Theme {
  light = 'light',
  dark = 'dark',
  system = 'system',
}

export const App = () => {
  return (
    <ThemeProvider themes={[Theme.light, Theme.dark, Theme.system]}>
      <>
        <div className="bg-surface">TEST</div>

        <DarkModeToggle />

        <div className="flex gap-1">
          <div></div>
        </div>
        <RouterProvider router={router} />
      </>
    </ThemeProvider>
  )
}
