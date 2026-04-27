<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.

# CLAUDE.md — Next.js Project Conventions

> This file defines the rules, patterns, and philosophy for this codebase.
> Claude must read and follow these conventions strictly on every task.

---

## 🗂 Project Structure

```
app/
  api/                        # Route handlers (server-only)
  [locale]/                   # i18n routing root
    layout.tsx
    page.tsx

components/
  ui/                         # Primitive/reusable UI components
  icons/                      # Icon components only

lib/
  hooks/                      # Custom React hooks
  theme/                      # Theme tokens, CSS vars, Tailwind config
  types/                      # Shared TypeScript types/interfaces

public/                       # Static assets
```

---

## ⚙️ Rendering Strategy

### Server-First

- **Default to Server Components** for all components unless interactivity is required.
- Client Components (`"use client"`) must be as small as possible — only what truly needs the browser.
- Never fetch data in `layout.tsx` — it forces all children into dynamic rendering. Use a dedicated data-fetching component instead.

### Static vs Dynamic

- Keep components **static by default**. Extract dynamic/data-fetching parts into a separate child component.
- Use `cache()` from React for deduplicating server-side fetches.
- Use `unstable_cache` / `revalidate` for ISR patterns.

```tsx
// ✅ Good — layout stays static
export default function Layout({ children }) {
  return <Shell>{children}</Shell>;
}

// ✅ Good — data fetching isolated
async function UserGreeting() {
  const user = await getUser(); // cached fetch
  return <p>Hello, {user.name}</p>;
}
```

### Donut Pattern (Server inside Client)

Use the donut pattern to compose Server Components inside Client Components via `children`.

```tsx
// ClientShell.tsx — "use client"
"use client";
export default function ClientShell({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  return <div onClick={() => setOpen(!open)}>{children}</div>;
}

// page.tsx — Server Component
import ClientShell from "@/components/ClientShell";
import ServerData from "@/components/ServerData";

export default function Page() {
  return (
    <ClientShell>
      <ServerData /> {/* stays a Server Component */}
    </ClientShell>
  );
}
```

---

## 🌐 API Routes (`app/api/`)

- All data mutations and sensitive logic live in `app/api/` route handlers.
- Route handlers are the bridge between Client Components and the server.
- Never expose secrets or DB logic inside Client Components.

```ts
// app/api/users/route.ts
import { NextResponse } from "next/server";

/**
 * GET /api/users
 * Returns the list of users from the database.
 */
export async function GET(): Promise<NextResponse> {
  const users = await db.user.findMany();
  return NextResponse.json(users);
}
```

---

## 🔁 Streaming

- Prefer **streaming** over blocking full-page renders.
- Wrap async Server Components in `<Suspense>` with a meaningful fallback.
- Co-locate the skeleton/fallback in the same directory as the component.

```tsx
import { Suspense } from "react";
import { UserList, UserListSkeleton } from "@/components/UserList";

export default function Page() {
  return (
    <Suspense fallback={<UserListSkeleton />}>
      <UserList />
    </Suspense>
  );
}
```

---

## 📦 Component Rules

### File Structure

- One component = one responsibility = one file.
- If multiple related components exist (e.g. `Timeline` + `TimelineSkeleton`), create a directory:

```
components/
  Timeline/
    Timeline.tsx
    TimelineSkeleton.tsx
    index.tsx          ← re-exports both
```

- `index.tsx` only re-exports — no logic.

```ts
// components/Timeline/index.tsx
export { default as Timeline } from "./Timeline";
export { default as TimelineSkeleton } from "./TimelineSkeleton";
```

### Export Convention

```tsx
// ✅ Always default export for components
export default function UserCard({ user }: UserCardProps) { ... }
```

### Props Interface

- Every component that accepts props **must** define a local `interface`.
- Interface lives in the same file as the component.

```tsx
interface UserCardProps {
  user: User;
  onClick?: () => void;
}

export default function UserCard({ user, onClick }: UserCardProps) { ... }
```

### Internal Order

Every component follows this order:

```tsx
export default function MyComponent({ ... }: MyComponentProps) {
  // 1. Hooks (useState, useReducer, useContext, custom hooks...)
  // 2. Effects (useEffect, useLayoutEffect)
  // 3. Helper functions (pure, derived values)
  // 4. Event handlers (handleClick, handleSubmit...)
  // 5. Early returns (loading, error, empty states)
  // 6. Render logic (complex JSX prep, computed elements)
  // 7. return (...)
}
```

---

## 🪝 Hooks

### Use the Right Hook

| Need | Hook |
|---|---|
| Simple toggle/count | `useState` |
| Complex state machine | `useReducer` |
| Subscribe to external store | `useSyncExternalStore` |
| Expensive computation | `useMemo` |
| Stable callback reference | `useCallback` |
| Non-blocking state update | `useTransition` |
| Deferred low-priority render | `useDeferredValue` |
| DOM ref | `useRef` |

- **Avoid `useEffect` for data fetching** — use Server Components or React Query/SWR instead.
- Only use `useEffect` for true side effects: subscriptions, timers, DOM manipulation.

### Custom Hooks

- Live in `lib/hooks/`.
- One hook per file, filename matches hook name: `useAuth.ts`, `useTheme.ts`.
- Must start with `use`.

```ts
// lib/hooks/useDebounce.ts

/**
 * Debounces a value by the specified delay.
 * @param value - The value to debounce.
 * @param delay - Delay in milliseconds.
 * @returns The debounced value.
 */
export function useDebounce<T>(value: T, delay: number): T {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debounced;
}
```

---

## 🔀 Conditional Rendering

Use the **activity pattern** (`&&`) for conditional rendering when the condition qualifies (boolean, not nullable/undefined risk):

```tsx
// ✅
{isLoggedIn && <UserMenu />}

// ✅ For nullable values use ternary or optional chaining guard
{user ? <UserMenu user={user} /> : <LoginButton />}

// ❌ Avoid — can render "0"
{items.length && <List items={items} />}

// ✅ Fix
{items.length > 0 && <List items={items} />}
```

---

## 🟦 TypeScript

- **No `any`** — ever. Use `unknown` and narrow, or define a type.
- Use `type` for unions/primitives, `interface` for objects/props.
- All shared types live in `lib/types/`.
- Co-located prop interfaces stay in the component file.

```ts
// lib/types/user.ts
export interface User {
  id: string;
  name: string;
  email: string;
  role: "admin" | "member" | "guest";
}
```

---

## 📝 Documentation (KDoc-style)

Every exported function, component, hook, and utility **must** have a JSDoc comment.

```tsx
/**
 * Displays a user's profile card with avatar and metadata.
 *
 * @param user - The user object to render.
 * @param onClick - Optional click handler for the card.
 * @returns A styled card component.
 */
export default function UserCard({ user, onClick }: UserCardProps) { ... }
```

---

## 🧱 SOLID & DRY Principles

| Principle | Rule |
|---|---|
| **Single Responsibility** | One file = one job. Split when in doubt. |
| **Open/Closed** | Extend via props/composition, not modification. |
| **Liskov Substitution** | Components accepting `children` should be transparent. |
| **Interface Segregation** | Don't pass props a component doesn't use. |
| **Dependency Inversion** | Pass data/handlers down; don't reach up or sideways. |
| **DRY** | Extract repeated JSX into components, repeated logic into hooks or utils. |

---

## ♻️ Reuse Before Creating

Before creating a new component:
1. Check `components/ui/` for existing primitives.
2. Check `components/` for a composable parent.
3. Check `lib/hooks/` for existing hook logic.
4. Only then create something new.

---

## 🚀 Performance

- Use `next/image` for all images.
- Use `next/font` for all fonts (no external font `<link>`).
- Use `next/link` for all internal navigation.
- Use `cache()` to deduplicate identical server fetches within a request.
- Use `middleware.ts` for auth checks, redirects, locale detection — before the page renders.
- Use `Suspense` boundaries granularly to unblock visible UI as fast as possible.

---

## 🌍 Internationalisation

- All pages live under `app/[locale]/`.
- Never hardcode user-facing strings — use your i18n library (e.g. `next-intl`).

---

## 🗃 Naming Conventions

| Thing | Convention | Example |
|---|---|---|
| Component file | PascalCase | `UserCard.tsx` |
| Hook file | camelCase | `useAuth.ts` |
| Type file | camelCase | `user.ts` |
| API route dir | kebab-case | `app/api/user-profile/` |
| CSS/style file | kebab-case | `user-card.module.css` |
| Constant | SCREAMING_SNAKE | `MAX_RETRIES` |
| Boolean prop | `is`/`has`/`can` prefix | `isLoading`, `hasError` |

---

## 🚫 Anti-Patterns to Avoid

```tsx
// ❌ Fetching in layout
export default async function Layout() {
  const data = await fetchSomething(); // forces all children to dynamic
}

// ❌ God components — one component doing 5 things

// ❌ useEffect for derived state
useEffect(() => { setFullName(`${first} ${last}`) }, [first, last]);
// ✅ Just compute it
const fullName = `${first} ${last}`;

// ❌ any
const handler = (e: any) => { ... }
// ✅
const handler = (e: React.ChangeEvent<HTMLInputElement>) => { ... }

// ❌ Hardcoded strings in JSX
<p>Welcome back, user!</p>
// ✅
<p>{t("welcome")}</p>

// ❌ Missing Suspense on async Server Components
<AsyncComponent />
// ✅
<Suspense fallback={<Skeleton />}><AsyncComponent /></Suspense>
```

---

## ⚡ Performance & UX Hooks

This section defines the standard performance and UX utility hooks for this codebase.
They live in `lib/hooks/` and must be used instead of reimplementing the same logic inline.

---

### `useDebounce` — Delay a rapidly changing value

Use for search inputs, filters, or any value that triggers expensive work on change.

```ts
// lib/hooks/useDebounce.ts

/**
 * Returns a debounced version of the given value.
 * The debounced value only updates after the specified delay has passed
 * without the value changing.
 *
 * @param value - The value to debounce.
 * @param delay - Delay in milliseconds (default: 300).
 * @returns The debounced value.
 *
 * @example
 * const debouncedQuery = useDebounce(searchQuery, 300);
 * // use debouncedQuery to trigger API calls instead of searchQuery
 */
export function useDebounce<T>(value: T, delay: number = 300): T {
  const [debounced, setDebounced] = useState<T>(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debounced;
}
```

---

### `useThrottle` — Rate-limit a rapidly fired value

Use for scroll handlers, resize events, or mouse move tracking.

```ts
// lib/hooks/useThrottle.ts

/**
 * Returns a throttled version of the given value.
 * The value is updated at most once per interval, regardless of how
 * frequently it changes.
 *
 * @param value - The value to throttle.
 * @param interval - Minimum time between updates in milliseconds (default: 200).
 * @returns The throttled value.
 *
 * @example
 * const throttledScroll = useThrottle(scrollY, 100);
 */
export function useThrottle<T>(value: T, interval: number = 200): T {
  const [throttled, setThrottled] = useState<T>(value);
  const lastUpdated = useRef<number>(0);

  useEffect(() => {
    const now = Date.now();
    if (now - lastUpdated.current >= interval) {
      lastUpdated.current = now;
      setThrottled(value);
    } else {
      const timer = setTimeout(() => {
        lastUpdated.current = Date.now();
        setThrottled(value);
      }, interval - (now - lastUpdated.current));
      return () => clearTimeout(timer);
    }
  }, [value, interval]);

  return throttled;
}
```

---

### `useIntersectionObserver` — Detect element visibility

Use for lazy loading, infinite scroll triggers, and scroll-based animations.
Prefer this over scroll event listeners.

```ts
// lib/hooks/useIntersectionObserver.ts

interface UseIntersectionObserverOptions extends IntersectionObserverInit {
  freezeOnceVisible?: boolean;
}

/**
 * Observes whether a DOM element is intersecting with the viewport.
 * Optionally freezes the result once the element becomes visible.
 *
 * @param ref - React ref attached to the target element.
 * @param options - IntersectionObserver options + freezeOnceVisible flag.
 * @returns The latest IntersectionObserverEntry or undefined.
 *
 * @example
 * const ref = useRef<HTMLDivElement>(null);
 * const entry = useIntersectionObserver(ref, { threshold: 0.1 });
 * const isVisible = entry?.isIntersecting ?? false;
 */
export function useIntersectionObserver(
  ref: React.RefObject<Element>,
  options: UseIntersectionObserverOptions = {}
): IntersectionObserverEntry | undefined {
  const { freezeOnceVisible = false, ...observerOptions } = options;
  const [entry, setEntry] = useState<IntersectionObserverEntry>();

  const frozen = entry?.isIntersecting && freezeOnceVisible;

  useEffect(() => {
    const node = ref.current;
    if (!node || frozen) return;

    const observer = new IntersectionObserver(([e]) => setEntry(e), observerOptions);
    observer.observe(node);
    return () => observer.disconnect();
  }, [ref, frozen, JSON.stringify(observerOptions)]);

  return entry;
}
```

---

### `useLocalStorage` — Persistent client state

Use for user preferences, theme choice, dismissed banners — anything that should survive a page refresh.

```ts
// lib/hooks/useLocalStorage.ts

/**
 * Syncs a state value to localStorage, persisting it across sessions.
 * Falls back to initialValue if nothing is stored or parsing fails.
 *
 * @param key - The localStorage key.
 * @param initialValue - Value to use if no stored value is found.
 * @returns A stateful value and a setter, identical to useState.
 *
 * @example
 * const [theme, setTheme] = useLocalStorage<"light" | "dark">("theme", "light");
 */
export function useLocalStorage<T>(key: string, initialValue: T): [T, (value: T) => void] {
  const [stored, setStored] = useState<T>(() => {
    if (typeof window === "undefined") return initialValue;
    try {
      const item = window.localStorage.getItem(key);
      return item ? (JSON.parse(item) as T) : initialValue;
    } catch {
      return initialValue;
    }
  });

  const setValue = useCallback(
    (value: T) => {
      setStored(value);
      if (typeof window !== "undefined") {
        window.localStorage.setItem(key, JSON.stringify(value));
      }
    },
    [key]
  );

  return [stored, setValue];
}
```

---

### `useMediaQuery` — Respond to breakpoints in JS

Use when CSS alone isn't enough — hiding/showing entire component trees, conditional logic based on screen size.

```ts
// lib/hooks/useMediaQuery.ts

/**
 * Returns whether the document currently matches a CSS media query string.
 * Updates reactively when the match state changes.
 *
 * @param query - A valid CSS media query string.
 * @returns True if the query currently matches.
 *
 * @example
 * const isMobile = useMediaQuery("(max-width: 768px)");
 * const prefersReducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)");
 */
export function useMediaQuery(query: string): boolean {
  const getMatches = (): boolean => {
    if (typeof window === "undefined") return false;
    return window.matchMedia(query).matches;
  };

  const [matches, setMatches] = useState<boolean>(getMatches);

  useEffect(() => {
    const mql = window.matchMedia(query);
    const handler = (e: MediaQueryListEvent) => setMatches(e.matches);
    mql.addEventListener("change", handler);
    return () => mql.removeEventListener("change", handler);
  }, [query]);

  return matches;
}
```

---

### `useClickOutside` — Dismiss on outside click

Use for dropdowns, modals, popovers, and context menus.

```ts
// lib/hooks/useClickOutside.ts

/**
 * Fires a callback when a click is detected outside the referenced element.
 * Attach the returned ref to the element you want to monitor.
 *
 * @param handler - Function to call when an outside click occurs.
 * @returns A ref to attach to the target element.
 *
 * @example
 * const ref = useClickOutside<HTMLDivElement>(() => setOpen(false));
 * return <div ref={ref}>...</div>;
 */
export function useClickOutside<T extends HTMLElement>(
  handler: () => void
): React.RefObject<T> {
  const ref = useRef<T>(null);

  useEffect(() => {
    const listener = (event: MouseEvent | TouchEvent) => {
      if (!ref.current || ref.current.contains(event.target as Node)) return;
      handler();
    };

    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);
    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    };
  }, [handler]);

  return ref;
}
```

---

### `usePrevious` — Access the last render's value

Use for comparing old vs new values, animating transitions, or tracking direction of change.

```ts
// lib/hooks/usePrevious.ts

/**
 * Returns the value from the previous render.
 * On the first render, returns undefined.
 *
 * @param value - The value to track.
 * @returns The value as it was in the previous render cycle.
 *
 * @example
 * const prevCount = usePrevious(count);
 * const direction = count > (prevCount ?? 0) ? "up" : "down";
 */
export function usePrevious<T>(value: T): T | undefined {
  const ref = useRef<T>();
  useEffect(() => { ref.current = value; }, [value]);
  return ref.current;
}
```

---

### `useIsFirstRender` — Skip effects on mount

Use when an effect or animation should only fire on updates, not on initial mount.

```ts
// lib/hooks/useIsFirstRender.ts

/**
 * Returns true only on the very first render of a component.
 * Useful for skipping effects or animations on mount.
 *
 * @returns Boolean that is true on the first render only.
 *
 * @example
 * const isFirst = useIsFirstRender();
 * useEffect(() => {
 *   if (isFirst) return;
 *   animateChange();
 * }, [value]);
 */
export function useIsFirstRender(): boolean {
  const isFirst = useRef(true);
  if (isFirst.current) {
    isFirst.current = false;
    return true;
  }
  return false;
}
```

---

### `useOptimistic` (React built-in) — Instant UI feedback

For mutations that should feel instant. Use with Server Actions to update UI before the server responds.

```tsx
// ✅ Show the new state immediately, revert automatically on error
const [optimisticLikes, addOptimisticLike] = useOptimistic(
  likes,
  (current: number) => current + 1
);

async function handleLike() {
  addOptimisticLike(undefined); // instant UI update
  await likePost(postId);       // actual server action
}
```

---

### `useTransition` (React built-in) — Non-blocking updates

For state updates that trigger expensive re-renders (large lists, tab switches, filters).
Keeps the UI responsive by marking updates as non-urgent.

```tsx
const [isPending, startTransition] = useTransition();

function handleTabChange(tab: string) {
  startTransition(() => {
    setActiveTab(tab); // won't block typing or other urgent updates
  });
}

// Use isPending to show a subtle loading indicator without full skeleton
return (
  <div className={isPending ? "opacity-60 transition-opacity" : ""}>
    <TabContent tab={activeTab} />
  </div>
);
```

---

### Hook Selection Guide — Performance & UX

| Scenario | Hook to use |
|---|---|
| Search input → API call | `useDebounce` |
| Scroll / resize event | `useThrottle` |
| Lazy load / infinite scroll | `useIntersectionObserver` |
| User preference / theme | `useLocalStorage` |
| Responsive logic in JS | `useMediaQuery` |
| Close dropdown on outside click | `useClickOutside` |
| Animate value change direction | `usePrevious` |
| Skip effect on mount | `useIsFirstRender` |
| Optimistic mutation UI | `useOptimistic` |
| Expensive non-urgent re-render | `useTransition` |
| Defer low-priority value update | `useDeferredValue` |

---

## ✅ Quick Checklist (before every PR)

- [ ] No `any` types
- [ ] All props have an `interface`
- [ ] Components are default-exported
- [ ] Related component groups have a directory + `index.tsx`
- [ ] No data fetching in `layout.tsx`
- [ ] Async Server Components wrapped in `<Suspense>`
- [ ] Client Components are minimal (`"use client"` boundary is tight)
- [ ] Donut pattern used where Server Components are composed inside Client ones
- [ ] All exported functions have JSDoc
- [ ] Correct hook used (no unnecessary `useEffect`/`useState`)
- [ ] Reused existing components/hooks before creating new ones
- [ ] Search inputs use `useDebounce`, not raw `onChange` → API
- [ ] Scroll/resize listeners use `useThrottle` or `useIntersectionObserver`
- [ ] Optimistic UI uses `useOptimistic` for instant feedback
- [ ] Heavy re-renders wrapped in `useTransition` to keep UI responsive
- [ ] User preferences persisted with `useLocalStorage` not raw `localStorage`
<!-- END:nextjs-agent-rules -->