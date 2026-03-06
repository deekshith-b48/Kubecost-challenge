# Kubecost — Atomity Frontend Challenge

> **Option B (0:45–0:55)** · Multi-Cloud Kubernetes Cost Intelligence Dashboard

A feature-rich, production-quality landing page that showcases a Kubernetes cost management platform — inspired by the Kubecost product demo. Built with Next.js, Framer Motion, TypeScript, and Styled-components.

---

## Live Preview

```bash
npm install && npm run dev
# → http://localhost:3000
```

---

## What Was Built

Six fully interactive sections, each mapping directly to a moment from the challenge video:

| # | Section | Video Moment |
|---|---------|-------------|
| 1 | **Hero** | Kubernetes node network intro + 3 pillars (Cost, Optimize, Alerts) |
| 2 | **Granular Visibility** | Cluster → Namespace → Pod drill-down table |
| 3 | **Infrastructure Resources** | CPU / GPU / RAM / Storage / Network icon grid |
| 4 | **Multi-Cloud Arena** | AWS / Azure / GCP / On-Premise → central dashboard |
| 5 | **Optimization & Savings** | "Up to 70% saved" + usage vs request breakdown |
| 6 | **FinOps Alignment** | Engineering ↔ Finance bridge with live charts |

---

## Feature Highlights

### 🎯 Hero Section
- Animated SVG node-network background representing a Kubernetes cluster
- Gradient headline + animated badge + scroll indicator
- Three pillar cards: Cost Monitoring, Optimization Insights, Smart Alerts

### 🔍 Granular Visibility — Interactive Drill-Down
- **3-level hierarchy**: All Clusters → Cluster A → Namespace A → Pods
- Click any row to navigate deeper; breadcrumb trail maintains context
- Cost table columns: `CPU | RAM | Storage | Network | GPU | Efficiency | Total`
- Colour-coded Efficiency bars (red < 30%, amber < 60%, green ≥ 60%)
- Animated row entrance with staggered transitions

### ⚙️ Infrastructure Resources
- 5 hand-crafted SVG icon cards: CPU, GPU, RAM, Storage, Network
- Provider-specific brand colours with glow-on-hover effects

### ☁️ Multi-Cloud Arena
- CSS Grid layout (left column | center | right column) — cards never overlap
- **SVG supply-flow connection lines** using `strokeDashoffset` animation:
  - Faint dotted baseline track always visible
  - Draw-on highlight animates once (pathLength 0 → 1)
  - Bright dashed "supply" layer loops continuously toward center
  - Glowing endpoint dot pulses at each dashboard edge
- DOM-measured bezier paths via `ResizeObserver` + `getBoundingClientRect()`
- Real provider SVG icons (no emojis): AWS, Azure, Google Cloud, On-Premise rack
- Status pills: OPTIMIZED / WARNING / CRITICAL with pulsing indicators
- Animated `CountUp` for all monetary values
- Bar chart in center dashboard with 6 cost categories
- Click any card → Optimization modal with CPU/Memory usage vs request details

### 💰 Optimization & Savings
- Animated "70% SAVED" hero badge with drop-shadow glow
- Resource usage card: CPU Usage 63M / Request 700M, Memory 557MiB / 5GiB
- 4-category savings breakdown with animated progress bars:
  - Right-size cluster nodes — $230/mo
  - Right-size container requests — $175/mo
  - Remedy abandoned workloads — $110/mo
  - Reserve instances — $98/mo
- Total potential savings: **$613/mo** with `CountUp` animation

### 🤝 FinOps Alignment
- Engineering card: mini savings bar chart + 4 stat boxes
- Finance card: animated SVG area/line spending chart + budget stats
- Bidirectional connector with dotted line + "Shared Visibility" badge
- Closing tagline quote

---

## Animation Philosophy

| Principle | Implementation |
|-----------|---------------|
| **Purposeful** | Every animation communicates something (connection = data flow) |
| **Staggered** | Sequential reveals create narrative (providers connect one-by-one) |
| **Supply metaphor** | `strokeDashoffset` creates travelling dashes that imply data flowing into the dashboard |
| **Scroll-triggered** | `useInView` with `once: true` — fires when user reaches the section |
| **Physics-based** | Spring transitions for card hover lifts and entrance |
| **Accessible** | `prefers-reduced-motion` respected; `aria-hidden` on decorative SVGs |

### Key Animation Techniques
```
strokeDashoffset  → continuous supply-flow on SVG bezier paths
pathLength 0→1    → one-shot draw-on for connection lines
offsetPath        → dot travellers along curve (where supported)
ResizeObserver    → recompute path coordinates on any layout change
requestAnimationFrame → CountUp easeOutQuart number animation
useInView         → scroll-activated staggered card/bar entrance
```

---

## Architecture

### Project Structure
```
src/
├── app/
│   ├── page.tsx                  ← root page, wires all sections
│   ├── layout.tsx                ← metadata, StyledComponentsRegistry
│   └── globals.css               ← CSS design tokens (colors, spacing…)
├── components/
│   ├── NavBar/                   ← sticky translucent navigation
│   ├── HeroSection/              ← node network + 3 pillars
│   ├── GranularSection/          ← 3-level drill-down table
│   ├── ResourcesSection/         ← 5 infra resource icon cards
│   ├── MultiCloudSection/        ← arena grid + connection lines
│   │   ├── MultiCloudSection.tsx
│   │   └── index.ts
│   ├── ConnectionLines/          ← SVG supply-flow animation overlay
│   ├── ProviderCard/             ← individual cloud provider card
│   │   └── ProviderIcons.tsx     ← hand-crafted brand SVG icons
│   ├── CostDashboard/            ← central bar-chart dashboard
│   ├── OptimizationTooltip/      ← savings insights modal
│   ├── SavingsSection/           ← 70% badge + breakdown
│   ├── FinOpsSection/            ← engineering ↔ finance bridge
│   └── ui/
│       └── CountUp.tsx           ← reusable animated counter
├── hooks/
│   └── useCostData.ts            ← TanStack Query data hooks
├── lib/
│   └── api.ts                    ← data fetching + transformation
└── tokens/
    └── index.ts                  ← typed design token constants
```

### Component Pattern
Each component follows a consistent pattern:
- `ComponentName.tsx` — logic + JSX
- `ComponentName.styles.ts(x)` — Styled-components styled elements
- `index.ts` — barrel re-export

### Data Flow
```
JSONPlaceholder API
  → api.ts (fetch + transform)
    → useCostData.ts (TanStack Query, 10 min cache)
      → MultiCloudSection → ProviderCard + CostDashboard
```

---

## Tech Stack

| Layer | Technology | Why |
|-------|-----------|-----|
| Framework | **Next.js 16** (App Router) | SSR, optimised builds, file-based routing |
| Language | **TypeScript** | Full type safety across all props and API shapes |
| Styling | **Styled-components** | Component-scoped styles, CSS variable integration, theming |
| Animation | **Framer Motion** | GPU-accelerated transforms, `useInView`, `pathLength`, spring physics |
| Data | **TanStack Query v5** | Caching, loading/error states, stale-while-revalidate |
| Mock API | **JSONPlaceholder** | Realistic async fetch without a backend |
| Font | **Inter** (Google Fonts) | Variable font; optimal for data-dense UI |

---

## Design Tokens

All visual values live in `globals.css` as CSS custom properties:

```css
/* Colours */
--color-bg-primary        #0A0F1E   (deep navy)
--color-accent-primary    #10B981   (emerald green)
--color-accent-secondary  #4285F4   (Google blue)

/* Provider brand colours */
--color-aws               #FF9900
--color-azure             #0089D6
--color-gcp               #4285F4
--color-on-prem           #8B5CF6

/* Spacing scale: xs → 3xl */
/* Radius scale: sm → full */
/* Shadow scale: sm → xl */
```

---

## Data Fetching

```typescript
// hooks/useCostData.ts
useQuery({
  queryKey: ['cloudProviders'],
  queryFn: fetchCloudData,           // JSONPlaceholder /users
  staleTime: 5 * 60 * 1000,         // 5 min fresh
  gcTime:    10 * 60 * 1000,        // 10 min cache
  refetchOnWindowFocus: false,
})
```

JSONPlaceholder user records are deterministically mapped to realistic cloud provider data (costs, efficiency, CPU/RAM/storage allocations).

---

## Accessibility

- Semantic HTML: `<section>`, `<h1>`, `<h2>`, `<table>`, `<nav>`
- Decorative SVGs marked `aria-hidden="true"`
- Keyboard navigable interactive elements
- Focus-visible ring on all buttons/links
- Colour contrast ≥ 4.5 : 1 for all text
- `prefers-reduced-motion` disables continuous animations

---

## How to Run

```bash
# Install
npm install

# Development (http://localhost:3000)
npm run dev

# Type check + lint
npm run lint

# Production build
npm run build

# Serve production build
npm run start
```

**Node ≥ 22** required (tested on v22.21.1 LTS via NVM).

---

## Browser Support

| Browser | Version |
|---------|---------|
| Chrome  | Latest  |
| Firefox | Latest  |
| Safari  | 16+     |
| Edge    | Latest  |
| iOS Safari | 16+ |
| Chrome Mobile | 110+ |

> `strokeDashoffset` animation and `ResizeObserver` are natively supported in all target browsers. `offsetPath` (used for traveller dots) degrades gracefully in older Safari via feature detection.

---

## Tradeoffs & Decisions

| Decision | Rationale |
|----------|-----------|
| CSS Grid over absolute positioning for arena | Guarantees cards never overlap at any viewport; SVG still measures DOM rects for accurate bezier paths |
| `strokeDashoffset` over `offsetPath` for supply flow | Universal browser support; simpler; looks identical |
| Custom `CountUp` with rAF | Shows understanding of animation primitives without a dependency |
| Styled-components over Tailwind | Dynamic colour props, CSS variable integration, scoped styles |
| Mock API over hardcoded data | Demonstrates real async data lifecycle (loading, error, stale) |

---

*Built for the Atomity Frontend Engineering Challenge · March 2026*
