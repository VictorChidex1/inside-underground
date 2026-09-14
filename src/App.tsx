import * as React from 'react'
import {
  Terminal,
  Cpu,
  Layers,
  ArrowRight,
  Sparkles,
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
import { TerminalCommand } from '@/components/terminal/TerminalCommand'
import { TerminalTable, type TerminalTableColumn } from '@/components/terminal/TerminalTable'

interface SampleProduct {
  id: string
  name: string
  category: string
  price: string
  status: string
}

const SAMPLE_PRODUCTS: SampleProduct[] = [
  { id: 'PRD-01', name: 'Zero-Trace VPN Config Bundle', category: 'Security', price: '45.00 USDT', status: 'active' },
  { id: 'PRD-02', name: 'Cloud Infrastructure Terraform Kit', category: 'DevOps', price: '89.00 USDT', status: 'active' },
  { id: 'PRD-03', name: 'Decentralized Identity Core Lib', category: 'Web3', price: '120.00 USDT', status: 'pending_payment' },
  { id: 'PRD-04', name: 'Private Key Backup Architecture', category: 'Storage', price: '35.00 USDT', status: 'active' },
]

function App() {
  const [shellMode, setShellMode] = React.useState<'authenticated' | 'public'>('authenticated')
  const [activeNavId, setActiveNavId] = React.useState('browse')
  const [commandInput, setCommandInput] = React.useState('')
  const [commandLog, setCommandLog] = React.useState<string[]>([
    'sys_init --mode=serverless --provider=nowpayments',
    'auth_verify --user=operator@underground.net -> OK',
  ])

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

  return (
    <TerminalAppShell
      mode={shellMode}
      activeNavId={activeNavId}
      activePath={shellMode === 'public' ? '/' : `/${activeNavId}`}
      onNavigate={(_path, item) => {
        if (item) {
          setActiveNavId(item.id)
        }
      }}
      userEmail="operator@underground.net"
      accountStatus="ACTIVE"
      currentPathDisplay={`user@inside-underground:~/${activeNavId}`}
      currentTitle="Terminal UI Design System"
    >
      <div className="space-y-6 max-w-6xl mx-auto">
        {/* Top Control Bar: Mode Switcher & Overview Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 rounded border border-[#1E1E1E] bg-[#070707] p-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Terminal className="h-4 w-4 text-[#00FF66]" />
              <h1 className="text-sm font-semibold tracking-tight text-[#EDEDED]">
                STEP 4: TERMINAL UI DESIGN SYSTEM & APPLICATION SHELLS
              </h1>
            </div>
            <p className="text-xs text-[#808080]">
              macOS Terminal-inspired visual identity built with shadcn/ui primitives, near-black surfaces, and monospace typography.
            </p>
          </div>

          <div className="flex items-center gap-2 self-stretch sm:self-auto">
            <span className="text-xs text-[#737373] hidden sm:inline">LAYOUT:</span>
            <Button
              variant={shellMode === 'authenticated' ? 'default' : 'outline'}
              size="xs"
              onClick={() => setShellMode('authenticated')}
            >
              AUTHENTICATED SHELL
            </Button>
            <Button
              variant={shellMode === 'public' ? 'default' : 'outline'}
              size="xs"
              onClick={() => setShellMode('public')}
            >
              PUBLIC SHELL
            </Button>
          </div>
        </div>

        {/* Section 1: Terminal Window & Live Interactive Shell Demo */}
        <TerminalWindow
          path="operator@inside-underground:~/design-system"
          title="Core Primitives & Prompt"
          statusText="ONLINE"
          footer={
            <div className="flex items-center justify-between">
              <span>BUFFER: UTF-8 // 0 ERRORS</span>
              <span className="text-[#00FF66]">RENDER: REACT 19 + VITE 8</span>
            </div>
          }
        >
          <div className="space-y-4">
            <TerminalPrompt
              user="operator"
              host="inside-underground"
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
          {/* Buttons & Badges */}
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
                  <Button variant="link" size="sm">DOCS LINK &gt;</Button>
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
                  <TerminalStatus status="refunded" />
                </div>
              </div>

              <Separator />

              <div>
                <span className="text-[10px] uppercase text-[#737373] tracking-wider block mb-2">
                  // METADATA CATEGORY BADGES
                </span>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="purple">CRYPTOGRAPHY</Badge>
                  <Badge variant="info">NOWPAYMENTS_IPN</Badge>
                  <Badge variant="default">FIRESTORE_TX</Badge>
                  <Badge variant="warning">GAS_OPTIMIZED</Badge>
                  <Badge variant="outline">SERVERLESS</Badge>
                </div>
              </div>
            </div>
          </TerminalPanel>

          {/* Inputs & Cards */}
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

              <div className="space-y-2 pt-2">
                <span className="text-[10px] uppercase text-[#737373] tracking-wider block">
                  // TERMINAL COMMAND SNIPPET
                </span>
                <TerminalCommand
                  command="npx inside-underground-verify --order=ORD-89421"
                />
              </div>

              <Card className="mt-2">
                <CardHeader className="py-2.5 px-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-xs">
                      <Cpu className="h-3.5 w-3.5 text-[#00FF66]" />
                      <span>SECURE_ENCLAVE_CARD</span>
                    </CardTitle>
                    <TerminalStatus status="live" showDot={true} />
                  </div>
                  <CardDescription className="text-[11px]">
                    Authoritative serverless pricing verification via Cloud Functions.
                  </CardDescription>
                </CardHeader>
                <CardContent className="py-2 px-3 text-xs text-[#A3A3A3]">
                  The browser is never trusted to supply product prices or payment confirmation state.
                </CardContent>
                <CardFooter className="py-2 px-3 text-[11px] justify-between">
                  <span className="text-[#525252]">AUDIT: ENABLED</span>
                  <Button variant="default" size="xs">
                    INSPECT <ArrowRight className="ml-1 h-3 w-3" />
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </TerminalPanel>
        </div>

        {/* Section 3: Terminal Structured Monospace Table */}
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
          <div className="space-y-2">
            <p className="text-xs text-[#808080]">
              Monospace data table with header borders, hover highlighting, and automatic responsive mobile card fallback.
            </p>
            <TerminalTable
              columns={tableColumns}
              data={SAMPLE_PRODUCTS}
              keyExtractor={(item) => item.id}
            />
          </div>
        </TerminalPanel>

        {/* Section 4: Architectural Alignment Status Card */}
        <div className="rounded border border-[#00FF66]/30 bg-[#003B17]/20 p-4 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Layers className="h-4 w-4 text-[#00FF66]" />
              <span className="text-xs font-semibold text-[#00FF66]">
                GOVERNING ARCHITECTURAL COMPLIANCE: CONFIRMED
              </span>
            </div>
            <Badge variant="success">STEP 4 COMPLETED</Badge>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 text-xs">
            <div className="rounded border border-[#1E1E1E] bg-[#070707] p-2.5">
              <span className="text-[10px] text-[#737373] block uppercase">UI Foundation</span>
              <span className="text-[#EDEDED] font-semibold">shadcn/ui + Tailwind</span>
            </div>
            <div className="rounded border border-[#1E1E1E] bg-[#070707] p-2.5">
              <span className="text-[10px] text-[#737373] block uppercase">Primary Color</span>
              <span className="text-[#00FF66] font-semibold">#00FF66 (Terminal Green)</span>
            </div>
            <div className="rounded border border-[#1E1E1E] bg-[#070707] p-2.5">
              <span className="text-[10px] text-[#737373] block uppercase">Typography</span>
              <span className="text-[#EDEDED] font-semibold">JetBrains Mono</span>
            </div>
            <div className="rounded border border-[#1E1E1E] bg-[#070707] p-2.5">
              <span className="text-[10px] text-[#737373] block uppercase">Next Step Ready</span>
              <span className="text-[#0099FF] font-semibold">Step 5: Homepage / Marketing</span>
            </div>
          </div>
        </div>
      </div>
    </TerminalAppShell>
  )
}

export default App