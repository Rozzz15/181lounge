# Seattle's Best Coffee - Corporate Website MVP Specification

## 1. Concept & Vision

A premium, conversion-focused corporate website for a national coffee franchise brand inspired by Seattle's Best Coffee Philippines. The website exudes warmth, professionalism, and corporate credibility while maintaining a modern, inviting aesthetic that makes visitors feel welcomed into a premium coffee experience. The brand combines the professionalism of global coffee giants with local Filipino warmth.

## 2. Design Language

### Aesthetic Direction
Premium corporate coffee franchise — think Starbucks meets local warmth. Rich, deep reds with golden accents create a luxurious yet approachable feel. Clean typography with generous whitespace conveys professionalism.

### Color Palette
- **Primary**: `#8B0000` (Deep burgundy red)
- **Secondary**: `#C79A5D` (Warm gold)
- **Accent**: `#F6B042` (Bright golden orange)
- **Background**: `#F8F8F8` (Off-white)
- **Dark Background**: `#1A1A1A` (Footer/contrast sections)
- **Text Primary**: `#222222` (Near black)
- **Text Secondary**: `#666666` (Gray)
- **Success**: `#22C55E`
- **Error**: `#EF4444`

### Typography
- **Headings**: `Oswald` (Google Font) - Bold, impactful, corporate feel
- **Body**: `Inter` (Google Font) - Clean, readable, modern
- **Fallbacks**: `system-ui, -apple-system, sans-serif`

### Spatial System
- Base unit: 8px
- Spacing scale: 8, 16, 24, 32, 48, 64, 96, 128px
- Container max-width: 1200px
- Border radius: 8px (buttons), 16px (cards), 24px (large sections)

### Motion Philosophy
- **Entrance animations**: Fade-up with 400ms duration, staggered 100ms between siblings
- **Hover states**: Scale 1.02-1.05 with 200ms ease-out
- **Page transitions**: Smooth opacity fade 300ms
- **Scroll effects**: Subtle parallax on hero, fade-in on scroll for sections

### Visual Assets
- **Icons**: Lucide React (consistent stroke width, modern look)
- **Images**: High-quality coffee photography, warm tones, lifestyle-focused
- **Decorative**: Subtle coffee bean patterns, gradient overlays

## 3. Layout & Structure

### Page Structure
1. **Sticky Navigation** - Always visible, white background, shadow on scroll
2. **Hero Banner** - Full-width, 80vh height, gradient background with featured products
3. **Content Sections** - Alternating layouts, generous padding (64-96px vertical)
4. **Footer** - Dark, comprehensive, multi-column

### Responsive Strategy
- **Mobile First**: Base styles for 320px+
- **Breakpoints**: sm (640px), md (768px), lg (1024px), xl (1280px)
- **Navigation**: Hamburger menu below lg breakpoint
- **Grid**: 4-col desktop, 2-col tablet, 1-col mobile

### Page Routes
- `/` - Home page
- `/menu` - Full menu with categories
- `/story` - Our Story page
- `/careers` - Job listings and application
- `/stores` - Store locator
- `/contact` - Contact form and info
- `/admin` - CMS dashboard (protected)

## 4. Features & Interactions

### Navigation
- Sticky header with backdrop blur on scroll
- Mobile hamburger with slide-in drawer from right
- Active page indicator (underline)
- "Order Now" CTA button (accent color)

### Hero Section
- Parallax background effect on scroll
- Animated text entrance (fade-up, staggered)
- CTA button with hover scale effect
- Floating product images with subtle animation

### Product Cards
- Hover: Scale 1.05, shadow increase, 200ms transition
- Click: Navigate to menu page with category filter
- Lazy loading images with blur placeholder

### Menu System
- Category tabs with smooth indicator animation
- Search with real-time filtering
- Grid/list view toggle
- Pagination (12 items per page)

### Store Locator
- Interactive search (city, branch name)
- List view with store details
- Click to reveal on map
- "Get Directions" opens Google Maps

### Contact Form
- Real-time validation
- Loading state on submit
- Success/error toast notifications
- Honeypot spam protection

### Admin Dashboard
- Protected routes (login required)
- Sidebar navigation
- CRUD operations for all entities
- Image upload support
- Toast notifications for actions

## 5. Component Inventory

### Button
- Variants: primary (red), secondary (gold), outline, ghost
- Sizes: sm, md, lg
- States: default, hover (scale 1.02), active (scale 0.98), disabled (opacity 0.5), loading (spinner)

### Card
- Product card: image, title, category badge, price, CTA
- Store card: branch name, address, hours, phone, directions button
- Job card: title, department, location, type badge, apply CTA

### Input
- Text, email, phone, textarea
- States: default, focus (ring), error (red border + message), disabled
- Label and helper text support

### Navigation
- Desktop: horizontal links, logo left, CTA right
- Mobile: hamburger trigger, full-screen overlay drawer

### Modal
- Centered, backdrop blur
- Close button (X) and click-outside-to-close
- Animated entrance (scale + fade)

### Toast
- Position: bottom-right
- Types: success (green), error (red), info (blue)
- Auto-dismiss after 5 seconds

### Badge
- Category labels, job types, status indicators
- Variants: solid, outline

## 6. Technical Approach

### Framework & Architecture
- Next.js 15+ with App Router
- TypeScript for type safety
- TailwindCSS 4 for styling
- Framer Motion for animations
- Server Components by default, Client Components where needed

### Database (Drizzle ORM + PostgreSQL)
```sql
-- Users for admin authentication
users (id, name, email, password_hash, role, created_at)

-- Menu categories
categories (id, name, slug, description, image, sort_order)

-- Products
products (id, name, description, price, image, category_id, featured, active, created_at)

-- Store locations
stores (id, branch_name, address, city, latitude, longitude, phone, hours, active)

-- Career listings
jobs (id, title, department, location, type, description, requirements, status, created_at)

-- Promotions
promotions (id, title, description, image, cta_text, cta_link, active, start_date, end_date)

-- Contact submissions
contact_submissions (id, name, email, phone, subject, message, created_at)
```

### API Routes
- `GET /api/health` - Health check
- `GET/POST /api/products` - List/Create products
- `GET/PUT/DELETE /api/products/[id]` - Product CRUD
- `GET/POST /api/categories` - Categories
- `GET/POST /api/stores` - Store locations
- `GET/POST /api/jobs` - Job listings
- `POST /api/contact` - Contact form submission
- `POST /api/auth/login` - Admin login
- `GET /api/admin/dashboard` - Dashboard stats

### Authentication
- Simple password-based auth for admin
- Session stored in HTTP-only cookie
- Middleware protection for admin routes

### Performance Targets
- Lighthouse Performance: 95+
- First Contentful Paint: <1.5s
- Largest Contentful Paint: <2.5s
- Cumulative Layout Shift: <0.1
