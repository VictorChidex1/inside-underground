import { Routes, Route, useNavigate, useLocation, Outlet } from 'react-router-dom'
import { TerminalAppShell } from '@/components/terminal/TerminalAppShell'
import { ScrollToTop } from '@/components/navigation/ScrollToTop'
import { HomePage } from '@/pages/Home'
import { PlaceholderPage } from '@/pages/PlaceholderPage'

function PublicLayout() {
  const navigate = useNavigate()
  const location = useLocation()

  return (
    <TerminalAppShell
      mode="public"
      activePath={location.pathname}
      onNavigate={(path) => navigate(path)}
      onRegisterClick={() => navigate('/register')}
      onLoginClick={() => navigate('/login')}
    >
      <Outlet />
    </TerminalAppShell>
  )
}

function HomeRoute() {
  const navigate = useNavigate()
  return (
    <HomePage
      onNavigate={(path) => navigate(path)}
      onProductClick={(id) => navigate(`/product/${id}`)}
      onRegisterClick={() => navigate('/register')}
      onLoginClick={() => navigate('/login')}
    />
  )
}

const PLACEHOLDER_ROUTES: Array<{ path: string; title: string; step: string }> = [
  { path: '/browse', title: 'BROWSE_PRODUCTS', step: 'Step 6' },
  { path: '/register', title: 'REGISTER', step: 'Step 7' },
  { path: '/login', title: 'LOGIN', step: 'Step 7' },
  { path: '/account', title: 'ACCOUNT', step: 'Step 15' },
  { path: '/support', title: 'SUPPORT', step: 'Step 16' },
  { path: '/forgot-password', title: 'FORGOT_PASSWORD', step: 'Step 7' },
  { path: '/reset-password', title: 'RESET_PASSWORD', step: 'Step 7' },
  { path: '/terms', title: 'TERMS', step: 'Step 5' },
  { path: '/privacy', title: 'PRIVACY', step: 'Step 5' },
  { path: '/payment/pending', title: 'PAYMENT_PENDING', step: 'Step 9' },
  { path: '/payment/success', title: 'PAYMENT_SUCCESS', step: 'Step 9' },
  { path: '/payment/failed', title: 'PAYMENT_FAILED', step: 'Step 9' },
]

function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route element={<PublicLayout />}>
          <Route index element={<HomeRoute />} />
          {PLACEHOLDER_ROUTES.map((route) => (
            <Route
              key={route.path}
              path={route.path}
              element={<PlaceholderPage title={route.title} step={route.step} />}
            />
          ))}
          <Route
            path="/product/:productId"
            element={<PlaceholderPage title="PRODUCT_DETAILS" step="Step 6" />}
          />
          <Route
            path="/checkout/:orderId"
            element={<PlaceholderPage title="CHECKOUT" step="Step 8" />}
          />
          <Route
            path="*"
            element={
              <PlaceholderPage
                title="NOT_FOUND"
                description="The requested route does not exist."
              />
            }
          />
        </Route>
      </Routes>
    </>
  )
}

export default App