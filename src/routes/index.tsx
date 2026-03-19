import { createBrowserRouter, Navigate, useParams } from 'react-router';
import { lazy, Suspense } from 'react';
import { ProtectedRoute } from './protected-route';
import { AppShell } from '@/features/shell/components/app-shell';

// Lazy-loaded pages
const LoginPage = lazy(() =>
  import('@/features/auth/pages/login-page').then((m) => ({ default: m.LoginPage }))
);
const ClientListPage = lazy(() =>
  import('@/features/clients/pages/client-list-page').then((m) => ({ default: m.ClientListPage }))
);
const ClientDetailPage = lazy(() =>
  import('@/features/clients/pages/client-detail-page').then((m) => ({ default: m.ClientDetailPage }))
);

// Lazy detail tab components
const IdentificationTab = lazy(() =>
  import('@/features/clients/components/identification-tab').then((m) => ({ default: m.IdentificationTab }))
);
const BusinessTab = lazy(() =>
  import('@/features/clients/components/business-tab').then((m) => ({ default: m.BusinessTab }))
);
const NextOfKinTab = lazy(() =>
  import('@/features/clients/components/next-of-kin-tab').then((m) => ({ default: m.NextOfKinTab }))
);
const DocumentsTab = lazy(() =>
  import('@/features/clients/components/documents-tab').then((m) => ({ default: m.DocumentsTab }))
);
const NotesTab = lazy(() =>
  import('@/features/clients/components/notes-tab').then((m) => ({ default: m.NotesTab }))
);

function SuspenseWrapper({ children }: { children: React.ReactNode }) {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center py-12">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-msacco-navy border-t-transparent" />
        </div>
      }
    >
      {children}
    </Suspense>
  );
}

export const router = createBrowserRouter([
  {
    path: '/login',
    element: (
      <SuspenseWrapper>
        <LoginPage />
      </SuspenseWrapper>
    ),
  },
  {
    element: <ProtectedRoute />,
    children: [
      {
        element: <AppShell />,
        children: [
          {
            path: '/',
            element: <Navigate to="/home" replace />,
          },
          {
            path: '/home',
            element: (
              <div className="text-center py-12">
                <h1 className="text-2xl font-bold text-msacco-navy-heading">Welcome to M-Sacco</h1>
                <p className="text-muted-foreground mt-2">Select a module from the navigation bar above.</p>
              </div>
            ),
          },
          {
            path: '/clients',
            element: (
              <SuspenseWrapper>
                <ClientListPage />
              </SuspenseWrapper>
            ),
          },
          {
            path: '/clients/:id',
            element: (
              <SuspenseWrapper>
                <ClientDetailPage />
              </SuspenseWrapper>
            ),
            children: [
              {
                index: true,
                element: <Navigate to="identification" replace />,
              },
              {
                path: 'identification',
                element: <SuspenseWrapper><ClientIdTabRoute tab="identification" /></SuspenseWrapper>,
              },
              {
                path: 'business',
                element: <SuspenseWrapper><ClientIdTabRoute tab="business" /></SuspenseWrapper>,
              },
              {
                path: 'next-of-kin',
                element: <SuspenseWrapper><ClientIdTabRoute tab="next-of-kin" /></SuspenseWrapper>,
              },
              {
                path: 'documents',
                element: <SuspenseWrapper><ClientIdTabRoute tab="documents" /></SuspenseWrapper>,
              },
              {
                path: 'notes',
                element: <SuspenseWrapper><ClientIdTabRoute tab="notes" /></SuspenseWrapper>,
              },
            ],
          },
          // Placeholder routes for other modules
          {
            path: '/groups',
            element: <Placeholder title="Groups" />,
          },
          {
            path: '/accounting',
            element: <Placeholder title="Accounting" />,
          },
          {
            path: '/products',
            element: <Placeholder title="Products" />,
          },
          {
            path: '/reports',
            element: <Placeholder title="Reports" />,
          },
          {
            path: '/admin',
            element: <Placeholder title="Admin" />,
          },
        ],
      },
    ],
  },
]);

function ClientIdTabRoute({ tab }: { tab: string }) {
  const { id } = useParams<{ id: string }>();
  const clientId = Number(id);

  switch (tab) {
    case 'identification':
      return <IdentificationTab clientId={clientId} />;
    case 'business':
      return <BusinessTab clientId={clientId} />;
    case 'next-of-kin':
      return <NextOfKinTab clientId={clientId} />;
    case 'documents':
      return <DocumentsTab clientId={clientId} />;
    case 'notes':
      return <NotesTab clientId={clientId} />;
    default:
      return null;
  }
}

function Placeholder({ title }: { title: string }) {
  return (
    <div className="text-center py-12">
      <h1 className="text-2xl font-bold text-msacco-navy-heading">{title}</h1>
      <p className="text-muted-foreground mt-2">This module is not yet implemented.</p>
    </div>
  );
}
