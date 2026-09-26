import { Routes, Route, useNavigate, useLocation, Outlet } from 'react-router-dom'
import { TerminalAppShell } from '@/components/terminal/TerminalAppShell'
import { ScrollToTop } from '@/components/navigation/ScrollToTop'
import { useAuth } from '@/hooks/useAuth'
import { useSessionGuard } from '@/hooks/useSessionGuard'
import { HomePage } from '@/pages/Home'
import { RegisterPage } from '@/pages/Register'
import { LoginPage } from '@/pages/Login'
import { SetupProfilePage } from '@/pages/SetupProfile'
import { ForgotPasswordPage } from '@/pages/ForgotPassword'
import { ResetPasswordPage } from '@/pages/ResetPassword'
import { PlaceholderPage } from '@/pages/PlaceholderPage'

function PublicLayout() {
  const navigate = useNavigate()
  const location = useLocation()
  const { user } = useAuth()

  return (
    <TerminalAppShell
      mode="public"
      activePath={location.pathname}
      onNavigate={(path) => navigate(path)}
      onRegisterClick={() => navigate('/register')}
      onLoginClick={() => navigate('/login')}
      isAuthenticated={!!user}
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
  { path: '/account', title: 'ACCOUNT', step: 'Step 15' },
  { path: '/support', title: 'SUPPORT', step: 'Step 16' },
  { path: '/terms', title: 'TERMS', step: 'Step 5' },
  { path: '/privacy', title: 'PRIVACY', step: 'Step 5' },
  { path: '/payment/pending', title: 'PAYMENT_PENDING', step: 'Step 9' },
  { path: '/payment/success', title: 'PAYMENT_SUCCESS', step: 'Step 9' },
  { path: '/payment/failed', title: 'PAYMENT_FAILED', step: 'Step 9' },
]

function App() {
  useSessionGuard()

  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route element={<PublicLayout />}>
          <Route index element={<HomeRoute />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/setup-profile" element={<SetupProfilePage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/reset-password" element={<ResetPasswordPage />} />
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