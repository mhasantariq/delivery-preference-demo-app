# Delivery Preference Application

A Next.js application that simulates a delivery preference flow with authentication, form handling, state management, theme switching, and a polished UX.

## Tech Stack

- **Next.js 16** (App Router)
- **TypeScript**
- **React Hook Form** – Form handling and validation
- **Zod** – Schema validation
- **Zustand** – Global state management with persistence
- **Tailwind CSS v4** – Styling (class-based dark mode)
- **shadcn/ui** – Reusable UI components built on Radix UI
- **next-themes** – Theme management (Light, Dark, System)
- **Framer Motion** – Page and content animations
- **Lucide React** – Icons
- **Storybook** – Component development and documentation

## Features

- Login page with email/password validation and mock credentials
- Delivery preference flow with conditional fields (In-Store, Delivery, Curbside)
- Summary page with reusable calendar–time display and clear primary/secondary actions
- Route protection via Next.js **proxy** (formerly middleware)
- State persistence with Zustand and localStorage
- **Theme switcher** – Light, Dark, and System (persisted, no flash)
- **Dark mode** – Class-based; all pages and components support it
- **Custom date & time pickers** – Widget-style calendar and time list (viewport-safe, fixed size)
- **Loaders** – Route-level loading states and button loading on submit
- **Animations** – Minimal Framer Motion (page transition, staggered summary)
- Step indicator, icons, and illustrations across the flow
- Reusable UI library
- **Storybook** – Component library with interactive stories and documentation

## Project Structure

### `/app`
Next.js App Router directory containing all pages and layouts.

- **`layout.tsx`** – Root layout with next-theme ThemeProvider, ThemeSwitcher, and DeliveryBackground component. Sets up fonts, metadata, and global structure.
- **`page.tsx`** – Home page with welcome message and "Get Started" button that navigates to login.
- **`loading.tsx`** – Root-level loading UI shown during page transitions.
- **`error.tsx`** – Global error boundary component for handling runtime errors.
- **`not-found.tsx`** – Custom 404 page for unmatched routes.

#### `/app/login`
- **`page.tsx`** – Login form with email/password validation. Uses mock credentials (test@test.com / password123).
- **`loading.tsx`** – Loading state for login page.

#### `/app/preference`
- **`page.tsx`** – Delivery preference form with three options (In-Store, Delivery, Curbside). Conditional fields based on selection. Uses custom DatePickerWidget and TimePickerWidget.
- **`loading.tsx`** – Loading state for preference page.

#### `/app/summary`
- **`page.tsx`** – Summary page displaying user email, delivery preference, and selected details. Shows CalendarTimeCard for date/time display. Includes logout and edit preferences actions.
- **`loading.tsx`** – Loading state for summary page.

### `/components`
Reusable React components organized by purpose.

#### `/components/ui`
Core UI component library with consistent styling and dark mode support.

- **`Button.tsx`** – Button component with variants (primary, secondary, outline, ghost), sizes, optional icon, and loading state.
- **`Input.tsx`** – Text input with optional leading icon, label, and error message support.
- **`Select.tsx`** – Dropdown select component with label and error handling.
- **`RadioGroup.tsx`** – Radio button group with optional icons per option, label, and error support.
- **`Card.tsx`** – Container component with default and outlined variants.
- **`StepIndicator.tsx`** – Step progress indicator showing current step in the flow (Preferences → Summary).
- **`Loader.tsx`** – Spinning loader component with size variants.
- **`DatePickerWidget.tsx`** – Custom date picker with calendar popover (viewport-safe, portal-based).
- **`TimePickerWidget.tsx`** – Custom time picker with scrollable time list popover (viewport-safe, portal-based).
- **`CalendarTimeCard.tsx`** – Reusable component for displaying date and time in a calendar-style card format.
- **`index.ts`** – Barrel export for all UI components.

#### `/components/theme`
Theme management system using **next-themes** for light/dark/system mode switching.

- **`theme-provider.tsx`** – Wrapper around next-themes ThemeProvider for managing theme state and applying dark class to `<html>` element.
- **`theme-switcher.tsx`** – UI component using shadcn Popover and Button for selecting theme (Light, Dark, System) with icons.
- **`index.ts`** – Barrel export for theme components.

#### `/components/animations`
Framer Motion animation wrappers for consistent page transitions.

- **`PageTransition.tsx`** – Provides `PageTransition`, `StaggerContainer`, and `StaggerItem` components for fade-in and staggered animations.

#### `/components/illustrations`
SVG illustration components for visual enhancement.

- **`DeliveryHero.tsx`** – Hero illustration for the home page.
- **`WelcomeAuth.tsx`** – Illustration for the login page.
- **`SummarySuccess.tsx`** – Success illustration for the summary page.
- **`DeliveryBackground.tsx`** – Responsive background image component with light/dark variants, displayed on all pages.

### `/lib`
Shared utilities and business logic.

#### `/lib/store`
Zustand stores for global state management with localStorage persistence.

- **`auth-store.ts`** – Authentication state (isAuthenticated, email). Also syncs to cookie for server-side proxy access.
- **`preference-store.ts`** – Delivery preference state (method, address, dates, times, car color). Persisted to localStorage.

#### `/lib/hooks`
Custom React hooks for reusable logic.

- **`use-require-auth.ts`** – Hook that redirects unauthenticated users to login page. Used in protected pages alongside server-side proxy protection.


#### `/lib`
- **`utils.ts`** – General utilities including `cn` function for className merging (clsx + tailwind-merge).

### Root Files

- **`proxy.ts`** – Next.js proxy function for server-side route protection. Checks authentication cookie and redirects unauthenticated users from `/preference` and `/summary` to `/login`.
- **`next.config.ts`** – Next.js configuration.
- **`tsconfig.json`** – TypeScript configuration.
- **`postcss.config.mjs`** – PostCSS configuration for Tailwind CSS.
- **`eslint.config.mjs`** – ESLint configuration with Next.js presets.
- **`package.json`** – Project dependencies and scripts.
- **`.gitignore`** – Git ignore patterns.

### Storybook

The project includes Storybook for component development and documentation:

- **Configuration** – Located in `.storybook/` directory with Next.js Vite integration
- **Stories** – Component stories in `components/ui/*.stories.tsx` for interactive component testing
- **Addons** – Includes accessibility testing, documentation, and Vitest integration
- **Run Storybook** – `npm run storybook` (runs on port 6006)
- **Build Storybook** – `npm run build-storybook` for static export


## Getting Started

### Prerequisites

- Node.js 18+
- npm, yarn, pnpm, or bun

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/mhasantariq/delivery-preference-demo-app.git
   cd demo-project
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Usage

### Login

- Go to `/login`.
- Mock credentials: **Email** `test@test.com`, **Password** `password123`.
- On success you are redirected to `/preference`.

### Delivery Preferences

1. Choose a delivery method (In-Store, Delivery, or Curbside).
2. For **Delivery**: address plus date/time (custom date and time widgets).
3. For **Curbside**: car color plus date/time (same widgets).
4. Date/time must be in the future. Click **Continue** to go to the summary.

### Summary

- Review account and delivery details; date/time shown in a calendar-style card.
- **Edit Preferences** is the primary action; **Log out** (red, top-right) clears state and returns home.

### Theme

- Use the theme control (top-right) to switch between **Light**, **Dark**, and **System**. Choice is persisted and applied without a flash on load.

## Route Protection

The app uses the Next.js **proxy** (`proxy.ts`):

- `/preference` and `/summary` require authentication (redirect to `/login` if not signed in).
- `/login` redirects to `/preference` when already authenticated.

## State Management

Zustand stores with persistence:

- **Auth store** – Signed-in state and email (and cookie for proxy).
- **Preference store** – Delivery method and form data (address, dates, times, car color).

Theme management is handled by **next-themes** (persisted automatically).

## UI Components

Built with **shadcn/ui** (Radix UI + Tailwind CSS) for accessibility and consistency:

- **Button** – Variants (default, destructive, outline, secondary, ghost, link), sizes, optional icon, loading state.
- **Input** – Optional leading icon, label, error support.
- **Card** – Container with Header, Title, Description, Content, Footer subcomponents.
- **Select** – Accessible dropdown with Radix UI primitives.
- **RadioGroup** – Custom wrapper supporting icons and descriptions per option.
- **Calendar** – Date picker using react-day-picker.
- **Popover** – Portal-based popover for date/time pickers and theme switcher.
- **Tooltip** – Accessible tooltips for informative elements.
- **StepIndicator** – Progress indicator styled with theme variables.
- **Loader** – Spinning loader with theme-aware colors.
- **DatePickerWidget** – Calendar widget using shadcn Calendar and Popover (viewport-safe).
- **TimePickerWidget** – Time selection widget using shadcn Popover (viewport-safe).
- **CalendarTimeCard** – Reusable date+time display for summary page.

## Tech Choices

- **Zustand** – Lightweight global state and persistence without Redux boilerplate.
- **React Hook Form + Zod** – Performant, type-safe forms and validation.
- **Next.js proxy** – Server-side route protection (replaces deprecated middleware).
- **next-themes** – Theme management with system preference detection, no flash on load.
- **shadcn/ui** – Accessible, customizable UI components built on Radix UI primitives.
- **Tailwind CSS v4** – Utility-first styling with CSS variables for theme-aware components.
- **Framer Motion** – Lightweight page and stagger animations.

## Build for Production

```bash
npm run build
npm start
```

## License

This project is for demonstration purposes.
