## SKB Services Frontend

Modern Next.js 14 App Router frontend for the SKB Services platform: public marketing + booking flow, authenticated user area, and admin back‑office.

This document is aimed at **developers** working on the project (setup, architecture, and how to extend it safely).

---

### Tech Stack

- **Framework**: Next.js 14 (App Router, `src/app`)
- **Language**: TypeScript (strict)
- **Styling**: Tailwind CSS, shadcn/ui, Radix UI primitives
- **Data Fetching / State**: TanStack Query (React Query)
- **Forms & Validation**: React Hook Form + Zod
- **Auth**: Firebase Authentication (email/password + Google)
- **HTTP Client**: Axios
- **Tooling**: ESLint, Prettier, Husky + lint-staged

---

### Getting Started

- **Prerequisites**
    - **Node.js**: 18+
    - **Package manager**: `pnpm` (recommended; scripts assume pnpm)

- **Install & run**

```bash
git clone <repository-url>
cd SKB-Service-Client

pnpm install

cp .env.example .env.local
# then edit .env.local with real values

pnpm dev
```

App runs at `http://localhost:3000`.

---

### Environment Configuration

All runtime configuration is driven by `.env.local` (not committed).

```env
# API Base URL
NEXT_PUBLIC_API_BASE_URL=http://localhost:5000

# Firebase Configuration
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

- **API base URL** is consumed by `lib/apiClient.ts`.
- **Firebase config** is consumed by `lib/firebase/client.ts` and the auth provider.

If you add new public env vars, prefix them with `NEXT_PUBLIC_` and document them here.

---

### Project Structure (High Level)

```text
src/
├── app/                 # Next.js App Router segments
│   ├── (public)/        # Public routes (landing, services, auth, inquiry)
│   ├── (user)/          # Authenticated user routes
│   └── (admin)/         # Admin-only routes
├── components/          # Reusable UI & feature components
│   ├── admin/           # Admin-only UI (lists, tables, panels)
│   ├── auth/            # Login/Register flows
│   ├── booking/         # Booking flow UI
│   ├── booking-detail/  # Booking detail page UI
│   ├── bookings/        # Bookings listing + filters
│   ├── common/          # Shared atoms (logo, header, pagination, etc.)
│   ├── dashboard/       # User dashboard components
│   ├── footer/          # Footer & footer links
│   ├── profile/         # Profile form sections
│   ├── services/        # Services listing & cards
│   └── ui/              # shadcn/ui wrappers + generic UI primitives
├── configs/             # Page/feature configuration (columns, filters, etc.)
├── hooks/               # Custom React hooks per domain (bookings, services, auth, etc.)
├── lib/                 # Core utilities & infrastructure
│   ├── firebase/        # Firebase client initialization
│   ├── validations/     # Zod schemas for forms and entities
│   ├── apiClient.ts     # Axios instance + interceptors
│   ├── icons.ts         # Centralized icon exports
│   ├── queryKeys.ts     # TanStack Query key factories
│   └── utils.ts         # Generic helpers
├── providers/           # React context providers (auth, React Query)
├── services/            # API layer (booking, service, user, etc.)
├── styles/              # Global styles (Tailwind)
└── types/               # Shared TypeScript types per domain
```

---

### Routing & Layouts

- **Entry layout**: `src/app/layout.tsx`
- **Public segment**: `src/app/(public)`
    - `page.tsx`: landing page
    - `services/page.tsx`: services listing
    - `services/[id]/page.tsx`: service detail + booking CTA
    - `login/page.tsx`, `register/page.tsx`, `inquiry/page.tsx`
- **User segment**: `src/app/(user)`
    - Protected via auth hooks / `useProtectedRoute`
    - Contains user dashboard, bookings, profile
- **Admin segment**: `src/app/(admin)`
    - Uses `AdminSidebar` and various admin pages (bookings, services, users, inquiries, etc.)

When adding new routes:

- Put **public pages** under `(public)` and **protected pages** under `(user)` or `(admin)`.
- Prefer using existing layout components (e.g. dashboard shells, sidebars) for consistency.

---

### Data Fetching & API Layer

- **Axios client**: `lib/apiClient.ts`
    - Configures base URL from `NEXT_PUBLIC_API_BASE_URL`.
    - Central place for interceptors (auth headers, error handling).

- **Service modules** (API wrappers): `src/services/*`
    - `bookingService.ts`, `serviceService.ts`, `userService.ts`, `subscriptionService.ts`, etc.
    - Each exposes typed functions like `getBookings`, `createBooking`, `getServices`, etc.

- **React Query integration**:
    - Query keys are centralized in `lib/queryKeys.ts`.
    - Domain-specific hooks in `src/hooks` (e.g. `useBookings`, `useAdminBookings`, `useServiceDetail`) compose:
        - the correct query key
        - the matching service function
        - sensible defaults (stale times, enabled flags)

**Recommended pattern for new API features**

1. **Add service function** in `src/services/<domain>Service.ts`.
2. **Add query key** in `lib/queryKeys.ts`.
3. **Expose hook** in `src/hooks/use<Domain>.ts` that uses React Query + service function.
4. Consume that hook in components instead of calling Axios directly.

---

### Authentication & Authorization

- **Firebase client**: `lib/firebase/client.ts`
- **Auth provider**: `providers/AuthProvider.tsx`
    - Wraps the app and exposes the current user + role (user/admin) via context/hooks.
- **Protected routing**:
    - `hooks/useProtectedRoute.ts` enforces redirects for unauthenticated users.
    - Admin routes additionally check for admin role.

**Adding auth-dependent features**

- Use the existing auth hook(s) from `hooks/` to access the current user.
- For server calls, rely on the configured Axios client (auth headers should be set centrally).
- For UI, hide or disable actions if the user lacks the required role.

---

### Forms & Validation

- **Forms** use:
    - `react-hook-form` for state
    - `@hookform/resolvers/zod` for schema-based validation
    - Zod schemas from `lib/validations/*`

- Typical pattern:
    - Define/extend Zod schema in `lib/validations/<domain>.ts`.
    - Use that schema with `useForm` in the relevant component (often in `components/<domain>`).
    - Submit via the corresponding `services/<domain>Service.ts` function, wrapped in a mutation hook from `hooks/`.

When creating a new form:

- Reuse the existing `FormField` and other shared form components where possible.
- Keep validation logic in Zod schemas, not inline inside components.

---

### Styling & UI

- **Tailwind CSS**: Configured via `tailwind.config.ts` and `src/styles/globals.css`.
- **shadcn/ui + Radix UI**:
    - Generic UI primitives in `components/ui`.
    - Feature-specific compositions in `components/<domain>`.
- **Icons**: Centralized exports in `lib/icons.ts` (prefer importing from there).

Guidelines:

- Favor **composition** of existing atoms (buttons, inputs, cards) rather than creating new primitives.
- Keep feature-specific layout/logic in `components/<domain>` and avoid leaking it into `components/ui`.

---

### Scripts & Tooling

```bash
pnpm dev        # Start development server
pnpm build      # Production build
pnpm start      # Run production build
pnpm lint       # Run ESLint
pnpm lint:fix   # ESLint with --fix
pnpm format     # Prettier --write .
pnpm fix        # lint:fix + format
```

- **Husky + lint-staged**:
    - Configured in `package.json` (`prepare` script installs Husky).
    - On commit, staged JS/TS files run `eslint --fix` and `prettier --write`.
    - JSON/Markdown/CSS files are formatted with Prettier.

Before pushing:

- Run `pnpm fix` to ensure linting & formatting pass locally.

---

### Adding a New Feature (Checklist)

- **API**
    - Add endpoint wrapper in `src/services/*`.
    - Add query/mutation keys in `lib/queryKeys.ts` if needed.
- **Types**
    - Update or add types under `src/types/*`.
- **Validation**
    - Add or update Zod schemas in `lib/validations/*`.
- **Hooks**
    - Create/extend domain hooks in `src/hooks/*` to encapsulate data fetching/mutations.
- **UI**
    - Use `components/<domain>` for feature-specific components.
    - Reuse `components/ui` and `components/common` atoms.
- **Routing**
    - Add/update routes in the right app segment: `(public)`, `(user)`, or `(admin)`.

---

### Deployment Notes

- This is a standard **Next.js 14** app; any compatible hosting (Vercel, Node server, container) should work.
- Ensure all required env vars from **Environment Configuration** are set in the target environment.
- Run:

```bash
pnpm install
pnpm build
pnpm start
```

---

### License

Private – All rights reserved. Do not distribute without permission.
