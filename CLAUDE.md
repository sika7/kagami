# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Structure
- Backend: Laravel PHP framework
- Frontend: React with Remix and TypeScript

## Build/Test Commands
### Backend (Laravel)
- `cd backend && php artisan serve` - Start development server
- `cd backend && php artisan test` - Run all tests
- `cd backend && php artisan test --filter=TestName` - Run specific test
- `cd backend && composer install` - Install dependencies

### Frontend (Remix)
- `cd frontend && npm run dev` - Start development server
- `cd frontend && npm run build` - Build for production
- `cd frontend && npm run lint` - Run ESLint
- `cd frontend && npm run typecheck` - Type checking with TypeScript
- `cd frontend && npm test` - Run tests (if configured)

## Code Style Guidelines
- **PHP:** Follow Laravel conventions and PSR standards
- **TypeScript/React:** Follow ESLint config with React, TypeScript, and a11y plugins
- **Error Handling:** Use try/catch blocks and descriptive error messages
- **Naming:** Use camelCase for JavaScript/TypeScript, snake_case for PHP variables
- **Imports:** Group and order imports by type (React, components, utilities)
- **Types:** Always use proper TypeScript types; avoid `any`