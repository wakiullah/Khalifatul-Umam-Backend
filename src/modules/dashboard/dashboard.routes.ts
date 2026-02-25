/**
 * DEPRECATED - This file is kept for backward compatibility
 * 
 * Use dashboard-protected.routes.ts instead
 * 
 * Route structure changed:
 * - Public GET routes moved to /api/v1/public/*
 * - Protected write operations in /api/v1/dashboard/*
 * 
 * See dashboard-protected.routes.ts for the current implementation
 */

// Re-export for backward compatibility
export { default } from './dashboard-protected.routes';
