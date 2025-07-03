import React from "react";
import { AppProviders } from "@/app/providers";
import { AuthPage } from "@/pages/auth/ui/AuthPage";

const App: React.FC = () => {
  return (
    <AppProviders>
      <AuthPage />
    </AppProviders>
  );
};

export default App;
