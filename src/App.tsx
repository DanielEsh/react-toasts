import { createBrowserRouter, RouterProvider } from 'react-router-dom'
// import {CategoriesPage} from "./routes/categories.tsx";
import { CategoriesCreate } from './routes/categories-create.tsx'
import { CategoriesDetails } from './routes/categories-details.tsx'
import { RootLayout } from './layouts/root-layout.tsx'
import { AuthLayout } from './layouts/auth-layout.tsx'
import { Login } from './routes/login.tsx'
import { lazy, Suspense } from 'react'
import { PrivateRoute } from './components/PrivateRouter.tsx'
import {
  ThemeProvider,
  useTheme,
} from './modules/core/dark-mode/use-dark-mode.tsx'

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
  // const { theme, setTheme } = useTheme()

  const theme = localStorage.getItem('theme')

  const setTheme = (theme: string) => {
    document.documentElement.dataset.theme = theme
    localStorage.setItem('theme', theme)
  }

  return (
    <ThemeProvider>
      <>
        <div className="bg-surface">TEST</div>

        <div className="flex gap-1">
          <div></div>
        </div>

        <div className="flex gap-3">
          <button
            className="button"
            onClick={() => setTheme('dark')}
          >
            dark
          </button>
          <button
            className="button"
            onClick={() => setTheme('light')}
          >
            light
          </button>
          <button className="button">system</button>
        </div>

        <div>theme: {theme}</div>
        <RouterProvider router={router} />
      </>
    </ThemeProvider>
  )
}
