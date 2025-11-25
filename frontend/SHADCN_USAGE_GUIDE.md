# shadcn/ui Component Usage & Customization Guide

## Part 1: Implementing Cards with shadcn/ui

### Step 1: Install the Card Component

```bash
npx shadcn@latest add card
```

This command:
- Creates `src/components/ui/card.jsx`
- Installs any required dependencies (if any)
- Makes the component ready to use

### Step 2: Import Card Components

```javascript
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
```

**Available Card Sub-components:**
- `Card` - Main container
- `CardHeader` - Header section (typically contains title)
- `CardTitle` - Title text
- `CardDescription` - Description text
- `CardContent` - Main content area
- `CardFooter` - Footer section
- `CardAction` - Action buttons area

### Step 3: Use Card Components

#### Basic Card Structure:

```javascript
<Card>
  <CardHeader>
    <CardTitle>Card Title</CardTitle>
    <CardDescription>Optional description</CardDescription>
  </CardHeader>
  <CardContent>
    {/* Your content here */}
  </CardContent>
  <CardFooter>
    {/* Optional footer content */}
  </CardFooter>
</Card>
```

#### Real Example (Feature Cards):

```javascript
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Brain } from "lucide-react";

function FeatureCard() {
  return (
    <Card className="border-gray-200">
      <CardHeader>
        <div className="flex justify-center mb-4">
          <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
            <Brain className="w-6 h-6 text-blue-600" />
          </div>
        </div>
        <CardTitle className="text-xl text-center">
          AI-Generated Roadmaps
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-gray-600 text-center text-sm leading-relaxed">
          Get personalized learning paths created by AI...
        </p>
      </CardContent>
    </Card>
  );
}
```

### Step 4: Customize Card Appearance

You can customize cards using the `className` prop on any Card component:

```javascript
// Custom border color
<Card className="border-blue-300">

// Custom background
<Card className="bg-gradient-to-br from-blue-50 to-purple-50">

// Custom padding
<Card className="p-8">

// Remove shadow
<Card className="shadow-none">

// Custom rounded corners
<Card className="rounded-2xl">
```

**Key Point:** Since shadcn components are in your codebase, you can:
1. Pass `className` to override styles
2. Directly edit the component file for global changes
3. Use Tailwind's `cn()` utility for conditional classes

---

## Part 2: Customizing shadcn/ui Components

### Method 1: Using className Prop (Recommended for One-off Changes)

This is the easiest way to customize a component for a specific use case.

#### Example: Change Button Height

```javascript
import { Button } from "@/components/ui/button";

// Option 1: Override with className
<Button className="h-12 px-6">Tall Button</Button>

// Option 2: Use existing size variants
<Button size="lg">Large Button</Button>
<Button size="sm">Small Button</Button>
```

**How it works:**
- The `cn()` utility in the Button component merges classes intelligently
- Your custom classes override the default ones
- `tailwind-merge` prevents conflicting classes

### Method 2: Modify the Component File (For Global Changes)

If you want to change the default height for ALL buttons, edit the component directly.

#### Example: Change Default Button Height

**File:** `src/components/ui/button.jsx`

**Current code:**
```javascript
size: {
  default: "h-9 px-4 py-2 has-[>svg]:px-3",  // h-9 = 36px height
  sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",  // h-8 = 32px
  lg: "h-10 rounded-md px-6 has-[>svg]:px-4",  // h-10 = 40px
  // ...
}
```

**To change default height to 48px (h-12):**
```javascript
size: {
  default: "h-12 px-4 py-2 has-[>svg]:px-3",  // Changed from h-9 to h-12
  sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
  lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
  // ...
}
```

**To add a new custom size:**
```javascript
size: {
  default: "h-9 px-4 py-2 has-[>svg]:px-3",
  sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
  lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
  xl: "h-14 rounded-lg px-8 text-lg has-[>svg]:px-6",  // New custom size
  // ...
}
```

Then use it:
```javascript
<Button size="xl">Extra Large Button</Button>
```

### Method 3: Add New Variants

You can add new button variants (styles) in the same way:

**File:** `src/components/ui/button.jsx`

```javascript
variants: {
  variant: {
    default: "bg-primary text-primary-foreground hover:bg-primary/90",
    destructive: "bg-destructive text-white hover:bg-destructive/90",
    outline: "border bg-background shadow-xs hover:bg-accent",
    // Add your custom variant:
    gradient: "bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:from-blue-600 hover:to-purple-700",
    // ...
  }
}
```

Use it:
```javascript
<Button variant="gradient">Gradient Button</Button>
```

---

## Part 3: Understanding How Customization Works

### The `cn()` Utility Function

Located in `src/lib/utils.js`:

```javascript
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}
```

**What it does:**
1. `clsx()` - Conditionally joins classNames
2. `twMerge()` - Intelligently merges Tailwind classes, removing conflicts

**Example:**
```javascript
// Without twMerge: conflicting classes
className="h-9 h-12"  // Both applied, last one wins (unpredictable)

// With twMerge: conflicts resolved
cn("h-9", "h-12")  // Result: "h-12" (last one wins, but predictable)
```

### How Button Component Uses `cn()`

```javascript
function Button({ className, variant, size, ...props }) {
  return (
    <button
      className={cn(
        buttonVariants({ variant, size }),  // Base styles from cva
        className  // Your custom classes (merged intelligently)
      )}
      {...props}
    />
  );
}
```

**Flow:**
1. `buttonVariants({ variant, size })` - Gets base classes from CVA
2. `className` - Your custom classes passed as prop
3. `cn()` - Merges both, resolving conflicts

---

## Part 4: Practical Examples

### Example 1: Custom Button Heights

```javascript
// Small button (32px)
<Button size="sm">Small</Button>

// Default button (36px)
<Button>Default</Button>

// Large button (40px)
<Button size="lg">Large</Button>

// Custom height (48px) - override with className
<Button className="h-12">Custom Height</Button>

// Extra tall (56px)
<Button className="h-14 px-8 text-lg">Extra Tall</Button>
```

### Example 2: Custom Card Styles

```javascript
// Minimal card
<Card className="border-0 shadow-none bg-transparent">
  <CardContent>Content</CardContent>
</Card>

// Colored card
<Card className="bg-blue-50 border-blue-200">
  <CardContent>Blue Card</CardContent>
</Card>

// Card with custom padding
<Card className="p-0">
  <CardContent className="p-8">Custom Padding</CardContent>
</Card>
```

### Example 3: Combining Customizations

```javascript
// Button with custom height, color, and rounded corners
<Button 
  className="h-14 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full px-8 text-lg font-semibold"
>
  Custom Button
</Button>

// Card with custom everything
<Card className="border-2 border-blue-300 bg-gradient-to-br from-white to-blue-50 rounded-2xl shadow-lg">
  <CardHeader className="pb-2">
    <CardTitle className="text-2xl text-blue-900">Custom Card</CardTitle>
  </CardHeader>
  <CardContent className="pt-4">
    <p>Custom styled content</p>
  </CardContent>
</Card>
```

---

## Part 5: Best Practices

### ✅ DO:

1. **Use className prop for one-off customizations:**
   ```javascript
   <Button className="h-12">Custom Button</Button>
   ```

2. **Modify component file for global changes:**
   ```javascript
   // In button.jsx - change default size for all buttons
   defaultVariants: {
     size: "lg"  // All buttons default to large
   }
   ```

3. **Create wrapper components for reusable customizations:**
   ```javascript
   // components/ui/custom-button.jsx
   export function CustomButton({ children, ...props }) {
     return (
       <Button className="h-12 rounded-full" {...props}>
         {children}
       </Button>
     );
   }
   ```

4. **Use Tailwind's responsive classes:**
   ```javascript
   <Button className="h-9 md:h-12 lg:h-14">Responsive Height</Button>
   ```

### ❌ DON'T:

1. **Don't modify node_modules:**
   - shadcn components are in your `src/` folder, not node_modules
   - You CAN modify them directly (that's the point!)

2. **Don't use inline styles when Tailwind classes work:**
   ```javascript
   // ❌ Bad
   <Button style={{ height: '48px' }}>Button</Button>
   
   // ✅ Good
   <Button className="h-12">Button</Button>
   ```

3. **Don't create conflicting classes manually:**
   ```javascript
   // ❌ Bad - conflicts
   <Button className="h-9 h-12">Button</Button>
   
   // ✅ Good - let cn() handle it
   <Button className="h-12">Button</Button>
   ```

---

## Part 6: Interview Talking Points

### Q: How do you customize shadcn/ui components?

**Answer:**
"shadcn/ui components are copy-paste components, not npm packages. This means they live in your `src/components/ui/` folder and you have full control. There are three main ways to customize:

1. **className prop** - For one-off customizations, just pass Tailwind classes. The `cn()` utility intelligently merges them using `tailwind-merge`.

2. **Direct file editing** - Since components are in your codebase, you can edit them directly. For example, to change default button height, I'd modify the `size` variants in the `buttonVariants` CVA configuration.

3. **Wrapper components** - For reusable customizations, create wrapper components that compose shadcn components with your custom styles.

The key advantage is that `cn()` uses `tailwind-merge` to resolve class conflicts, so you can safely override styles without worrying about specificity issues."

### Q: What's the difference between shadcn/ui and other UI libraries?

**Answer:**
"shadcn/ui is fundamentally different because:
- Components are **copied into your project** (not installed from npm)
- You **own the code** - can modify, extend, or delete components
- Built on **Radix UI primitives** for accessibility
- Uses **Tailwind CSS** for styling (not CSS-in-JS)
- **No runtime overhead** - components are just React + Tailwind

This makes it perfect for projects where you need full control and want to avoid dependency bloat."

---

## Quick Reference: Common Customizations

### Button Heights
- `h-8` = 32px (small)
- `h-9` = 36px (default)
- `h-10` = 40px (large)
- `h-12` = 48px (custom)
- `h-14` = 56px (extra large)

### Button Sizes (predefined)
```javascript
<Button size="sm">Small</Button>
<Button size="default">Default</Button>
<Button size="lg">Large</Button>
<Button size="icon">Icon Only</Button>
```

### Card Customization
```javascript
// Border
<Card className="border-2 border-blue-300">

// Background
<Card className="bg-blue-50">

// Padding
<Card className="p-8">

// Shadow
<Card className="shadow-lg">

// Rounded corners
<Card className="rounded-2xl">
```

---

## Summary

1. **Install components:** `npx shadcn@latest add [component-name]`
2. **Import and use:** Components are ready to use immediately
3. **Customize with className:** Pass Tailwind classes for one-off changes
4. **Edit component files:** Modify directly for global changes
5. **Use `cn()` utility:** Automatically handles class merging and conflict resolution

**Remember:** shadcn/ui components are YOUR code - modify them freely! 🚀

