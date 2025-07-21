# Personal Portfolio Website

## Overview

This is a personal portfolio website for Arshin Sikka, built with a modern full-stack architecture using React, TypeScript, Express, and PostgreSQL. The application showcases a professional portfolio with a clean, responsive design using shadcn/ui components and Tailwind CSS.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Styling**: Tailwind CSS with shadcn/ui component library
- **State Management**: TanStack Query (React Query) for server state
- **Routing**: Wouter for client-side routing
- **Build Tool**: Vite for fast development and optimized builds

### Backend Architecture
- **Framework**: Express.js with TypeScript
- **Runtime**: Node.js with ES modules
- **Database**: PostgreSQL with Neon serverless driver
- **Database ORM**: Drizzle ORM with PostgreSQL dialect
- **Session Storage**: PostgreSQL-backed sessions using connect-pg-simple
- **Development**: tsx for TypeScript execution in development

### Key Components

1. **Database Layer**
   - Drizzle ORM for type-safe database operations
   - PostgreSQL as the primary database
   - Schema definition in `shared/schema.ts` for type sharing between client and server
   - Migrations managed by Drizzle Kit

2. **API Layer**
   - RESTful API with Express.js
   - Routes prefixed with `/api`
   - Centralized error handling middleware
   - Request/response logging for API endpoints

3. **Frontend Components**
   - shadcn/ui component system with Radix UI primitives
   - Responsive design with mobile-first approach
   - Hero section with profile image and contact buttons
   - Toast notifications and tooltips for user feedback

4. **Development Tools**
   - Replit-specific plugins for development environment
   - Hot module replacement with Vite
   - TypeScript checking and path aliases
   - PostCSS with Tailwind CSS processing

## Data Flow

1. **Client Requests**: React components make API calls using TanStack Query
2. **API Processing**: Express routes handle requests with middleware for logging and error handling
3. **Database Operations**: Drizzle ORM manages database interactions with type safety
4. **Response Handling**: JSON responses with standardized error handling
5. **State Management**: Client-side state managed by React Query with optimistic updates

## External Dependencies

### UI and Styling
- Radix UI for accessible component primitives
- Tailwind CSS for utility-first styling
- Lucide React for consistent iconography
- Class Variance Authority for component variant management

### Data and API
- Neon Database serverless PostgreSQL driver
- TanStack Query for server state management
- React Hook Form with Zod resolvers for form validation
- Date-fns for date manipulation

### Development
- Vite for build tooling and development server
- ESBuild for production bundling
- TypeScript for type safety across the stack

## Deployment Strategy

### Development
- Local development with Vite dev server
- Hot module replacement for fast iteration
- TypeScript checking with tsc
- Database schema changes via `drizzle-kit push`

### Production Build
1. Frontend build with Vite to `dist/public`
2. Backend bundling with ESBuild to `dist/index.js`
3. Static file serving from Express in production
4. Environment-based configuration for database connections

### Database Management
- Environment variable-based database URL configuration
- Migration files generated in `./migrations` directory
- Schema-first approach with shared types between client and server
- PostgreSQL-compatible session storage for scalability

The architecture emphasizes type safety, developer experience, and maintainability while providing a solid foundation for a professional portfolio website that can scale and evolve over time.