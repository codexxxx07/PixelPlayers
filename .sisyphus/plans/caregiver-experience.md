# Plan — Pixel Players Caregiver Experience

Status: PLAN ONLY — no implementation until approved.
Constraint: the existing Elder experience is the base product and must remain visually and functionally unchanged.

---

## 1. Current architecture (as inspected)

### Tech stack
- Vite 8 + React 19, React Router v7 (`BrowserRouter` in `src/main.jsx`), Tailwind CSS v4, `motion`
- Clerk: `@clerk/react` v6.15.2 (single `ClerkProvider` in `src/components/ClerkProviderWithRouter.jsx`, router-integrated, `signInFallbackRedirectUrl="/dashboard"`, `afterSignOutUrl="/"`)
- i18next with 14 locale files (`en.json` ~911 lines; others translated; `fallbackLng: 'en'`)
- Theme: `ThemeContext` (class-based dark mode, localStorage preference only — not auth)
- No backend, no database, no tests. `src/services/api.js` contains only date/id helpers. All domain data (memories, routine, reminders, games, progress, support network, activity log, settings) lives in `src/context/AppContext.jsx` as in-memory React state.

### Authentication today
- `ProtectedRoute` (`src/components/ProtectedRoute.jsx`) checks only Clerk `useAuth().isSignedIn`; optional `feature` prop shows `FeaturePreview` to signed-out users.
- `Login.jsx` / `Signup.jsx` wrap Clerk `<SignIn>` / `<SignUp>`; default redirect `/dashboard` or `location.state.from`.
- **No roles, no metadata, no permission model anywhere.** No `publicMetadata`/`unsafeMetadata`/`roles` usage exists.
- Auth state is never stored in localStorage (only theme + language are).

### Routing today
- All routes in `App.jsx` (`AppRoutes`): public (`/`, `/about`, `/features`, `/games`, `/games/:id`), protected group (`/dashboard`, `/progress`, `/support`, `/settings`), feature-gated groups (`/routine`, `/memory`, `/reminders`, `/assistant`), `/login`, `/signup`, `*` → `NotFound`.
- Global chrome: `Navbar` + `Footer` + `ClaraLauncher` rendered for **every** route in `App()`.
- Lazy-loaded pages with `RouteSkeleton` suspense fallback; skeleton registry maps exact paths (`SkeletonRegistry.jsx`), defaulting to `DefaultPageSkeleton`.
- Vercel SPA rewrite present (`vercel.json`).

### Design system
- Tokens in `src/index.css` (`@theme`: warm palette, teal primary, `--font-pixel` "Press Start 2P", `--font-body` Nunito; semantic `--pp-*` surface tokens; `.dark` palette remap).
- Shared components: `PixelCard`, `PixelButton`, `ProgressCard`, `RoutineCard`, skeuo button/card classes, skeleton system.
- Elder UI patterns: emoji icons, pixel-font section titles, warm cream surfaces, generous touch targets.

---

## 2. Role representation (Phase 2 + 9 + 14)

**Canonical role:** stored on the real Clerk user object as metadata:

```
role: 'elder' | 'caregiver'
```

**Read precedence** (in `src/auth/role.js` + `useRole()` hook):
1. `user.publicMetadata.role` — authoritative (set later via Clerk Dashboard / Backend API).
2. `user.unsafeMetadata.role` — client-claimed staging value (persisted server-side on the Clerk user, survives refresh, tied to the real account).

**Write paths (real Clerk, no localStorage, no fake booleans):**
- **Sign-up:** role chosen on the new `/welcome` screen is carried in router state to `/signup`, passed as `<SignUp unsafeMetadata={{ role }} />` — Clerk writes it onto the newly created user.
- **Sign-in / existing users without a role:** `/welcome` (also used as role-claim screen) calls `user.update({ unsafeMetadata: { role } })` — an authenticated Clerk client update of the actual user record.
- **Long-term (documented backend work):** a Clerk webhook / Backend API job promotes `unsafeMetadata.role` → `publicMetadata.role`, and server-side enforcement validates role + elder links on every API call. Route guards already read the canonical field first, so promotion requires zero frontend change.

**Role helpers** (`src/auth/role.js`):
- `ROLES = { ELDER: 'elder', CAREGIVER: 'caregiver' }`
- `getRole(user)` → `'elder' | 'caregiver' | null`
- `getHomeForRole(role)` → `/dashboard` | `/caregiver/dashboard`
- `useRole()` hook wrapping `useUser()`.

This is a real authenticated role/profile mechanism on the Clerk user object — not a frontend-only switch, not localStorage.

---

## 3. Elder / Caregiver access separation (Phase 9)

Extend `ProtectedRoute` with an optional `role` prop — **backward compatible** (default `role = null` behaves exactly as today for the feature-gate/signed-out paths):

```
ProtectedRoute({ feature, role })
  not loaded        → PageLoader (unchanged)
  signed out        → feature preview or /login with `from` (unchanged)
  signed in:
    role === null   → <Outlet/> (unchanged legacy behavior)
    role set:
      user role none    → /welcome  (one-time role claim, keeps `from`)
      user role ≠ needed → redirect to getHomeForRole(userRole)  ← blocks cross-role URL access
      match             → <Outlet/>
```

- **Elder-only routes** get `role="elder"`: `/dashboard`, `/progress`, `/support`, `/settings`, `/routine`, `/memory`, `/reminders`, `/assistant`.
- **Caregiver-only routes** (`role="caregiver"`): everything under `/caregiver/*`.
- **Stay public:** `/`, `/about`, `/features`, `/games`, `/games/:id`, `/login`, `/signup`, `/welcome`.
- Direct URL access, refresh, and deep links are all guarded — navigation hiding is never the only control.

**Chrome separation:** `App()` uses `useLocation()`; paths starting with `/caregiver` render `CaregiverShell` (own sidebar/topbar/footer, no elder `Navbar`, no `ClaraLauncher`); all other paths render the **existing** shell markup byte-for-byte (Navbar, Footer, ClaraLauncher, ClickSpark unchanged).

---

## 4. Elder ↔ Caregiver linking (Phase 8)

No backend relationship model exists → build a clean abstraction now:

**Interface** — `src/services/care/links.js`:
```
getAuthorizedElders(caregiverId)      → ElderSummary[]
getAuthorizedCaregivers(elderId)      → CaregiverSummary[]
hasLink(caregiverId, elderId)         → boolean
requestLink(...), approveLink(...), revokeLink(...)   // future-ready API surface
```

**Prototype adapter:** in-memory link graph held in `CareContext`, seeded with one demo elder (`elder-demo`) linked to the signed-in caregiver's Clerk user id. `CareProvider` wraps only the caregiver shell — an unlinked caregiver sees an explicit "No linked elder — connection pending" empty state, never another user's data.

**Rule enforced in code:** every caregiver data service takes `elderId` and calls `hasLink(currentCaregiverId, elderId)` first (simulating the server-side authz check that a real backend must perform). No link → no data.

Data model shape (future-friendly):
```
Caregiver { caregiverId (Clerk id), profile, linkedElderIds[] }
Elder     { elderId, profile, linkedCaregiverIds[] }
```

---

## 5. Data architecture (Phase 10) — shared domain, two UIs

**Principle:** one source of truth per domain; the Elder UI keeps consuming it exactly as today via `useApp()`; caregiver services are pure functions over the same state, plus additive shared-state keys where no domain exists yet (announcements).

| Domain | Source of truth | Caregiver service | Elder UI impact |
|---|---|---|---|
| Routine | `AppContext.routine` | `services/care/routine.js` (read, % complete) | none |
| Meals | routine items `routine-breakfast/lunch/dinner` (+ `Snacks` if added) | `services/care/meals.js` — status = completed / pending / missed (time-based), mark via existing `updateRoutine`/`toggleRoutine` | none (shared store) |
| Medicines | `AppContext.reminders` where `type === 'medication'` | `services/care/medicines.js` — schedule view, taken/missed/pending via existing reminder actions | none (shared store) |
| Reminders (full CRUD) | `AppContext.reminders` | caregiver page calls existing `addReminder/deleteReminder/toggleReminder` | none (shared store) |
| Activities / progress | `progressData`, `activityLog`, `GAMES` | `services/care/activity.js`, `services/care/streak.js` (pure derivations) | none |
| Daily update | derived | `services/care/dailyUpdate.js` — builds ✓/⚠ list from meals + medicines + routine + activity + reminders | none |
| Announcements | **new** `AppContext.announcements` (additive) | `services/care/messaging.js` — `send/list/markRead`; adapter writes through AppContext actions | additive: `AnnouncementsBanner` on Elder Dashboard (renders `null` when empty → zero visual change by default) |
| Orders | **new** `CareContext.orders` (caregiver-scoped) | `services/care/orders.js` — cart → review → confirm → status; `OrderService` interface with clearly-labeled demo adapter | none |
| Links | `CareContext` link graph | `services/care/links.js` | none |

Messaging honesty: UI states "Syncs when the elder next opens Pixel Players" — no real-time claim. Orders honesty: UI states "Demo workflow — no real purchase is made"; confirmation step is mandatory.

Medical honesty: medicines UI carries the existing-style disclaimer — track and remind only, no diagnosis/treatment claims; language stays "Cognitive Activity / Game Activity", never "dementia score".

---

## 6. Routes (Phase 15)

```
/welcome                         role chooser / role claim (public, works signed-in or out)
/caregiver                       → redirect /caregiver/dashboard   (role: caregiver)
/caregiver/dashboard             Care Overview dashboard
/caregiver/elder                 Full Elder Status page
/caregiver/meals                 Meal tracking
/caregiver/medicines             Medicine tracking
/caregiver/routine               Elder routine (read + manage)
/caregiver/reminders             Reminder CRUD
/caregiver/activities            Cognitive/game activity + streak
/caregiver/messages              Messages / announcements
/caregiver/orders                Ordering (medicine + groceries)
/caregiver/settings              Caregiver settings (+ switch experience)
```
All existing routes unchanged in path and behavior for elders. `*` → existing `NotFound` (still catches unmatched caregiver paths). Lazy-loaded like existing pages.

---

## 7. Caregiver experience design (Phase 4, 5, 6, 7, 12, 13)

**Shell:** desktop left sidebar (collapsible) + top bar (Pixel Players brand, elder switcher chip, theme lamp, Clerk `UserButton`); mobile: hamburger → slide-in nav (pattern borrowed from existing Navbar behavior but newly built, not reused). Footer: compact caregiver footer (no elder footer links).

**Navigation:** Overview · Elder Status · Meals · Medicines · Routine · Reminders · Activities · Messages · Orders · Settings.

**Visual direction (`src/caregiver/caregiver.css`, imported once by shell — `index.css` untouched):**
- Same brand: teal primary, Press Start 2P accents, Nunito body, pixel corner accents, subtle 2px tactile borders + soft drop shadows.
- Calm professional palette: slate-tinted surfaces (`--cg-surface`, `--cg-panel`, `--cg-line`), strong hierarchy, dense-but-readable cards, status badges (emerald = completed, amber = pending/attention, rose = missed/alert) with text labels (not color-only, for accessibility).
- Light + dark via `--cg-*` tokens with `.dark` overrides; no glassmorphism, no neon, no clinical gray, no childish styling.
- Responsive: CSS Grid dashboard `1 → 2 → 3/4 columns` at 320/375/414/768/1024/1280+; all tables become stacked cards on mobile; `min-width: 0`, `overflow-wrap` guards, no fixed widths.

**Dashboard (`/caregiver/dashboard`) sections:** Care Overview (elder profile + overall status pill) · Today's Routine progress + Meal status + Medicine status (metric tiles) · Today's Update (✓/⚠ timeline) · Game Streak card · Upcoming Reminders · Important Alerts · Recent Activity.

**Feature pages:** as mapped in §5 (meals with Completed/Pending/Missed + record action; medicines with schedule table + taken/missed/pending + manage actions + disclaimer; reminders full CRUD writing the shared store; activities with games played/accuracy/response/streak framed as "Cognitive Activity"; messages composer + thread; orders 4-step stepper Select → Review → Confirm → Status).

**Shared caregiver components:** `CareCard`, `StatusBadge`, `MetricTile`, `CarePageHeader`, `CareSectionTitle`, `EmptyState`, `ElderProfileCard`, `ConfirmDialog`, `ElderSwitcher`.

**Skeletons:** add `/welcome` → `SkeletonAuth`; `/caregiver/*` covered by existing `DefaultPageSkeleton` fallback (optionally register explicit entries — low risk, additive).

---

## 8. How the Elder experience stays untouched (Phase 3)

Modified existing files are **additive and backward-compatible only**:

| File | Change | Why Elder UI unchanged |
|---|---|---|
| `src/App.jsx` | + `/welcome` route, + `/caregiver/*` route group, conditional shell selection | existing route tree & Elder shell markup identical; caregiver shell only on `/caregiver/*` |
| `src/components/ProtectedRoute.jsx` | + optional `role` prop | default path identical; role checks run only when signed in |
| `src/pages/Login.jsx` | reads optional `state.role` (display chip / subtitle) | visual default unchanged when no role in state |
| `src/pages/Signup.jsx` | passes `unsafeMetadata={{ role }}` when `state.role` present | no visual change |
| `src/context/AppContext.jsx` | + `announcements[]`, `addAnnouncement`, `dismissAnnouncement` (additive state + actions) | all existing state/actions untouched |
| `src/pages/Dashboard.jsx` | + `<AnnouncementsBanner />` (one import, one line) | component returns `null` when no announcements → pixel-identical default |
| `src/i18n/locales/en.json` | + `role.*`, `caregiver.*`, `announcements.*` keys | purely additive; other locales fall back to `en` |
| `src/components/Skeleton/SkeletonRegistry.jsx` | + optional path entries | additive |

Not modified at all: `Navbar`, `Footer`, `ThemeContext`, all other Elder pages, `ClerkProviderWithRouter`, `index.css`, games, memory, routine, reminders, assistant, progress, support, SOS, settings (elder), i18n non-English locales.

---

## 9. File inventory

### Files to modify (8)
1. `src/App.jsx` — routes + shell switch
2. `src/components/ProtectedRoute.jsx` — `role` prop
3. `src/pages/Login.jsx` — role-aware state handling
4. `src/pages/Signup.jsx` — `unsafeMetadata` role pass-through
5. `src/context/AppContext.jsx` — announcements (additive)
6. `src/pages/Dashboard.jsx` — announcements banner (additive, 1 line)
7. `src/i18n/locales/en.json` — new key namespaces (additive)
8. `src/components/Skeleton/SkeletonRegistry.jsx` — optional new entries

### Files to create (~32)
**Auth / role**
- `src/auth/roles.js` — constants, `getRole`, `getHomeForRole`
- `src/auth/useRole.js` — hook + `claimRole(user, role)` (calls `user.update({ unsafeMetadata })`)

**Entry**
- `src/pages/Welcome.jsx` — "How would you like to continue?" role chooser (Pixel Players design language)

**Caregiver shell & UI kit**
- `src/caregiver/CaregiverShell.jsx`
- `src/caregiver/CareSidebar.jsx`
- `src/caregiver/CareTopBar.jsx`
- `src/caregiver/caregiver.css`
- `src/caregiver/components/CareCard.jsx`, `StatusBadge.jsx`, `MetricTile.jsx`, `CarePageHeader.jsx`, `CareSectionTitle.jsx`, `EmptyState.jsx`, `ElderProfileCard.jsx`, `ConfirmDialog.jsx`, `ElderSwitcher.jsx`, `index.js`

**Caregiver pages** (`src/pages/caregiver/`)
- `CareDashboard.jsx`, `ElderStatus.jsx`, `Meals.jsx`, `Medicines.jsx`, `CareRoutine.jsx`, `CareReminders.jsx`, `Activities.jsx`, `Messages.jsx`, `Orders.jsx`, `CareSettings.jsx`

**Context**
- `src/context/CareContext.jsx` — selectedElderId, link graph, orders (caregiver-scoped)

**Services (shared domain layer)**
- `src/services/care/links.js`
- `src/services/care/meals.js`
- `src/services/care/medicines.js`
- `src/services/care/routine.js`
- `src/services/care/activity.js`
- `src/services/care/streak.js`
- `src/services/care/dailyUpdate.js`
- `src/services/care/messaging.js`
- `src/services/care/orders.js`

**Elder-side additive**
- `src/components/AnnouncementsBanner.jsx`

---

## 10. Navigation flow (Phase 2 end-to-end)

```
/  (public) → Log In → /login → Clerk SignIn → fallback /dashboard
                                   ├─ role=elder      → Elder dashboard ✓
                                   ├─ role=caregiver  → guard redirects /caregiver/dashboard ✓
                                   └─ role=none       → /welcome (claim) → /dashboard or /caregiver/dashboard

/welcome → pick Elder      → (signed out) /login or /signup with state.role='elder'
                            → (signed in)  claimRole('elder') → /dashboard
/welcome → pick Caregiver  → (signed out) /login or /signup with state.role='caregiver'
                            → (signed in)  claimRole('caregiver') → /caregiver/dashboard

Logout (Clerk UserButton) → afterSignOutUrl '/' (unchanged)
```

No duplicate Clerk provider, no competing redirects, no fake login state.

---

## 11. Backend / API / Clerk / DB work still required (documented, out of prototype scope)

1. **Role promotion:** Clerk webhook or Backend API script moving `unsafeMetadata.role` → `publicMetadata.role`; optionally restrict who may claim `caregiver`.
2. **Server-side authorization:** every real API must verify Clerk session role **and** caregiver↔elder link (client guards are UX, not security).
3. **Persistent data store** (e.g., Postgres/Firebase) for routine, meals, medicines, reminders, activity, announcements, orders — today everything is per-browser-session React state.
4. **Link management flow:** real invite/approve between two Clerk accounts (current adapter is demo-only).
5. **Messaging delivery:** push/notification channel or polling; current model is "reads shared store on next open".
6. **Ordering integration:** real pharmacy/grocery API behind `OrderService`; demo adapter never performs transactions.
7. **Clerk config:** none strictly required to start (publicMetadata readable by default; client `user.update` for unsafeMetadata enabled by default). Optional hardening: restrict metadata writes via Clerk dashboard settings.

---

## 12. Risks & edge cases

| Risk | Mitigation |
|---|---|
| Existing signed-in users have no role → suddenly gated | one-time redirect to `/welcome` role claim; `from` preserved; writes real Clerk metadata |
| `user.update` failing (network/permissions) | show inline error on Welcome, allow retry; never fall back to localStorage |
| Cross-role URL probing | `ProtectedRoute role` redirects mismatched roles to their home; signed-out → `/login` with `from` |
| Elder UI regression | modified files are additive-only; AnnouncementsBanner returns null when empty; verification checklist (below) |
| Two accounts sharing data in one browser session | Clerk allows one signed-in user at a time; link graph is per-user; demo elder dataset clearly a prototype seam |
| i18n: new keys only in `en.json` | `fallbackLng: 'en'` covers 13 locales; documented limitation |
| Missed-status false positives (time-based) | 60-min grace window after scheduled time before "Missed"; purely display-level |
| Sensitive data in URLs | elder id passed via React state/context only, never query strings |
| Dark mode caregiver CSS conflicts | caregiver tokens scoped under `.cg-scope` + `.dark` overrides; `index.css` untouched |
| 320px overflow | stacked-card layouts, `min-w-0`, no fixed widths, tested at spec breakpoints |

---

## 13. Verification plan (post-implementation)

Automated: `npm run lint`, `npm run build` (must pass).

Manual matrix (from spec):
1. Login as Elder → existing Elder experience intact (home, features, games, memory, routine, reminders, Clara, progress, support, SOS, settings, nav, theme).
2. Login as Caregiver → `/caregiver/dashboard`; elder-only routes redirect away; caregiver routes unreachable for elder role; direct URLs + refresh protected.
3. Caregiver sees only linked (demo) elder data; unlinked state shows empty state.
4. Meals / medicines / reminders CRUD reflected in shared store; game activity + streak render; daily update renders; messages appear on Elder dashboard banner; order workflow runs select → review → confirm → status with demo disclaimer.
5. Logout → `/`; login again → correct role home.
6. Responsive: 320/360/375/390/414/tablet/laptop/desktop; light + dark mode both experiences.
7. No existing Elder visual regression; `npm run build` green.

Final report: files changed/created, architecture, role/auth strategy, routes, data/service changes, Clerk config, backend work remaining, build result, known limitations.
