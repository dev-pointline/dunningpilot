# Gate-0 Proof Artifacts (Stage 6 Rebuild)

## 1) Waitlist Form Layout + Spacing (Issue #1)

### Screenshot artifact set (before/after)
- Breakpoints covered: **320, 375, 390, 768, 1024, 1440**
- Placements covered: **hero form, final CTA form, exit-intent modal form**

**File patterns**
- Before:
- `qa/screenshots/before/hero-{320|375|390|768|1024|1440}.png`
- `qa/screenshots/before/final-cta-{320|375|390|768|1024|1440}.png`
- `qa/screenshots/before/exit-modal-{320|375|390|768|1024|1440}.png`
- After:
- `qa/screenshots/after/hero-{320|375|390|768|1024|1440}.png`
- `qa/screenshots/after/final-cta-{320|375|390|768|1024|1440}.png`
- `qa/screenshots/after/exit-modal-{320|375|390|768|1024|1440}.png`

### Verified constraints
- Input/button min height: **48px** (`h-12 min-h-12`)
- `<640px`: stacked layout + **12px vertical gap** (`flex-col gap-3`)
- `>=640px`: inline row + **12px horizontal gap** (`sm:flex-row sm:gap-3`)
- Button full width on mobile + auto width on tablet/desktop (`w-full sm:w-auto`)
- Max-width constraints:
- form wrapper: `max-w-[680px]`
- exit modal form wrapper: `max-w-[520px]`
- Legal copy line-height and status spacing:
- legal: `text-xs leading-5`
- status zone: `mt-2 min-h-5`

---

## 2) Privacy + Terms Routes + Link Integrity (Issue #2)

### Route status
- `/privacy` → HTTP **200**
- `/terms` → HTTP **200**

### Link placement coverage
- Hero form legal copy → `/privacy`, `/terms` (200/200)
- Final CTA form legal copy → `/privacy`, `/terms` (200/200)
- Exit-intent modal form legal copy → `/privacy`, `/terms` (200/200)
- Footer legal links → `/privacy`, `/terms` (200/200)

---

## 3) Waitlist Persistence + Idempotency + Validation (Issue #3)

### Schema/migration
- File: `supabase/migrations/202602270001_create_waitlist.sql`
- Table: `public.waitlist`
- Required fields:
- `id uuid`
- `email text` (stored lowercase by API)
- `source text`
- `created_at timestamptz`
- `metadata jsonb`
- Unique index: `waitlist_email_normalized_unique` on generated lowercase column.

### API sample responses

**Success insert**