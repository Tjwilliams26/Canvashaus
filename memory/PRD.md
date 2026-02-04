# CanvasHaus.in - PRD Document

## Original Problem Statement
Create a premium landing page for canvashaus.in - a custom canvas printing service launching soon. The page should feature:
- No watermarks, stable UI with premium effects
- Email waitlist functionality
- Contact: Support@canvashaus.in, Location: Bengaluru
- All content sections for a "coming soon" launch page

## User Persona
- **Primary**: Homeowners & decor enthusiasts looking for premium custom canvas art
- **Secondary**: Gift-givers seeking personalized artwork for special occasions
- **Demographics**: Age 25-55, middle to upper-middle class, urban India

## Core Requirements (Static)
1. Premium dark luxury design with gold accents
2. Email waitlist with database storage
3. Responsive design (mobile + desktop)
4. Smooth animations and micro-interactions
5. All business information displayed

## What's Been Implemented ✅

### Date: Feb 4, 2026

**Frontend (React + Tailwind)**
- [x] Hero Section with animated elements and background image
- [x] "What We Do" section with Bento-style feature grid
- [x] "Why You'll Love It" benefits section
- [x] Email waitlist signup form with validation
- [x] Footer with contact info (email + location)
- [x] Sticky header with CTA
- [x] Smooth scroll animations (Framer Motion)
- [x] Mobile-responsive design
- [x] Toast notifications for feedback
- [x] Premium typography (Playfair Display + Manrope)

**Backend (FastAPI + MongoDB)**
- [x] POST /api/waitlist - Add email to waitlist
- [x] GET /api/waitlist - Get all waitlist entries (admin)
- [x] GET /api/waitlist/count - Get waitlist count
- [x] Duplicate email handling (409 conflict)

## Prioritized Backlog

### P0 (Critical for Launch) - DONE
- [x] Landing page UI
- [x] Email waitlist functionality
- [x] Responsive design

### P1 (Nice to Have)
- [ ] Email confirmation/notification system (SendGrid/Resend)
- [ ] Admin dashboard to view/export waitlist
- [ ] Analytics tracking (Google Analytics)

### P2 (Future)
- [ ] Canvas customization preview tool
- [ ] Pricing calculator
- [ ] Size guide interactive tool
- [ ] Customer testimonials/reviews section

## Tech Stack
- **Frontend**: React 19, Tailwind CSS, Framer Motion, Shadcn/UI
- **Backend**: FastAPI, Python
- **Database**: MongoDB
- **Hosting**: Emergent Platform

## Next Tasks
1. Add email notification when someone joins waitlist
2. Create admin dashboard to view/export waitlist emails
3. Add analytics tracking for conversion metrics
