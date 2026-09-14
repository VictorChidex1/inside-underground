# Project Overview: Inside Underground - Serverless Digital Products Marketplace

## 1. Project Summary for Inside Underground

The Inside Underground is a premium, secure, serverless digital-products marketplace built completely from scratch.

The platform allows visitors to discover digital products, create an account, purchase products using cryptocurrency through NOWPayments, and receive access only after the backend has independently verified and finalized the payment.

The platform is intentionally designed around a sophisticated macOS Terminal-inspired interface. The terminal aesthetic is the product's visual identity, while the underlying application remains a conventional, intuitive and responsive modern web application.

Inside Underground must feel technical, private, minimal and premium without becoming a gimmicky cyberpunk or fake-hacker website.

The architecture is designed to eliminate unnecessary traditional server infrastructure by using React/Vite on the frontend and Firebase Cloud Functions as the Node.js serverless backend.

---

## 2. Core Product Philosophy

The platform follows four fundamental principles:

1. Security
2. Server-side business logic
3. Reliable payment verification
4. Clean and intuitive user experience

The browser is never the authority for business-critical operations.

React is responsible for presenting application state and collecting user input.

Firebase Cloud Functions are responsible for server-side business logic.

NOWPayments is responsible for cryptocurrency payment processing.

Firestore records the authoritative application state.

The core mental model is:

> NOWPayments tells us WHAT HAPPENED.
> Firebase Cloud Functions decide WHAT IT MEANS.
> Firestore records WHAT WE BELIEVE.
> React displays WHAT THE USER CAN DO.

---

## 3. Core MVP Features

### 1. Public Marketplace

A polished public-facing homepage where unauthenticated visitors can:

- Understand what Inside Underground is
- Browse featured digital products
- Learn how the platform works
- Read about the platform
- Understand the payment process
- Review FAQs
- Contact support
- Navigate to registration and login

The homepage should function as both the marketing/landing experience and the primary entry point into the marketplace.

---

### 2. Digital Product Marketplace

Users can:

- Browse products
- Search products
- Filter products by category
- View product details
- View pricing
- View product availability
- Initiate purchases

Product information is stored in Firestore.

The frontend must never be treated as the authoritative source for product pricing.

When creating an order, the backend must retrieve the authoritative product price from Firestore.

---

### 3. Firebase Authentication

Users can:

- Register
- Login
- Logout
- Reset passwords

Firebase Authentication handles authentication.

A corresponding user profile is stored in Firestore.

New accounts initially have:

accountStatus = "pending_payment"

An account becomes active only after the payment architecture successfully verifies and finalizes the required payment.

The frontend must never manually change accountStatus from pending_payment to active.

---

### 4. Cryptocurrency Payment System

Inside Underground uses NOWPayments for cryptocurrency payment processing.

The selected checkout architecture uses NOWPayments hosted invoices.

The flow is:

React
↓
Firebase Cloud Function
↓
NOWPayments Invoice API
↓
invoice_url
↓
React redirects user
↓
NOWPayments Hosted Checkout
↓
Customer pays
↓
NOWPayments processes payment
↓
NOWPayments IPN
↓
Firebase Cloud Function
↓
IPN signature verification
↓
Independent NOWPayments payment verification
↓
Firestore transaction
↓
Payment/order/account state updated
↓
Access granted

The browser redirect is only a user-experience mechanism.

It is NOT proof of payment.

---

### 5. Payment Verification & Security

Payment activation requires multiple independent checks.

The backend must verify:

- Valid NOWPayments IPN signature
- Valid payment ID
- Valid order correlation
- Valid user correlation
- Correct expected amount
- Correct payment asset/currency
- Correct provider payment status
- Payment has not already been fulfilled
- Valid payment/order relationship
- Successful Firestore transaction

The final activation gate is:

NOWPayments status = finished

- Valid IPN signature
- Independent provider verification
- Valid order
- Valid user
- Sufficient payment
- Valid asset
- Not already fulfilled
- # Successful Firestore transaction

  ACCOUNT ACTIVE

  ***

## 4. Payment State Architecture

Inside Underground maintains three related state systems.

### A. User Account State

Possible states:

- pending_payment
- active
- suspended
- disabled

---

### B. Order State

Possible states:

- pending_payment
- payment_processing
- paid
- payment_underpaid
- payment_failed
- payment_expired
- refunded
- cancelled

---

### C. Payment State

Each payment stores both:

- providerStatus
- internalStatus

NOWPayments provider statuses include:

- waiting
- confirming
- confirmed
- sending
- partially_paid
- finished
- failed
- refunded
- expired

The application maps provider states into its own internal business states.

Important:

"finished" from NOWPayments means the provider considers the payment finished. Inside Underground must still perform its own validation before activating an account or granting access.

---

## 5. Payment Audit Trail

Payment state and payment history must be separated.

The payment document represents:

> What is true now.

The paymentEvents collection represents:

> What happened over time.

Every important payment notification/status transition should be recorded.

The audit trail exists for:

- Debugging failed payments
- Investigating duplicate webhooks
- Investigating invalid webhook signatures
- Reconstructing payment history
- Payment dispute investigation
- Operational monitoring
- Recovery after backend failures
- Financial reconciliation
- Security investigation

Repeated NOWPayments IPNs must be safely handled.

The payment processing logic must be idempotent.

Receiving the same webhook multiple times must never activate an account multiple times or create duplicate entitlements.

---

## 6. Entitlements

An entitlement represents the user's verified permission to access a purchased digital product.

Example:

User purchases Product A.

After successful payment verification:

User
↓
Order paid
↓
Payment completed
↓
Entitlement active
↓
Product access granted

Entitlements allow Inside Underground to scale beyond simple account activation.

A user may eventually own multiple products while maintaining one account.

An entitlement may contain:

- userId
- productId
- orderId
- status
- grantedAt
- expiresAt

For the initial MVP, account activation and product entitlement may be closely related, but the architecture should keep the concepts separate so the marketplace can grow.

---

## 7. Firestore Collections

Core collections:

users
products
orders
payments
paymentEvents
entitlements

### users

Example:

interface UserProfile {
uid: string;
email: string;
username: string;
role: "customer" | "admin";
accountStatus: "pending_payment" | "active" | "suspended" | "disabled";
createdAt: Timestamp;
updatedAt: Timestamp;
activatedAt?: Timestamp;
}

---

### products

Example:

interface Product {
id: string;
name: string;
slug: string;
description: string;
category: string;
price: number;
currency: string;
status: "active" | "inactive";
deliveryType: string;
createdAt: Timestamp;
updatedAt: Timestamp;
}

The frontend must never be trusted to supply the authoritative product price during checkout.

---

### orders

Example:

interface Order {
id: string;
userId: string;
productId: string;
amount: number;
currency: string;
status:
| "pending_payment"
| "payment_processing"
| "paid"
| "payment_underpaid"
| "payment_failed"
| "payment_expired"
| "refunded"
| "cancelled";
createdAt: Timestamp;
updatedAt: Timestamp;
paidAt?: Timestamp;
}

---

### payments

Example:

interface Payment {
id: string;
userId: string;
orderId: string;

provider: "nowpayments";

nowpaymentsPaymentId?: string;
nowpaymentsInvoiceId?: string;

providerStatus: string;
internalStatus: string;

priceAmount: number;
priceCurrency: string;

payCurrency?: string;
payAmount?: number;
actuallyPaid?: number;

payAddress?: string;
parentPaymentId?: string;

outcomeAmount?: number;
outcomeCurrency?: string;

createdAt: Timestamp;
updatedAt: Timestamp;
completedAt?: Timestamp;
}

---

### paymentEvents

Example:

interface PaymentEvent {
id: string;
paymentId: string;
orderId: string;
userId: string;

provider: "nowpayments";

providerStatus: string;
previousProviderStatus?: string;
internalStatus: string;

eventType: "payment_status_changed";

signatureValid: boolean;

receivedAt: Timestamp;
processedAt?: Timestamp;

processingResult?: string;

payload: Record<string, unknown>;
}

Sensitive secrets must NEVER be stored in paymentEvents.

Never store:

- NOWPayments API key
- NOWPayments IPN secret
- Firebase service account credentials
- Private keys
- Other application secrets

---

### entitlements

Example:

interface Entitlement {
id: string;
userId: string;
productId: string;
orderId: string;
status: "active" | "revoked" | "expired";
grantedAt: Timestamp;
expiresAt?: Timestamp;
}

---

## 8. Public Route Map

### /

Homepage

Public landing/marketing experience.

Sections include:

- Public navigation
- Hero
- Featured Products
- How It Works
- About
- Security / Trust
- FAQ
- Contact
- Call To Action
- Footer

The homepage should allow visitors to understand the platform without registering.

---

### /browse

Browse Products

Displays:

- Product search
- Category filters
- Product list/grid
- Pricing
- Availability
- Product details links

---

### /product/:productId

Product Details

Displays complete information about a selected product.

Includes:

- Name
- Description
- Category
- Price
- Format
- Delivery/access information
- What's included
- Purchase CTA

---

### /register

Registration

Creates:

1. Firebase Authentication account
2. Firestore user profile

Initial account status:

pending_payment

---

### /login

Login

Uses Firebase Authentication.

---

### /checkout/:orderId

Checkout/payment preparation screen.

Displays:

- Product
- Amount
- Currency
- Payment method
- Current payment status

The backend creates the NOWPayments hosted invoice.

React receives the invoice URL and redirects the user.

React does not determine payment completion.

---

### /account

Authenticated Account Dashboard.

Displays:

- Account information
- Account status
- Purchases
- Payment history
- Product access
- Entitlements
- Account settings

---

### /support

Support and Help Center.

Includes:

- FAQ
- Payment troubleshooting
- Account troubleshooting
- Contact support
- Payment status explanations

---

## 9. Utility Routes

Additional routes:

/forgot-password
/reset-password
/terms
/privacy

Optional payment status routes:

/payment/pending
/payment/success
/payment/failed

These routes must remain consistent with the main terminal-inspired design system.

---

## 10. UI/UX & Branding Guidelines

The entire application should use a sophisticated macOS Terminal-inspired visual system.

The design must NOT look like a generic cyberpunk template.

### Core aesthetic

- Near-black background
- Monospace typography
- Thin borders
- Terminal windows
- macOS traffic-light controls
- Terminal prompts
- Command-inspired labels
- Structured information
- Minimal visual noise
- Subtle animations
- Technical interface language

### Primary background

#050505

### Secondary surfaces

#0A0A0A
#0D0D0D

### Primary accent

#00FF66

### Status colors

Green = success / active / available

Blue = information / links / actions

Yellow = pending / warning

Red = error / failed / destructive

Purple = categories / metadata

Colors must communicate meaning rather than simply decorate the interface.

---

## 11. Terminal UI System

Create reusable terminal components.

Suggested components:

TerminalShell
TerminalHeader
TerminalPrompt
TerminalPanel
TerminalTable
TerminalStatus
TerminalCursor
TerminalCommand
TerminalWindow

Example:

┌──────────────────────────────────────────────┐
│ ● ● ● user@inside-underground:~/browse │
├──────────────────────────────────────────────┤
│ │
│ CONTENT │
│ │
└──────────────────────────────────────────────┘

The interface should LOOK like a terminal.

Users should NOT be required to type terminal commands to perform normal actions.

Buttons remain normal buttons.

Links remain normal links.

Forms remain normal forms.

The terminal language is the visual and branding layer.

---

## 12. Public vs Authenticated Experience

### Unauthenticated

Primary navigation:

Home
Products
About
How It Works
FAQ
Contact
Login
Register

### Authenticated

Application navigation:

Home
Browse
My Purchases
Account
Payment
Support
Logout

Authenticated-only functionality must never be exposed as publicly accessible business functionality.

---

## 13. Responsive Design

The interface must work across:

- Desktop
- Tablet
- Mobile

Desktop authenticated pages may use:

- Persistent terminal sidebar
- Main terminal workspace

Mobile should use:

- Compact header
- Mobile navigation
- Responsive panels
- Stacked product cards
- Responsive tables
- Comfortable touch targets

Never force wide desktop tables onto mobile screens.

---

## 14. Frontend Architecture

Suggested structure:

src/
├── assets/
├── components/
│ ├── ui/
│ ├── terminal/
│ ├── navigation/
│ ├── marketing/
│ ├── products/
│ ├── payment/
│ └── account/
│
├── hooks/
│ ├── useAuth.ts
│ ├── useProducts.ts
│ ├── usePayment.ts
│ └── useAccount.ts
│
├── pages/
│ ├── Home.tsx
│ ├── Browse.tsx
│ ├── ProductDetails.tsx
│ ├── Register.tsx
│ ├── Login.tsx
│ ├── Checkout.tsx
│ ├── Account.tsx
│ ├── Support.tsx
│ ├── ForgotPassword.tsx
│ ├── ResetPassword.tsx
│ ├── Terms.tsx
│ └── Privacy.tsx
│
├── services/
│ ├── firebase.ts
│ ├── auth.ts
│ └── api.ts
│
├── types/
│ └── index.ts
│
├── utils/
│
├── App.tsx
├── main.tsx
└── index.css

Backend:

functions/
├── src/
│ ├── payments/
│ │ ├── createInvoice.ts
│ │ ├── nowpaymentsIpn.ts
│ │ ├── verifyPayment.ts
│ │ └── paymentHelpers.ts
│ │
│ ├── orders/
│ ├── users/
│ └── index.ts
│
└── package.json

The exact structure may be adjusted only with explicit developer approval.

---

## 15. Serverless Architecture

Frontend:

React + Vite + TypeScript + Tailwind CSS + shadcn/ui

Backend:

Firebase Cloud Functions powered by Node.js

Database:

Cloud Firestore

Authentication:

Firebase Authentication

Payment:

NOWPayments

Hosting:

Firebase Hosting

Preview/staging:

Vercel

Vercel must NOT be used as the production backend.

The production backend remains Firebase Cloud Functions.

---

## 16. Critical Payment Architecture

The payment architecture is:

React
↓
Firebase Cloud Function
↓
Create NOWPayments hosted invoice
↓
NOWPayments invoice URL
↓
React redirects customer
↓
Customer pays
↓
NOWPayments processes payment
↓
NOWPayments sends IPN
↓
Firebase Cloud Function receives IPN
↓
Verify x-nowpayments-sig
↓
Reject invalid webhook
↓
Retrieve payment from NOWPayments API
↓
Independently verify payment
↓
Validate order/user/amount/asset
↓
Check idempotency
↓
Firestore transaction
↓
Update payment
↓
Update order
↓
Create/activate entitlement
↓
Activate account where applicable
↓
React reads updated state

The browser may close, lose internet connection or remain completely offline after payment initiation.

Payment processing must NOT depend on React remaining open.

---

## 17. Failure Handling

The application must safely handle:

- User closes browser
- User loses internet connection
- Browser crashes
- NOWPayments takes time to confirm payment
- Duplicate IPNs
- Invalid IPNs
- Failed payments
- Expired payments
- Partially paid payments
- Refunded payments
- Cloud Function processing failures
- Users abandoning checkout
- Users returning later
- Payment completed while the browser is closed

The backend remains the source of truth.

---

## 18. Security Rules

The frontend must never be trusted to modify:

- accountStatus
- order.status
- payment status
- entitlement status
- paymentEvents
- payment completion
- payment amounts

Critical mutations must occur server-side.

NOWPayments API credentials and IPN secrets must remain server-side and must never be exposed to React.

Firestore security rules must prevent unauthorized clients from directly manipulating payment/account state.

---

## 19. Execution Roadmap

The AI assistant must execute the project incrementally.

### Step 1

Audit the existing repository and identify the current React/Vite/TypeScript/Firebase structure.

### Step 2

Confirm and scaffold the required TypeScript/Vite/Tailwind/shadcn/ui architecture.

### Step 3

Establish Firebase Authentication and Firestore foundations.

### Step 4

Establish the shadcn/ui component foundation,
customize the design tokens, and implement the core
terminal UI design system and application shells.

### Step 5

Build the public homepage and marketing sections.

### Step 6

Build the browse and product details experience.

### Step 7

Build registration and authentication flows.

### Step 8

Build order creation and checkout preparation UI.

### Step 9

Implement Firebase Cloud Functions for NOWPayments invoice creation.

### Step 10

Implement NOWPayments IPN signature verification.

### Step 11

Implement independent payment verification and payment state mapping.

### Step 12

Implement Firestore transaction-based payment finalization and idempotency.

### Step 13

Implement payment events/audit trail.

### Step 14

Implement account activation and entitlement handling.

### Step 15

Build authenticated account, purchases and payment history interfaces.

### Step 16

Build support/help experience.

### Step 17

Implement complete responsive behavior and accessibility.

### Step 18

Perform security review, type checking, linting and production build validation.

### Step 19

Deploy preview/staging through Vercel.

### Step 20

Deploy production frontend and Cloud Functions through Firebase.

The AI must never skip ahead without developer approval.

---

## 20. Final Engineering Principle

Inside Underground is a serverless application.

The system must not become dependent on a traditional Express server, VPS or manually managed backend server.

The intended architecture is:

React/Vite

- Firebase
- Cloud Functions
- Firestore
- Firebase Auth
- NOWPayments

The platform should remain scalable, maintainable and secure while minimizing infrastructure management.

The final product should feel like:

> A premium digital marketplace accessed through a beautifully designed terminal interface.

Not a fake hacker website.

Not a command-line toy.

Not a generic SaaS dashboard.

The terminal aesthetic is the identity.

The underlying engineering must remain professional.
