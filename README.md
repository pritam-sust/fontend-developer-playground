# Discount Hub – Frontend & Accessibility Playground

An enterprise-grade, accessible web application demonstrating senior frontend architecture principles, modern React.js (18+), Next.js (App Router), Redux Toolkit (RTK), TypeScript, SCSS/CSS3, Bootstrap 5, isolated jQuery DOM integration, and rigorous WAI-ARIA 1.2 / WCAG 2.1 compliance.

---

## 1. Project Overview

**Discount Hub** is an interactive playground designed to showcase production-grade frontend engineering, technical precision, and comprehensive web accessibility. Rather than overwhelming the user with unnecessary business complexity, each feature serves as a clean, self-contained demonstration of core frontend technologies, state management patterns, and assistive technology integrations.

### Key Capabilities Demonstrated:
- **Strict WCAG 2.1 AA/AAA Compliance**: Focus trapping, keyboard accessibility, focus restoration, polite & assertive live regions, accessible names, and semantic HTML5.
- **Modern State Architecture**: Redux Toolkit slices (`modal`, `alert`, `discount`, `announcement`), typed hooks (`useAppSelector`, `useAppDispatch`), and real-time state synchronization.
- **Custom React Hooks**: Modular hooks for focus containment (`useFocusTrap`), focus return (`useFocusReturn`), keyboard shortcuts (`useEscapeKey`), clipboard copying with live announcements (`useCopyToClipboard`), and announcements (`useAnnounce`).
- **Safe Legacy Library Quarantine**: Demonstrates the Senior Architect approach to safely integrating legacy jQuery DOM manipulations alongside React's Virtual DOM using scoped refs and lifecycle cleanup.
- **Modular SCSS & Bootstrap**: High-contrast focus indicators (`:focus-visible`), design tokens, and fluid responsive layouts.

---

## 2. Technology Stack

| Technology | Role & Senior Implementation Details |
|---|---|
| **React.js 18** | Functional components, custom hooks, strict mode compliance, refs for focus management, clean component lifecycles. |
| **Next.js 14** | Application framework utilizing App Router (`app/layout.tsx`, `app/page.tsx`), static optimization, and zero hydration mismatch. |
| **Redux Toolkit** | Centralized predictable state management using slices, reducers, typed selectors, and actions. |
| **TypeScript** | Strict type safety for data models, UI component props, and Redux store state. |
| **JavaScript (ES6+)** | Destructuring, spread/rest operators, template literals, async/await, optional chaining, dynamic imports. |
| **HTML5 & Semantic Structure** | `<header>`, `<main>`, `<section>`, `<article>`, `<nav>`, `<footer>`, `<button>`, `<dialog>` semantics, and Skip Navigation links. |
| **SCSS & Bootstrap 5** | Responsive grid, design tokens (`styles/variables.scss`), mixins (`styles/mixins.scss`), component styles, and high-contrast focus rings. |
| **jQuery 4.0** | Quarantined integration via React `useRef`, demonstrating DOM manipulation and clean memory disposal without Virtual DOM collisions. |

---

## 3. Project Structure

```plaintext
discount-hub-a11y-playground/
├── app/
│   ├── layout.tsx              # Root HTML5 layout, Skip-to-content link, metadata
│   ├── page.tsx                # Main dashboard orchestrating all demo features
│   └── providers.tsx           # Client Provider wrapper (Redux store & LiveRegionAnnouncer)
├── components/
│   ├── common/
│   │   ├── Badge.tsx           # Semantic status badge
│   │   ├── Button.tsx          # Accessible polymorphic button with loading states
│   │   ├── Card.tsx            # Standard demonstration card wrapper
│   │   └── Icon.tsx            # Accessible SVG icons (aria-hidden="true", focusable="false")
│   ├── dialog/
│   │   ├── AlertDialog.tsx     # Urgent confirmation dialog (role="alertdialog", focus on Cancel)
│   │   └── Modal.tsx           # Standard modal dialog (role="dialog", focus trap, Esc to close)
│   └── live/
│       └── LiveRegionAnnouncer.tsx # Persistent DOM live regions for polite & assertive announcements
├── features/
│   ├── discount/
│   │   ├── DiscountRevealCard.tsx    # Feature 1: Reveal Discounts trigger & modal
│   │   └── DiscountModalContent.tsx  # Discount voucher list & clipboard actions
│   ├── alert/
│   │   └── AlertDialogDemoCard.tsx   # Feature 2: Destructive action alert dialog
│   ├── live-region/
│   │   └── LiveRegionDemoCard.tsx    # Feature 3: Live region controls & speech simulator
│   ├── hidden-content/
│   │   └── HiddenContentDemoCard.tsx # Feature 4: Decorative vs informative aria-hidden demo
│   ├── redux-state/
│   │   └── ReduxStateInspectorCard.tsx # Feature 5: Real-time Redux state tree inspector
│   ├── jquery/
│   │   └── JQueryDemoCard.tsx        # Feature 6: Quarantined jQuery DOM manipulation
│   └── a11y-matrix/
│       └── A11yMatrixCard.tsx        # Full ARIA & WCAG 2.1 compliance matrix
├── hooks/
│   ├── useAnnounce.ts          # Hook for dispatching polite/assertive screen reader messages
│   ├── useCopyToClipboard.ts   # Clipboard API with fallback and polite announcement
│   ├── useEscapeKey.ts         # Window-level Escape key event listener
│   ├── useFocusReturn.ts       # Captures activeElement and restores focus upon modal close
│   └── useFocusTrap.ts         # WCAG 2.1.2 keyboard focus loop within active dialog
├── store/
│   ├── slices/
│   │   ├── alertSlice.ts       # Alert dialog open/close state and payloads
│   │   ├── announcementSlice.ts# Live region messages and historical log queue
│   │   ├── discountSlice.ts    # Discount list, applied vouchers, copy stats
│   │   └── modalSlice.ts       # Discount reveal modal open/close state
│   ├── hooks.ts                # Typed useAppDispatch & useAppSelector
│   └── index.ts                # Redux Toolkit configureStore
├── styles/
│   ├── components.scss         # Card, dialog backdrop, and widget styles
│   ├── globals.scss            # Bootstrap imports, global accessible focus rings
│   ├── mixins.scss             # Focus indicator and visually-hidden mixins
│   └── variables.scss          # WCAG-compliant design tokens & color contrast values
├── types/
│   ├── alert.ts                # Alert dialog types and payload interfaces
│   ├── announcement.ts         # Live announcement types and logs
│   ├── discount.ts             # Discount voucher entities
│   └── modal.ts                # Modal dialog state models
├── utils/
│   └── a11y.ts                 # Unique ID generator and DOM accessibility helpers
├── next.config.js              # Next.js configuration and module resolution
├── package.json                # Project dependencies and build scripts
├── tsconfig.json               # TypeScript compiler configuration
└── README.md                   # Comprehensive project documentation
```

---

## 4. Getting Started

### Prerequisites
- Node.js: `v18.17.0` or later (tested on Node v20+ and v24)
- npm: `v9.0.0` or later

### Installation
Clone or navigate to the repository directory and install dependencies:

```bash
npm install
```

### Running the Development Server
```bash
npm run dev
```

Open your browser at `http://localhost:3000` to interact with the application.

### Building for Production
```bash
npm run build
npm run start
```

---

## 5. Architectural Features & Technical Implementation

### Feature 1: Discount Reveal Component (`role="dialog"`)
- **Trigger**: Button with explicit `aria-label="Reveal Discounts"`, `aria-haspopup="dialog"`, and `aria-expanded`.
- **Keyboard Trapping**: The custom `useFocusTrap` hook intercepts `Tab` and `Shift+Tab`, cycling focus exclusively through interactive elements inside the modal.
- **Focus Restoration**: The custom `useFocusReturn` hook captures `document.activeElement` when opened and immediately returns focus to the trigger button when closed.
- **Dismissibility**: Pressing `Escape` or clicking the semi-transparent backdrop dismisses the dialog.
- **Background Interaction**: While open, background interactions are disabled via the modal backdrop and focus trap.

### Feature 2: Alert Dialog (`role="alertdialog"`)
- **Urgent Action**: Demands user confirmation before revoking all active discount vouchers and clearing session states.
- **Initial Focus Safety**: Per WAI-ARIA guidelines, initial focus inside an `alertdialog` is intentionally placed on the **Cancel** button rather than the destructive **Confirm** action, preventing accidental activation by keyboard users pressing Space or Enter.
- **Semantic Linkage**: The dialog container is linked to its heading via `aria-labelledby` and its explanatory warning via `aria-describedby`.

### Feature 3: Live Region Demonstration (`aria-live`)
- **Polite Announcements (`aria-live="polite"`)**: Triggered for non-urgent feedback (e.g. copying a discount code to the clipboard). The screen reader waits until the user pauses navigation before speaking.
- **Assertive Announcements (`aria-live="assertive"`)**: Triggered for critical events (e.g. coupon expiration alerts or voucher revocations). Interrupts current speech immediately.
- **DOM Persistence**: Live regions are permanently mounted into the DOM inside `LiveRegionAnnouncer` rather than dynamically injected. Injecting `aria-live` containers dynamically at the moment of speech can cause assistive tools like VoiceOver or NVDA to drop announcements.
- **Visual Log Simulator**: Provides sighted engineers and auditors a real-time speech log showing the exact message and timestamps dispatched to assistive technology.

### Feature 4: Hidden Content Demonstration (`aria-hidden`)
- **Decorative Elements**: Decorative SVG icons use `aria-hidden="true"` and `focusable="false"` to prevent screen readers from announcing superfluous &ldquo;graphic, unlabelled image&rdquo; elements.
- **Accessible Text Replacement**: Uses the `.visually-hidden-custom` CSS class (clip-path/rect technique) to provide rich textual context for screen readers while presenting clean icon-only designs to sighted users.
- **Interactive Safeguard**: Clearly illustrates why interactive elements (`<button>`, `<a>`, `<input>`) must **never** receive `aria-hidden="true"`, preventing the anti-pattern of keyboard-focusable elements that remain invisible to assistive technology.
- **A11y Inspector Mode**: An interactive toggle lets developers switch between the **Sighted User View** and the **Screen Reader Perception View** to audit accessibility trees in real time.

### Feature 5: Redux State Management (Redux Toolkit)
- **Centralized Store**: Built with `configureStore` and modular slices (`modalSlice`, `alertSlice`, `announcementSlice`, `discountSlice`).
- **Type-Safe Hooks**: Custom `useAppDispatch` and `useAppSelector` hooks provide typed access to `RootState` and `AppDispatch`.
- **Reactive State Inspector**: A real-time dashboard widget displaying slice states, action sequences, applied voucher counts, and an expandable JSON view of the entire store state.

### Feature 6: Isolated jQuery Demonstration
- **Virtual DOM Quarantine**: Legacy libraries like jQuery assume full control of DOM manipulation. If jQuery mutates a DOM tree managed by React, React's reconciliation engine will throw runtime DOM hierarchy errors.
- **Architectural Solution**:
  1. A dedicated container ref (`containerRef = useRef<HTMLDivElement>(null)`) is established.
  2. jQuery is dynamically imported in `useEffect` on the client.
  3. All jQuery queries are strictly scoped inside the container (`$root = $(containerRef.current)`), never against `document` or global selectors.
  4. jQuery operations demonstrate `slideToggle()` and `toggleClass()` with live counter feedback.
  5. On component unmount, `useEffect` cleanly unbinds all listeners (`$toggleBtn.off('click')`), eliminating memory leaks.

---

## 6. Accessibility (WAI-ARIA & WCAG 2.1) Compliance Table

| WAI-ARIA Attribute / Role | Purpose Demonstrated in Project | Implementation Location |
|---|---|---|
| `aria-label="Reveal Discounts"` | Provides clear, unambiguous accessible name to the modal trigger. | `features/discount/DiscountRevealCard.tsx` |
| `aria-modal="true"` | Informs assistive software that background content is non-interactive. | `components/dialog/Modal.tsx` & `AlertDialog.tsx` |
| `role="dialog"` | Identifies standard promotional modal dialog window. | `components/dialog/Modal.tsx` |
| `role="alertdialog"` | Identifies urgent confirmation prompt requiring user intervention. | `components/dialog/AlertDialog.tsx` |
| `aria-labelledby` | Associates dialog containers with their visible title headings. | `components/dialog/Modal.tsx` & `AlertDialog.tsx` |
| `aria-describedby` | Associates alert dialogs with their detailed description/warning. | `components/dialog/AlertDialog.tsx` |
| `aria-live="polite"` | Queues non-disruptive feedback (code copied, filter changed). | `components/live/LiveRegionAnnouncer.tsx` |
| `aria-live="assertive"` | Interrupts speech synthesizer for urgent alerts (voucher reset). | `components/live/LiveRegionAnnouncer.tsx` |
| `aria-hidden="true"` | Hides decorative SVG icons and modal backdrops from screen readers. | `components/common/Icon.tsx`, Feature 4 |
| `focusable="false"` | Prevents legacy Internet Explorer/Edge from tabbing into SVGs. | `components/common/Icon.tsx` |
| `:focus-visible` | High-contrast focus rings (3px solid #2563eb, 2px offset). | `styles/globals.scss`, `mixins.scss` |
| Skip Navigation Link | Allows keyboard users to bypass header blocks to `#main-content`. | `app/layout.tsx` (WCAG 2.4.1) |

---

## 7. Professional Coding Standards Followed

1. **Clean Separation of Concerns**: Slices handle state, custom hooks handle browser behaviors, components handle presentation, and utilities handle helper logic.
2. **Zero Memory Leaks**: Event listeners attached to `window` or jQuery containers are strictly unregistered in `useEffect` cleanup returns.
3. **No Deprecated React APIs**: Fully compatible with React 18 strict mode and modern React Concurrent features.
4. **Resilient Clipboard API**: Uses `navigator.clipboard.writeText` with graceful textarea fallback for legacy or headless browser environments.
5. **Native HTML Semantics First**: ARIA is applied to augment semantics, never to replace accessible native HTML elements (`<button>`, `<header>`, `<main>`, `<article>`).

---

## 8. License

MIT License. Designed and authored as a Senior Frontend Architecture and Web Accessibility demonstration.

