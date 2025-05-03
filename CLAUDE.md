# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Structure
- Backend: Laravel PHP framework (PHP 8.2+)
- Frontend: React with Next.js and TypeScript (using SPA mode for initial phase)

## Build/Test Commands
### Backend (Laravel)
- `cd backend && php artisan serve` - Start development server
- `cd backend && php artisan test` - Run all tests
- `cd backend && php artisan test --filter=TestName` - Run specific test
- `cd backend && composer install` - Install dependencies
- `cd backend && php artisan migrate` - Run database migrations
- `cd backend && ./vendor/bin/pint` - Run PHP code style fixer

### Frontend (Next.js)
- `cd frontend && npm run dev` - Start development server
- `cd frontend && npm run build` - Build for production
- `cd frontend && npm run lint` - Run ESLint
- `cd frontend && npm run typecheck` - Type checking with TypeScript
- `cd frontend && npm start` - Run in production mode

## Code Style Guidelines
- **PHP:** Follow Laravel conventions and PSR standards with Laravel Pint
- **TypeScript/React:** Follow ESLint config with React, TypeScript, and a11y plugins
- **Error Handling:** Use try/catch blocks and descriptive error messages
- **Naming:** Use camelCase for JavaScript/TypeScript, snake_case for PHP variables
- **Imports:** Group and order imports by type (React, components, utilities)
- **Types:** Always use proper TypeScript types; avoid `any`
- **Components:** Use functional components with hooks in React
- **Styles:** Use Tailwind CSS for styling

