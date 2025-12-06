# CourseMaster

**Full-Featured EdTech Platform (MERN)**

> CourseMaster is a production-ready e-learning platform built with the MERN stack. It supports students, instructors, and administrators, offering course browsing, purchases, consumption (video lessons), progress tracking, assignments & quizzes, and admin management tools.

---

## Table of Contents

1. [Project Overview](#project-overview)
2. [Features](#features)
3. [Tech Stack](#tech-stack)
4. [Architecture & Project Structure](#architecture--project-structure)
5. [Getting Started (Local)](#getting-started-local)

   * Prerequisites
   * Installation
   * Environment Variables
   * Running (Dev & Prod)
6. [Database Schemas (Summary)](#database-schemas-summary)
7. [API Endpoints (Summary)](#api-endpoints-summary)
8. [Authentication & Authorization](#authentication--authorization)
9. [Performance & Optimization](#performance--optimization)
10. [Validation & Error Handling](#validation--error-handling)
11. [Admin Features & Bonus](#admin-features--bonus)
12. [Deployment](#deployment)
13. [Testing](#testing)
14. [Project Roadmap / To-do](#project-roadmap--to-do)
15. [Contributing](#contributing)
16. [License & Contact](#license--contact)

---

## Project Overview

CourseMaster is an e-learning platform where:

* Students can discover, purchase, and consume courses.
* Instructors (or admins) can create/manage courses, batches, and content.
* Admins can review enrollments, assignments and manage the system.

This repository contains both frontend (Next.js) and backend (Express + MongoDB) with clear modular structure and production readiness in mind.

---

## Features

**Public**

* Course listing with server-side pagination
* Search (title / instructor), sort (price), and filters (category / tags)
* Course detail page

**Student (Protected)**

* Registration / Login / Logout (JWT)
* Enroll & purchase (placeholder/mock payment integration)
* Dashboard: enrolled courses and progress bar
* Watch lessons (embedded YouTube/Vimeo)
* Mark lesson complete
* Assignment submit (Google Drive link / text)
* Module-level quizzes (auto grading)

**Admin (Protected)**

* CRUD Courses & Batches
* View enrollments by course/batch
* Review student assignments
* Analytics (bonus) — enrollments chart

---

## Tech Stack

* Frontend: **Next.js** (App or Pages Router), React, TypeScript (optional)
* Backend: **Node.js**, **Express.js**
* Database: **MongoDB** with **Mongoose**
* State management: **Redux Toolkit** (or Context API)
* Auth: JWT, bcrypt for password hashing
* Validation: **Joi** (or **Zod**)
* Bonus: **Redis** for caching (optional), **Nodemailer** for emails
* Charts: **Recharts** or **Chart.js**

---

## Architecture & Project Structure

```
├── 📁 Client
│   ├── 📁 .vercel
│   │   ├── 📄 README.txt
│   │   └── ⚙️ project.json
│   ├── 📁 public
│   │   └── 🖼️ vite.svg
│   ├── 📁 src
│   │   ├── 📁 assets
│   │   │   └── 🖼️ react.svg
│   │   ├── 📁 components
│   │   │   ├── 📁 Layout
│   │   │   │   ├── 📄 CommonLayout.tsx
│   │   │   │   ├── 📄 DashboardLayout.tsx
│   │   │   │   ├── 📄 Footer.tsx
│   │   │   │   ├── 📄 ModeToggler.tsx
│   │   │   │   └── 📄 Navbar.tsx
│   │   │   ├── 📁 modules
│   │   │   │   ├── 📁 AdminDashboard
│   │   │   │   │   ├── 📄 AddBatchForm.tsx
│   │   │   │   │   └── 📄 AddModuleForm.tsx
│   │   │   │   ├── 📁 Authentication
│   │   │   │   └── 📁 HomePage
│   │   │   │       ├── 📄 CategoriesSection.tsx
│   │   │   │       ├── 📄 FeaturedCoursesSection.tsx
│   │   │   │       ├── 📄 HeroSection.tsx
│   │   │   │       ├── 📄 StatsSection.tsx
│   │   │   │       └── 📄 TestimonialSection.tsx
│   │   │   ├── 📁 ui
│   │   │   │   ├── 📄 Password.tsx
│   │   │   │   ├── 📄 accordion.tsx
│   │   │   │   ├── 📄 avatar.tsx
│   │   │   │   ├── 📄 badge.tsx
│   │   │   │   ├── 📄 button.tsx
│   │   │   │   ├── 📄 calendar.tsx
│   │   │   │   ├── 📄 card.tsx
│   │   │   │   ├── 📄 dialog.tsx
│   │   │   │   ├── 📄 dropdown-menu.tsx
│   │   │   │   ├── 📄 form.tsx
│   │   │   │   ├── 📄 input.tsx
│   │   │   │   ├── 📄 label.tsx
│   │   │   │   ├── 📄 navigation-menu.tsx
│   │   │   │   ├── 📄 popover.tsx
│   │   │   │   ├── 📄 progress.tsx
│   │   │   │   ├── 📄 radio-group.tsx
│   │   │   │   ├── 📄 select.tsx
│   │   │   │   ├── 📄 separator.tsx
│   │   │   │   ├── 📄 spinner.tsx
│   │   │   │   ├── 📄 switch.tsx
│   │   │   │   ├── 📄 table.tsx
│   │   │   │   └── 📄 textarea.tsx
│   │   │   ├── 📄 Loading.tsx
│   │   │   ├── 📄 PageTitle.tsx
│   │   │   └── 📄 app-sidebar.tsx
│   │   ├── 📁 config
│   │   │   └── 📄 index.ts
│   │   ├── 📁 constants
│   │   │   └── 📄 role.ts
│   │   ├── 📁 context
│   │   │   └── 📄 theme.context.tsx
│   │   ├── 📁 hooks
│   │   │   └── 📄 useTheme.tsx
│   │   ├── 📁 lib
│   │   │   ├── 📄 axios.ts
│   │   │   ├── 📄 mock-data.ts
│   │   │   └── 📄 utils.ts
│   │   ├── 📁 pages
│   │   │   ├── 📁 Admin
│   │   │   │   ├── 📄 AdminAssignments.tsx
│   │   │   │   ├── 📄 AdminDashboard.tsx
│   │   │   │   ├── 📄 AdminEnrollments.tsx
│   │   │   │   ├── 📄 AdminManageBatches.tsx
│   │   │   │   ├── 📄 AdminManageCourses.tsx
│   │   │   │   └── 📄 AdminSettings.tsx
│   │   │   ├── 📁 Auth
│   │   │   │   ├── 📄 Login.tsx
│   │   │   │   └── 📄 Register.tsx
│   │   │   ├── 📁 Student
│   │   │   │   ├── 📄 StudentAssignments.tsx
│   │   │   │   ├── 📄 StudentCourses.tsx
│   │   │   │   ├── 📄 StudentDashboard.tsx
│   │   │   │   ├── 📄 StudentProfile.tsx
│   │   │   │   └── 📄 StudentQuizzes.tsx
│   │   │   ├── 📄 AssignmentSubmitPage.tsx
│   │   │   ├── 📄 CourseDetails.tsx
│   │   │   ├── 📄 CoursePlayerPage.tsx
│   │   │   ├── 📄 CoursesPage.tsx
│   │   │   ├── 📄 EnrollPage.tsx
│   │   │   ├── 📄 HomePage.tsx
│   │   │   ├── 📄 NotFound.tsx
│   │   │   ├── 📄 QuizSubmitPage.tsx
│   │   │   └── 📄 Unauthorized.tsx
│   │   ├── 📁 providers
│   │   │   └── 📄 theme-provider.tsx
│   │   ├── 📁 redux
│   │   │   ├── 📁 features
│   │   │   │   ├── 📁 Auth
│   │   │   │   │   └── 📄 auth.api.ts
│   │   │   │   ├── 📁 Course
│   │   │   │   │   └── 📄 course.api.ts
│   │   │   │   └── 📁 Enrollment
│   │   │   │       └── 📄 enrollment.api.ts
│   │   │   ├── 📄 axiosBaseQuery.ts
│   │   │   ├── 📄 baseApi.ts
│   │   │   ├── 📄 hook.ts
│   │   │   └── 📄 store.ts
│   │   ├── 📁 routes
│   │   │   ├── 📄 adminSidebarItems.tsx
│   │   │   ├── 📄 index.tsx
│   │   │   └── 📄 studentSidebarItems.tsx
│   │   ├── 📁 types
│   │   │   ├── 📄 auth.type.ts
│   │   │   └── 📄 index.ts
│   │   ├── 📁 utils
│   │   │   ├── 📄 authPagesBlock.tsx
│   │   │   ├── 📄 generateRoutes.ts
│   │   │   ├── 📄 getSidebarItems.ts
│   │   │   └── 📄 withAuth.tsx
│   │   ├── 📄 App.tsx
│   │   ├── 🎨 index.css
│   │   └── 📄 main.tsx
│   ├── ⚙️ .gitignore
│   ├── 📄 LICENSE
│   ├── 📝 README.md
│   ├── 📄 bun.lock
│   ├── ⚙️ components.json
│   ├── 📄 eslint.config.js
│   ├── 🌐 index.html
│   ├── ⚙️ package.json
│   ├── ⚙️ tsconfig.app.json
│   ├── ⚙️ tsconfig.json
│   ├── ⚙️ tsconfig.node.json
│   ├── ⚙️ vercel.json
│   └── 📄 vite.config.ts
└── 📁 Server
    ├── 📁 .vercel
    │   ├── 📄 README.txt
    │   └── ⚙️ project.json
    ├── 📁 src
    │   ├── 📁 app
    │   │   ├── 📁 config
    │   │   │   └── 📄 env.ts
    │   │   ├── 📁 errorHelpers
    │   │   │   └── 📄 AppError.ts
    │   │   ├── 📁 helpers
    │   │   │   ├── 📄 handleCastError.ts
    │   │   │   ├── 📄 handleDuplicateError.ts
    │   │   │   ├── 📄 handleValidationError.ts
    │   │   │   └── 📄 handleZodError.ts
    │   │   ├── 📁 interfaces
    │   │   │   ├── 📄 error.type.ts
    │   │   │   └── 📄 index.d.ts
    │   │   ├── 📁 middlewares
    │   │   │   ├── 📄 checkAuth.ts
    │   │   │   ├── 📄 globalErrorHandler.ts
    │   │   │   ├── 📄 notFound.ts
    │   │   │   └── 📄 validateRequest.ts
    │   │   ├── 📁 modules
    │   │   │   ├── 📁 auth
    │   │   │   │   ├── 📄 auth.controller.ts
    │   │   │   │   ├── 📄 auth.route.ts
    │   │   │   │   └── 📄 auth.service.ts
    │   │   │   ├── 📁 course
    │   │   │   │   ├── 📄 course.constant.ts
    │   │   │   │   ├── 📄 course.controller.ts
    │   │   │   │   ├── 📄 course.interface.ts
    │   │   │   │   ├── 📄 course.model.ts
    │   │   │   │   ├── 📄 course.route.ts
    │   │   │   │   ├── 📄 course.service.ts
    │   │   │   │   └── 📄 course.validation.ts
    │   │   │   ├── 📁 enrollment
    │   │   │   │   ├── 📄 enrollment.constant.ts
    │   │   │   │   ├── 📄 enrollment.controller.ts
    │   │   │   │   ├── 📄 enrollment.interface.ts
    │   │   │   │   ├── 📄 enrollment.model.ts
    │   │   │   │   ├── 📄 enrollment.route.ts
    │   │   │   │   ├── 📄 enrollment.service.ts
    │   │   │   │   ├── 📄 enrollment.utils.ts
    │   │   │   │   └── 📄 enrollment.validation.ts
    │   │   │   └── 📁 user
    │   │   │       ├── 📄 user.constant.ts
    │   │   │       ├── 📄 user.controller.ts
    │   │   │       ├── 📄 user.interface.ts
    │   │   │       ├── 📄 user.model.ts
    │   │   │       ├── 📄 user.route.ts
    │   │   │       ├── 📄 user.service.ts
    │   │   │       └── 📄 user.validation.ts
    │   │   ├── 📁 routes
    │   │   │   └── 📄 index.ts
    │   │   ├── 📁 utils
    │   │   │   ├── 📁 emailTemplates
    │   │   │   │   └── 📄 registrationEmail.ejs
    │   │   │   ├── 📄 QueryBuilder.ts
    │   │   │   ├── 📄 catchAsync.ts
    │   │   │   ├── 📄 clearCookie.ts
    │   │   │   ├── 📄 hashPassword.ts
    │   │   │   ├── 📄 jwt.ts
    │   │   │   ├── 📄 seedAdmin.ts
    │   │   │   ├── 📄 sendEmail.ts
    │   │   │   ├── 📄 sendResponse.ts
    │   │   │   ├── 📄 setCookie.ts
    │   │   │   └── 📄 userTokes.ts
    │   │   └── 📄 constants.ts
    │   ├── 📄 app.ts
    │   └── 📄 server.ts
    ├── ⚙️ .gitignore
    ├── 📄 LICENSE
    ├── 📝 README.md
    ├── 📄 bun.lock
    ├── 📄 eslint.config.mjs
    ├── ⚙️ package.json
    ├── ⚙️ tsconfig.json
    └── ⚙️ vercel.json
```

Key patterns:

* Controllers handle HTTP, call Services for business logic.
* Services interact with Mongoose models.
* Middlewares: auth, errorHandler, validation.
* DTO/validation layer using Joi/Zod.

---

## Getting Started (Local)

### Prerequisites

* Node.js v18+
* npm or yarn
* MongoDB (Atlas recommended) or local instance
* (Optional) Redis for caching

### Installation

```bash
# clone
git clone https://github.com/Jaber-Riyan/CourseMaster_Client.git
cd CourseMaster_Client

# install backend deps
git clone https://github.com/Jaber-Riyan/CourseMaster_Server.git
cd CourseMaster_Server
```

### Environment Variables (example)

Create a `.env` in `/backend` and `/frontend` (if needed).

**/backend/.env.example**

```
PORT=5000
MONGO_URI=mongodb+srv://<user>:<pass>@cluster0.mongodb.net/coursemaster
JWT_SECRET=replace_with_secure_random_string
JWT_EXPIRES_IN=7d
BCRYPT_SALT=10
REDIS_URL=redis://localhost:6379  # optional
EMAIL_SMTP_HOST=smtp.example.com  # optional (Nodemailer)
EMAIL_SMTP_PORT=587
EMAIL_USER=you@example.com
EMAIL_PASS=supersecret
FRONTEND_URL=http://localhost:5073
```

### Run Dev Mode

**Backend**

```bash
cd backend
npm run dev
# (uses nodemon) -> http://localhost:5000/api/v1
```

**Frontend**

```bash
cd frontend
npm run dev
# -> http://localhost:5073
```

---

## Database Schemas (Summary)

**User**

* _id, name, email, password(hashed), role [student|admin|instructor], enrolledCourses: [{ courseId, batchId, progress }], createdAt

**Course**

* _id, title, description, instructor (ref User), price, category, tags[], syllabus: [{moduleTitle, lessons[]}], batches: [{name, startDate, endDate}], index on title, tags

**Lesson** (embedded or separate)

* title, videoUrl, duration, order

**Assignment**

* _id, courseId, moduleId, studentId, answerText, answerLink, status, grade, feedback

**Quiz / Result**

* quizSchema, questions[], studentAnswers, score

Index: text index on `title`, `description`, and index `tags`, `instructor` for faster searches.

---

## API Endpoints (Summary)

**Auth**

* `POST /api/auth/register` — register student
* `POST /api/auth/login` — returns JWT
* `POST /api/auth/logout`

**Courses**

* `GET /api/courses` — list (pagination, search, sort, filter)
* `GET /api/courses/:id` — details
* `POST /api/courses` — create (admin)
* `PUT /api/courses/:id` — update (admin)
* `DELETE /api/courses/:id` — delete (admin)

**Enrollments**

* `POST /api/courses/:id/enroll` — enroll (protected)
* `GET /api/courses/:id/enrollments` — admin only

**Lessons & Progress**

* `POST /api/courses/:courseId/lessons/:lessonId/complete` — mark complete
* `GET /api/users/:userId/progress` — dashboard

**Assignments**

* `POST /api/courses/:courseId/modules/:moduleId/assignments` — submit
* `GET /api/assignments/:id` — admin review

**Quizzes**

* `POST /api/courses/:courseId/modules/:moduleId/quiz/submit` — returns score

> Use request validation middleware (Joi/Zod) and global error handler.

---

## Authentication & Authorization

* Passwords hashed with bcrypt.
* JWT stored in HttpOnly cookie or returned in response (store in memory/localStorage on client carefully).
* Middleware `auth` to protect routes and `authorize('admin')` to protect admin routes.

Seeder: include an `admin` seeded user with a registration key or env-protected seeding.

---

## Performance & Optimization

* Use Mongoose `populate()` carefully; avoid N+1 by using bulk queries and aggregation when needed.
* Add MongoDB indexes for `title`, `tags`, `category`, `instructor`.
* Cache `/api/courses` response in Redis (Bonus). TTL ~ 60s or cache per page+query.

---

## Validation & Error Handling

* Use Joi or Zod for all request bodies.
* Global error-handling middleware that returns structured JSON `{ success: false, message, errors? }`.

---

## Admin Features & Bonus

**Batches**: Each Course can have multiple batches (startDate, endDate). Enrollments link to batches.

**Analytics (Bonus)**: Admin dashboard with enrollments over time (Recharts/Chart.js).

**Email (Bonus)**: Send welcome emails upon successful registration via Nodemailer.

**Redis (Bonus)**: Cache expensive queries.

---

## Deployment

**Frontend**: Vercel / Netlify. Set `NEXT_PUBLIC_API_URL`.
**Backend**: Render / Heroku / Vercel (if using serverless-compatible code). Ensure environment variables set and MongoDB Atlas used for production DB.
**Redis**: Use managed Redis (e.g., Upstash) if caching.

---

## Testing

* Unit tests: Jest for backend services.
* Integration tests: Supertest for API endpoints.
* E2E: Cypress for critical flows (login, enroll, mark-complete).

---

## Project Roadmap / To-do

* [ ] Payment integration (Stripe)
* [ ] Role-based instructor portal
* [ ] Video hosting & DRM
* [ ] More analytics & exportables (CSV)

---

## Contributing

1. Fork the repo
2. Create feature branch `feature/xxx`
3. Open PR with clear description

Please follow commit conventions and keep PRs small.

---

## License

MIT License

---

## Contact

Maintainer: **Your Name** — email: `you@example.com` (replace with real contact)

---

> *README generated for the CourseMaster technical assessment. Edit content (seeds, env, endpoints) to match your implemented code.*
