# Complete Guide: Setting Up shadcn/ui from Scratch

## Overview
This guide covers setting up shadcn/ui with React + Vite + Tailwind CSS v4. Perfect for interview preparation!

---

## Step 1: Create a New Vite + React Project

```bash
npm create vite@latest my-app -- --template react
cd my-app
npm install
```

---

## Step 2: Install Tailwind CSS v4 and Required Dependencies

### Install Tailwind CSS v4 and PostCSS Plugin
```bash
npm install -D tailwindcss@^4.1.17 @tailwindcss/postcss postcss autoprefixer tw-animate-css
```

**Important Notes:**
- Tailwind CSS v4 uses `@tailwindcss/postcss` as a separate package (not `tailwindcss` directly)
- `tw-animate-css` provides animation utilities for shadcn/ui

---

## Step 3: Install shadcn/ui Core Dependencies

```bash
npm install class-variance-authority clsx tailwind-merge
npm install lucide-react
npm install @radix-ui/react-slot
```

**What each package does:**
- `class-variance-authority` (cva): Creates type-safe variant APIs for components
- `clsx`: Conditionally join classNames together
- `tailwind-merge`: Merge Tailwind CSS classes without style conflicts
- `lucide-react`: Icon library used by shadcn/ui
- `@radix-ui/react-slot`: Radix UI primitives (used by shadcn components)

---

## Step 4: Configure PostCSS

Create `postcss.config.js` in the root:

```javascript
export default {
  plugins: {
    '@tailwindcss/postcss': {},  // For Tailwind v4
    autoprefixer: {},
  },
}
```

**Key Point:** Tailwind v4 requires `@tailwindcss/postcss` instead of `tailwindcss` in PostCSS config.

---

## Step 5: Set Up Tailwind CSS

### Update `src/index.css`:

```css
@import "tailwindcss";
@import "tw-animate-css";

@custom-variant dark (&:is(.dark *));

@theme inline {
  --radius-sm: calc(var(--radius) - 4px);
  --radius-md: calc(var(--radius) - 2px);
  --radius-lg: var(--radius);
  --radius-xl: calc(var(--radius) + 4px);
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --color-card: var(--card);
  --color-card-foreground: var(--card-foreground);
  --color-popover: var(--popover);
  --color-popover-foreground: var(--popover-foreground);
  --color-primary: var(--primary);
  --color-primary-foreground: var(--primary-foreground);
  --color-secondary: var(--secondary);
  --color-secondary-foreground: var(--secondary-foreground);
  --color-muted: var(--muted);
  --color-muted-foreground: var(--muted-foreground);
  --color-accent: var(--accent);
  --color-accent-foreground: var(--accent-foreground);
  --color-destructive: var(--destructive);
  --color-border: var(--border);
  --color-input: var(--input);
  --color-ring: var(--ring);
  /* ... more color variables ... */
}

:root {
  --radius: 0.625rem;
  --background: oklch(1 0 0);
  --foreground: oklch(0.129 0.042 264.695);
  --card: oklch(1 0 0);
  --card-foreground: oklch(0.129 0.042 264.695);
  --popover: oklch(1 0 0);
  --popover-foreground: oklch(0.129 0.042 264.695);
  --primary: oklch(0.208 0.042 265.755);
  --primary-foreground: oklch(0.984 0.003 247.858);
  --secondary: oklch(0.968 0.007 247.896);
  --secondary-foreground: oklch(0.208 0.042 265.755);
  --muted: oklch(0.968 0.007 247.896);
  --muted-foreground: oklch(0.554 0.046 257.417);
  --accent: oklch(0.968 0.007 247.896);
  --accent-foreground: oklch(0.208 0.042 265.755);
  --destructive: oklch(0.577 0.245 27.325);
  --border: oklch(0.929 0.013 255.508);
  --input: oklch(0.929 0.013 255.508);
  --ring: oklch(0.704 0.04 256.788);
  /* ... more variables ... */
}

.dark {
  /* Dark mode variables ... */
}

@layer base {
  * {
    @apply border-border outline-ring/50;
  }
  body {
    @apply bg-background text-foreground;
  }
}
```

**Key Points:**
- Tailwind v4 uses `@import "tailwindcss"` instead of `@tailwind` directives
- CSS variables are used for theming
- `@theme inline` defines Tailwind color tokens

---

## Step 6: Configure Path Aliases

### A. Update `vite.config.js`:

```javascript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from "path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve("src"),  // Enables @/ imports
    },
  }
})
```

### B. Create/Update `jsconfig.json` (for JSX projects) or `tsconfig.json` (for TS projects):

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"]
    }
  }
}
```

**Why:** 
- Vite config enables runtime path resolution
- `jsconfig.json`/`tsconfig.json` provides IDE autocomplete and type checking
- shadcn/ui uses `@/` alias for cleaner imports (e.g., `@/components/ui/button`)

---

## Step 7: Create Utility Function

Create `src/lib/utils.js`:

```javascript
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}
```

**Purpose:** The `cn()` function merges Tailwind classes intelligently, preventing conflicts.

---

## Step 8: Initialize shadcn/ui

### Option A: Using CLI (Recommended)
```bash
npx shadcn@latest init
```

This will:
- Create `components.json` configuration file
- Set up the project structure
- Configure paths and aliases

### Option B: Manual Setup

Create `components.json`:

```json
{
  "$schema": "https://ui.shadcn.com/schema.json",
  "style": "new-york",
  "rsc": false,
  "tsx": false,
  "tailwind": {
    "config": "",
    "css": "src/index.css",
    "baseColor": "slate",
    "cssVariables": true,
    "prefix": ""
  },
  "iconLibrary": "lucide",
  "aliases": {
    "components": "@/components",
    "utils": "@/lib/utils",
    "ui": "@/components/ui",
    "lib": "@/lib",
    "hooks": "@/hooks"
  },
  "registries": {}
}
```

**Configuration Explained:**
- `style`: "new-york" or "default" - component style variant
- `rsc`: false (not using React Server Components)
- `tsx`: false (using .jsx, not .tsx)
- `cssVariables`: true (uses CSS variables for theming)
- `aliases`: Path mappings for imports

---

## Step 9: Create Folder Structure

```
src/
├── components/
│   ├── ui/          # shadcn/ui components go here
│   └── layout/      # Your custom layout components
├── lib/
│   └── utils.js     # cn() utility function
└── pages/           # Your page components
```

---

## Step 10: Install shadcn/ui Components

```bash
# Install button component
npx shadcn@latest add button

# Install other components as needed
npx shadcn@latest add card
npx shadcn@latest add input
# etc...
```

**What happens:** The CLI copies component files to `src/components/ui/` and installs any required dependencies.

---

## Step 11: Verify Setup

### Check `src/main.jsx` imports CSS:
```javascript
import './index.css'
```

### Create a test component:
```javascript
import { Button } from "@/components/ui/button";

function App() {
  return (
    <div className="p-8">
      <Button>Click me</Button>
    </div>
  );
}
```

---

## Common Issues & Solutions

### Issue 1: CSS not applying
**Solution:** 
- Ensure `index.css` is imported in `main.jsx`
- Check PostCSS config uses `@tailwindcss/postcss` (not `tailwindcss`)
- Restart dev server after config changes

### Issue 2: Path alias not working
**Solution:**
- Verify `vite.config.js` has path alias configured
- Check `jsconfig.json` or `tsconfig.json` for path mapping:
```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

### Issue 3: Tailwind v4 PostCSS error
**Solution:**
- Install `@tailwindcss/postcss` package
- Use `'@tailwindcss/postcss': {}` in PostCSS config (not `tailwindcss: {}`)

---

## Interview Talking Points

1. **Why shadcn/ui?**
   - Copy-paste components (not npm packages)
   - Full control over component code
   - Built on Radix UI primitives (accessible)
   - Uses Tailwind CSS for styling

2. **Key Dependencies:**
   - `class-variance-authority`: Type-safe component variants
   - `tailwind-merge`: Prevents class conflicts
   - `clsx`: Conditional className joining
   - `@radix-ui/*`: Accessible UI primitives

3. **Tailwind CSS v4 Changes:**
   - Uses `@import "tailwindcss"` instead of `@tailwind` directives
   - Requires `@tailwindcss/postcss` package
   - CSS-first configuration approach

4. **Component Structure:**
   - Components live in your codebase (not node_modules)
   - Can be customized directly
   - Uses `cn()` utility for class merging

---

## Quick Reference: Package Versions

```json
{
  "dependencies": {
    "@radix-ui/react-slot": "^1.2.4",
    "class-variance-authority": "^0.7.1",
    "clsx": "^2.1.1",
    "lucide-react": "^0.554.0",
    "tailwind-merge": "^3.4.0"
  },
  "devDependencies": {
    "@tailwindcss/postcss": "^4.1.17",
    "tailwindcss": "^4.1.17",
    "postcss": "^8.5.6",
    "autoprefixer": "^10.4.22",
    "tw-animate-css": "^1.4.0"
  }
}
```

---

## Summary Checklist

- [ ] Created Vite + React project
- [ ] Installed Tailwind CSS v4 + PostCSS plugin
- [ ] Installed shadcn/ui dependencies (cva, clsx, tailwind-merge, lucide-react)
- [ ] Created PostCSS config with `@tailwindcss/postcss`
- [ ] Set up `index.css` with Tailwind imports and CSS variables
- [ ] Configured path aliases in `vite.config.js`
- [ ] Created `lib/utils.js` with `cn()` function
- [ ] Initialized shadcn/ui (created `components.json`)
- [ ] Created folder structure (`components/ui/`, `lib/`)
- [ ] Installed at least one component (button) to verify setup
- [ ] Verified CSS is imported in `main.jsx`

---

**Good luck with your interview! 🚀**

