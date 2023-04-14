import { lazy } from 'react';

export * as ProfilePage from './ProfilePage';
export const ProfileUserPage = lazy(() => import('./ProfileUserPage'));
export const ProfileSettingsPage = lazy(() => import('./ProfileSettingsPage'));
