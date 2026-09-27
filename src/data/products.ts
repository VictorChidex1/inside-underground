import { Timestamp } from 'firebase/firestore'
import type { Product } from '@/types'

/**
 * Canonical product catalogue used as the bundled fallback source until the
 * Firestore `products` collection is seeded by the backend. The Firestore
 * documents are expected to carry the same shape (see src/types Product).
 */
export const PRODUCTS: Product[] = [
  {
    id: 'prd-01',
    code: 'SEC-01',
    name: 'Zero-Trace Private VPN & Secure Network Kit',
    slug: 'zero-trace-private-vpn-kit',
    category: 'SECURITY & PRIVACY',
    price: 45,
    currency: 'USDT',
    status: 'active',
    deliveryType: 'instant_download',
    fileSize: '24.8 MB .ZIP',
    description:
      'Set up your own private, unblockable VPN in 5 minutes. Protect your devices with military-grade encryption and zero logging.',
    features: [
      '1-Click automated server deployment scripts',
      'Hardened client configs for macOS, iOS, Android & Windows',
      'Zero-logging architecture with automatic kill-switch',
    ],
    files: [
      { name: '/deploy-wireguard.sh', desc: '1-Click automated server installer' },
      { name: '/client-profiles/', desc: 'Ready-to-import configs for all devices' },
      { name: '/security-hardening.md', desc: 'DNS leak prevention & firewall guide' },
      { name: '/verification.sha256', desc: 'Cryptographic package checksum' },
    ],
    platforms: ['macOS', 'iOS', 'Android', 'Linux', 'Windows'],
    createdAt: Timestamp.now(),
    updatedAt: Timestamp.now(),
  },
  {
    id: 'prd-02',
    code: 'OPS-02',
    name: 'Complete Cloud Infrastructure Blueprint',
    slug: 'complete-cloud-infrastructure-blueprint',
    category: 'DEVOPS & CLOUD',
    price: 89,
    currency: 'USDT',
    status: 'active',
    deliveryType: 'instant_download',
    fileSize: '48.2 MB .ZIP',
    description:
      'Deploy production-grade, secure cloud servers and databases with zero guesswork. Pre-configured with automated firewalls and CI/CD.',
    features: [
      'Modular Terraform templates for AWS, GCP & Cloudflare',
      'Automated VPC peering & isolated private subnets',
      'Pre-built GitHub Actions CI/CD deployment pipelines',
    ],
    files: [
      { name: '/terraform/modules/', desc: 'VPC, isolated subnets, IAM, K8s' },
      { name: '/ci-cd/deploy-pipeline.yml', desc: 'Zero-touch deployment automation' },
      { name: '/architecture-diagram.pdf', desc: 'Visual cloud topology map' },
      { name: '/security-baseline.tf', desc: 'Automated firewall & zero-trust rules' },
    ],
    platforms: ['AWS', 'GCP', 'Cloudflare', 'Terraform CLI'],
    createdAt: Timestamp.now(),
    updatedAt: Timestamp.now(),
  },
  {
    id: 'prd-03',
    code: 'CRY-03',
    name: 'Crypto Cold Storage & Vault Security Protocol',
    slug: 'crypto-cold-storage-vault-protocol',
    category: 'WEB3 & CRYPTO',
    price: 59,
    currency: 'USDT',
    status: 'active',
    deliveryType: 'instant_download',
    fileSize: '18.5 MB .ZIP',
    description:
      'Protect your cryptocurrency private keys and sensitive seed backups from hackers and hardware failure using multi-key vault protocols.',
    features: [
      'Open-source 3-of-5 threshold Shamir secret sharing tools',
      'Air-gapped offline signing machine manual',
      'Emergency inheritance & disaster recovery contingency plan',
    ],
    files: [
      { name: '/shamir-split.py', desc: 'Offline air-gapped key splitter script' },
      { name: '/vault-recovery-protocol.md', desc: 'Step-by-step restoration manual' },
      { name: '/cold-storage-setup.pdf', desc: 'Hardware isolation instructions' },
      { name: '/emergency-contingency.txt', desc: 'Dual-custody executor template' },
    ],
    platforms: ['Python 3', 'Linux', 'macOS', 'Offline Pen-Drive'],
    createdAt: Timestamp.now(),
    updatedAt: Timestamp.now(),
  },
  {
    id: 'prd-04',
    code: 'AUD-04',
    name: 'API Security & Vulnerability Scanner Suite',
    slug: 'api-security-vulnerability-scanner',
    category: 'SECURITY AUDITING',
    price: 49,
    currency: 'USDT',
    status: 'active',
    deliveryType: 'instant_download',
    fileSize: '31.4 MB .ZIP',
    description:
      'Automated security scanner to identify API vulnerabilities, unauthorized data leaks, webhook forgery, and authentication flaws.',
    features: [
      'Automated API attack-surface vulnerability scanner',
      '40-Point production security & hardening checklist',
      'Webhook signature replay & forgery detection scripts',
    ],
    files: [
      { name: '/scanner/api-audit-runner.sh', desc: 'Automated CLI vulnerability scanner' },
      { name: '/checklists/40-point-audit.pdf', desc: 'Production security checklist' },
      { name: '/signatures/hmac-suite.js', desc: 'Webhook signature validation tests' },
      { name: '/remediation-guide.md', desc: 'Instant vulnerability fix handbook' },
    ],
    platforms: ['Node.js', 'Bash', 'Docker', 'Curl'],
    createdAt: Timestamp.now(),
    updatedAt: Timestamp.now(),
  },
]