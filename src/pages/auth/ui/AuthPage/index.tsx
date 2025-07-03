import React from "react";
import { useAppSelector } from "@/shared/lib/hooks";
import { AuthForm } from "@/widgets/auth-form/ui/AuthForm";
import { UserProfile } from "@/entities/user/ui/UserProfile";
import { logout } from "@/features/auth/model/slice";
import { useAppDispatch } from "@/shared/lib/hooks";

export const AuthPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { isAuthenticated, user } = useAppSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
  };

  if (isAuthenticated && user) {
    return (
      <div className="min-h-screen bg-gray-100 py-8">
        <div className="container mx-auto px-4">
          <UserProfile user={user} onLogout={handleLogout} />
        </div>
      </div>
    );
  }

  return <AuthForm />;
};
