import { Navigate, Outlet } from 'react-router-dom';

import React from 'react';

type Props = {
  children: React.ReactNode;
  user: string;
  redirectTo: string;
};

export default function ProtectedRoute({ children, user, redirectTo = '/home' }: Props) {
  if (!user) {
    return <Navigate to={redirectTo} />;
  }
  return children ? children : Outlet;
}
