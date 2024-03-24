import { lazy, Suspense } from 'react'
import { createBrowserRouter } from 'react-router-dom'
import { RootLayout } from '@/layouts/root-layout'
import { SandboxPage } from '@/pages/sandbox-page'

const HomePage = lazy(async () => {
  const [moduleExports] = await Promise.all([
    import('@/pages/home-page'),
    new Promise((resolve) => setTimeout(resolve, 0)),
  ])
  return moduleExports
})

export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
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
