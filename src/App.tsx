import * as React from 'react'
import { TerminalAppShell } from '@/components/terminal/TerminalAppShell'
import { HomePage } from '@/pages/Home'

function App() {
  const [activePath, setActivePath] = React.useState('/')
  const [notification, setNotification] = React.useState<string | null>(null)

  const showNotification = (message: string) => {
    setNotification(message)
    setTimeout(() => setNotification(null), 3500)
  }

  const handleNavigate = (path: string) => {
    setActivePath(path)
    if (path.startsWith('/#')) {
      const sectionId = path.replace('/#', '')
      const el = document.getElementById(sectionId)
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' })
      }
    } else if (path === '/browse') {
      const featured = document.getElementById('featured')
      if (featured) {
        featured.scrollIntoView({ behavior: 'smooth' })
      } else {
        showNotification('Step 6 will establish the dedicated /browse catalogue.')
      }
    } else if (path === '/support') {
      const contact = document.getElementById('contact')
      if (contact) {
        contact.scrollIntoView({ behavior: 'smooth' })
      }
    } else if (path === '/') {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  return (
    <>
      {/* Toast Notification */}
      {notification && (
        <div className="fixed top-4 right-4 z-50 rounded border border-[#00FF66]/50 bg-[#0A0A0A] px-4 py-2.5 font-mono text-xs text-[#00FF66] shadow-2xl flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-[#00FF66] animate-pulse" />
          <span>{notification}</span>
        </div>
      )}

      {/* Main Public Application Shell */}
      <TerminalAppShell
        mode="public"
        activePath={activePath}
        onNavigate={handleNavigate}
      >
        <HomePage
          onNavigate={handleNavigate}
          onProductClick={(id) =>
            showNotification(`Inspecting ${id} — Step 6 will establish dedicated product details pages.`)
          }
          onRegisterClick={() =>
            showNotification('Registration flow will be connected in Step 7.')
          }
          onLoginClick={() =>
            showNotification('Login flow will be connected in Step 7.')
          }
        />
      </TerminalAppShell>
    </>
  )
}

export default App