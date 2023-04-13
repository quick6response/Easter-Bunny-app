import { lazy } from 'react';

export const AdminModerationPage = lazy(() => import('./AdminModerationPage'));
export const AdminHomePage = lazy(() => import('./AdminHomePage'));
export const AdminModerationReportPage = lazy(
  () => import('./AdminModerationReportPage'),
);
