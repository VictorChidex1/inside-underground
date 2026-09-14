import * as React from 'react'
import {
  Terminal,
  Cpu,
  Layers,
  ArrowRight,
  Sparkles,
  ExternalLink,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import { TerminalAppShell } from '@/components/terminal/TerminalAppShell'
import { TerminalWindow } from '@/components/terminal/TerminalWindow'
import { TerminalPrompt } from '@/components/terminal/TerminalPrompt'
import { TerminalPanel } from '@/components/terminal/TerminalPanel'
import { TerminalStatus } from '@/components/terminal/TerminalStatus'
import { TerminalCursor } from '@/components/terminal/TerminalCursor'
import { TerminalTable, type TerminalTableColumn } from '@/components/terminal/TerminalTable'
import { HomePage } from '@/pages/Home'

interface SampleProduct {
  id: string
  name: string
  category: string
  price: string
  status: string
}

const SAMPLE_PRODUCTS: SampleProduct[] = [
  { id: 'PRD-01', name: 'Zero-Trace WireGuard & VPN Bundle', category: 'Security', price: '45.00 USDT', status: 'active' },
  { id: 'PRD-02', name: 'Production Multi-Cloud Terraform Kit', category: 'DevOps', price: '89.00 USDT', status: 'active' },
  { id: 'PRD-03', name: 'Decentralized Key Custody Architecture', category: 'Web3', price: '59.00 USDT', status: 'pending_payment' },
  { id: 'PRD-04', name: 'Serverless Pentesting & Audit Suite', category: 'Auditing', price: '49.00 USDT', status: 'active' },
]

function App() {
  // Default to public homepage for Step 5
  const [currentView, setCurrentView] = React.useState<'public_home' | 'auth_shell_preview'>('public_home')
  const [activeNavId, setActiveNavId] = React.useState('home')
  const [activePath, setActivePath] = React.useState('/')
  const [commandInput, setCommandInput] = React.useState('')
  const [commandLog, setCommandLog] = React.useState<string[]>([
    'sys_init --mode=serverless --provider=nowpayments',
    'auth_verify --host=insideunderground.com -> OK',
  ])
  const [notification, setNotification] = React.useState<string | null>(null)

  const showNotification = (message: string) => {
    setNotification(message)
    setTimeout(() => setNotification(null), 3500)
  }

  const tableColumns: TerminalTableColumn<SampleProduct>[] = [
    {
      key: 'id',
      header: 'ID',
      className: 'text-[#00FF66] font-semibold w-24',
    },
    {
      key: 'name',
      header: 'Product Specification',
      render: (item) => (
        <div>
          <span className="font-medium text-[#EDEDED]">{item.name}</span>
          <span className="block text-[10px] text-[#737373]">UUID: {item.id}</span>
        </div>
      ),
    },
    {
      key: 'category',
      header: 'Category',
      render: (item) => (
        <Badge variant="purple" className="text-[10px]">
          {item.category}
        </Badge>
      ),
    },
    {
      key: 'price',
      header: 'Asset Value',
      align: 'right',
      className: 'text-[#00FF66] font-medium',
    },
    {
      key: 'status',
      header: 'State',
      align: 'center',
      render: (item) => <TerminalStatus status={item.status} />,
    },
  ]

  const handleCommandSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!commandInput.trim()) return
    setCommandLog((prev) => [...prev.slice(-4), commandInput.trim()])
    setCommandInput('')
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
        showNotification('Step 6 will implement the dedicated /browse catalogue.')
      }
    } else if (path === '/support') {
      const contact = document.getElementById('contact')
      if (contact) {
        contact.scrollIntoView({ behavior: 'smooth' })
      }
    } else if (path === '/account') {
      setCurrentView('auth_shell_preview')
    } else if (path === '/') {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  return (
    <>
      {/* Notification Toast */}
      {notification && (
        <div className="fixed top-4 right-4 z-50 rounded border border-[#00FF66]/50 bg-[#0A0A0A] px-4 py-2.5 font-mono text-xs text-[#00FF66] shadow-2xl flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-[#00FF66] animate-pulse" />
          <span>{notification}</span>
        </div>
      )}

      {/* Mode Switcher Banner (Floating Dev Controls) */}
      <div className="fixed bottom-3 right-3 z-40 flex items-center gap-2 rounded border border-[#1E1E1E] bg-[#0A0A0A]/90 p-1.5 backdrop-blur font-mono text-[11px] shadow-xl">
        <span className="text-[#737373] hidden sm:inline px-1">VIEW:</span>
        <button
          type="button"
          onClick={() => setCurrentView('public_home')}
          className={`rounded px-2 py-1 transition-colors ${
            currentView === 'public_home'
              ? 'bg-[#00FF66] text-black font-semibold'
              : 'text-[#808080] hover:text-[#EDEDED]'
          }`}
        >
          PUBLIC HOMEPAGE
        </button>
        <button
          type="button"
          onClick={() => setCurrentView('auth_shell_preview')}
          className={`rounded px-2 py-1 transition-colors ${
            currentView === 'auth_shell_preview'
              ? 'bg-[#00FF66] text-black font-semibold'
              : 'text-[#808080] hover:text-[#EDEDED]'
          }`}
        >
          AUTH SHELL PREVIEW
        </button>
      </div>

      {currentView === 'public_home' ? (
        /* Step 5: Public Marketing Shell & Homepage */
        <TerminalAppShell
          mode="public"
          activePath={activePath}
          onNavigate={handleNavigate}
        >
          <HomePage
            onNavigate={handleNavigate}
            onProductClick={(id) =>
              showNotification(`Inspecting ${id} — Step 6 will establish dedicated product pages.`)
            }
            onRegisterClick={() =>
              showNotification('Register flow will be connected in Step 7.')
            }
            onLoginClick={() =>
              showNotification('Login flow will be connected in Step 7.')
            }
          />
        </TerminalAppShell>
      ) : (
        /* Step 4 Authenticated Shell Preview */
        <TerminalAppShell
          mode="authenticated"
          activeNavId={activeNavId}
          activePath={`/${activeNavId}`}
          onNavigate={(_path, item) => {
            if (item) {
              setActiveNavId(item.id)
            }
          }}
          userEmail="operator@insideunderground.com"
          accountStatus="ACTIVE"
          currentPathDisplay={`operator@insideunderground.com:~/${activeNavId}`}
          currentTitle="Terminal UI Design System"
        >
          <div className="space-y-6 max-w-6xl mx-auto font-mono">
            {/* Top Bar */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 rounded border border-[#1E1E1E] bg-[#070707] p-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <Terminal className="h-4 w-4 text-[#00FF66]" />
                  <h1 className="text-sm font-semibold tracking-tight text-[#EDEDED]">
                    AUTHENTICATED WORKSPACE // DESIGN SYSTEM PREVIEW
                  </h1>
                </div>
                <p className="text-xs text-[#808080]">
                  Persistent command navigation, live status telemetry, and technical terminal panels.
                </p>
              </div>
              <Button
                variant="outline"
                size="xs"
                onClick={() => setCurrentView('public_home')}
                className="gap-1.5"
              >
                <span>RETURN TO HOMEPAGE</span>
                <ExternalLink className="h-3 w-3" />
              </Button>
            </div>

            {/* Terminal Window & Live Interactive Shell Demo */}
            <TerminalWindow
              path="operator@insideunderground.com:~/design-system"
              title="Core Primitives & Prompt"
              statusText="ONLINE"
              footer={
                <div className="flex items-center justify-between text-xs">
                  <span>BUFFER: UTF-8 // 0 ERRORS</span>
                  <span className="text-[#00FF66]">HOST: insideunderground.com</span>
                </div>
              }
            >
              <div className="space-y-4">
                <TerminalPrompt
                  user="operator"
                  host="insideunderground.com"
                  path="~/design-tokens"
                  command="cat /etc/inside-underground/colors.conf"
                />

                {/* Design Tokens Palette Visualizer */}
                <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-2.5 pt-2">
                  <div className="rounded border border-[#1E1E1E] bg-[#050505] p-2.5 space-y-1">
                    <div className="h-4 w-full rounded-sm bg-[#050505] border border-[#1E1E1E]" />
                    <span className="block text-[11px] font-semibold text-[#EDEDED]">#050505</span>
                    <span className="block text-[10px] text-[#737373]">Background</span>
                  </div>
                  <div className="rounded border border-[#1E1E1E] bg-[#0A0A0A] p-2.5 space-y-1">
                    <div className="h-4 w-full rounded-sm bg-[#0A0A0A] border border-[#1E1E1E]" />
                    <span className="block text-[11px] font-semibold text-[#EDEDED]">#0A0A0A</span>
                    <span className="block text-[10px] text-[#737373]">Surface 1</span>
                  </div>
                  <div className="rounded border border-[#1E1E1E] bg-[#0D0D0D] p-2.5 space-y-1">
                    <div className="h-4 w-full rounded-sm bg-[#0D0D0D] border border-[#1E1E1E]" />
                    <span className="block text-[11px] font-semibold text-[#EDEDED]">#0D0D0D</span>
                    <span className="block text-[10px] text-[#737373]">Surface 2</span>
                  </div>
                  <div className="rounded border border-[#1E1E1E] bg-[#0A0A0A] p-2.5 space-y-1">
                    <div className="h-4 w-full rounded-sm bg-[#00FF66]" />
                    <span className="block text-[11px] font-semibold text-[#00FF66]">#00FF66</span>
                    <span className="block text-[10px] text-[#737373]">Primary Accent</span>
                  </div>
                  <div className="rounded border border-[#1E1E1E] bg-[#0A0A0A] p-2.5 space-y-1">
                    <div className="h-4 w-full rounded-sm bg-[#0099FF]" />
                    <span className="block text-[11px] font-semibold text-[#0099FF]">#0099FF</span>
                    <span className="block text-[10px] text-[#737373]">Info / Links</span>
                  </div>
                  <div className="rounded border border-[#1E1E1E] bg-[#0A0A0A] p-2.5 space-y-1">
                    <div className="h-4 w-full rounded-sm bg-[#FFB800]" />
                    <span className="block text-[11px] font-semibold text-[#FFB800]">#FFB800</span>
                    <span className="block text-[10px] text-[#737373]">Warning / Pending</span>
                  </div>
                </div>

                <Separator label="COMMAND EXECUTION LOG" />

                {/* Interactive Command Log */}
                <div className="rounded border border-[#1E1E1E] bg-[#080808] p-3 space-y-1.5">
                  {commandLog.map((log) => (
                    <div key={log} className="text-xs text-[#A3A3A3] flex items-center gap-2">
                      <span className="text-[#00FF66]">&gt;</span>
                      <span>{log}</span>
                    </div>
                  ))}
                  <form onSubmit={handleCommandSubmit} className="flex items-center gap-2 pt-1">
                    <span className="text-xs text-[#00FF66] font-semibold">&gt;</span>
                    <input
                      type="text"
                      value={commandInput}
                      onChange={(e) => setCommandInput(e.target.value)}
                      placeholder="type command and press Enter (e.g. status, verify, buy)..."
                      className="flex-1 bg-transparent text-xs text-[#EDEDED] outline-none placeholder:text-[#525252]"
                    />
                    <TerminalCursor shape="block" />
                  </form>
                </div>
              </div>
            </TerminalWindow>

            {/* Section 2: shadcn/ui Customized Primitives */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <TerminalPanel
                title="UI_BUTTONS_AND_BADGES"
                badge={<Badge variant="success">READY</Badge>}
              >
                <div className="space-y-4">
                  <div>
                    <span className="text-[10px] uppercase text-[#737373] tracking-wider block mb-2">
                      // BUTTON VARIANTS
                    </span>
                    <div className="flex flex-wrap gap-2">
                      <Button variant="default" size="sm">DEFAULT</Button>
                      <Button variant="outline" size="sm">OUTLINE</Button>
                      <Button variant="secondary" size="sm">SECONDARY</Button>
                      <Button variant="command" size="sm">[$ CMD_EXEC]</Button>
                      <Button variant="destructive" size="sm">DESTRUCTIVE</Button>
                      <Button variant="ghost" size="sm">GHOST</Button>
                    </div>
                  </div>

                  <Separator />

                  <div>
                    <span className="text-[10px] uppercase text-[#737373] tracking-wider block mb-2">
                      // SEMANTIC STATUS BADGES
                    </span>
                    <div className="flex flex-wrap gap-2">
                      <TerminalStatus status="active" />
                      <TerminalStatus status="pending_payment" />
                      <TerminalStatus status="payment_processing" />
                      <TerminalStatus status="verifying" />
                      <TerminalStatus status="failed" />
                    </div>
                  </div>
                </div>
              </TerminalPanel>

              <TerminalPanel
                title="UI_INPUTS_AND_CARDS"
                badge={<Badge variant="info">PRIMITIVES</Badge>}
              >
                <div className="space-y-4">
                  <div className="space-y-2">
                    <span className="text-[10px] uppercase text-[#737373] tracking-wider block">
                      // TERMINAL INPUT WITH PROMPT PREFIX
                    </span>
                    <Input
                      prefixText=">"
                      placeholder="Enter crypto payment transaction hash..."
                    />
                    <Input
                      prefixText="$"
                      placeholder="Search products by category or name..."
                    />
                  </div>

                  <Card className="mt-2">
                    <CardHeader className="py-2.5 px-3">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-xs">
                          <Cpu className="h-3.5 w-3.5 text-[#00FF66]" />
                          <span>ENCLAVE_STATUS_CARD</span>
                        </CardTitle>
                        <TerminalStatus status="live" showDot={true} />
                      </div>
                      <CardDescription className="text-[11px]">
                        Authoritative serverless pricing verification via Cloud Functions.
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="py-2 px-3 text-xs text-[#A3A3A3]">
                      support@insideunderground.com active for payment reconciliation.
                    </CardContent>
                    <CardFooter className="py-2 px-3 text-[11px] justify-between">
                      <span className="text-[#525252]">DOMAIN: insideunderground.com</span>
                      <Button variant="default" size="xs">
                        INSPECT <ArrowRight className="ml-1 h-3 w-3" />
                      </Button>
                    </CardFooter>
                  </Card>
                </div>
              </TerminalPanel>
            </div>

            {/* Section 3: Data Table */}
            <TerminalPanel
              title="DATA_REGISTRY // PRODUCTS_CATALOG"
              badge={<Badge variant="default">4 RECORDS</Badge>}
              actions={
                <Button variant="outline" size="xs">
                  <Sparkles className="mr-1 h-3 w-3 text-[#00FF66]" />
                  REFRESH REGISTRY
                </Button>
              }
            >
              <TerminalTable
                columns={tableColumns}
                data={SAMPLE_PRODUCTS}
                keyExtractor={(item) => item.id}
              />
            </TerminalPanel>

            {/* Compliance Banner */}
            <div className="rounded border border-[#00FF66]/30 bg-[#003B17]/20 p-4 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Layers className="h-4 w-4 text-[#00FF66]" />
                  <span className="text-xs font-semibold text-[#00FF66]">
                    STEP 5: PUBLIC HOMEPAGE & MARKETING SECTIONS ACTIVE
                  </span>
                </div>
                <Badge variant="success">READY</Badge>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 text-xs">
                <div className="rounded border border-[#1E1E1E] bg-[#070707] p-2.5">
                  <span className="text-[10px] text-[#737373] block uppercase">Domain</span>
                  <span className="text-[#EDEDED] font-semibold">insideunderground.com</span>
                </div>
                <div className="rounded border border-[#1E1E1E] bg-[#070707] p-2.5">
                  <span className="text-[10px] text-[#737373] block uppercase">Support Email</span>
                  <span className="text-[#00FF66] font-semibold">support@insideunderground.com</span>
                </div>
                <div className="rounded border border-[#1E1E1E] bg-[#070707] p-2.5">
                  <span className="text-[10px] text-[#737373] block uppercase">Sections Active</span>
                  <span className="text-[#EDEDED] font-semibold">8 Core Sections</span>
                </div>
                <div className="rounded border border-[#1E1E1E] bg-[#070707] p-2.5">
                  <span className="text-[10px] text-[#737373] block uppercase">Next Roadmap Step</span>
                  <span className="text-[#0099FF] font-semibold">Step 6: Browse & Details</span>
                </div>
              </div>
            </div>
          </div>
        </TerminalAppShell>
      )}
    </>
  )
}

export default App