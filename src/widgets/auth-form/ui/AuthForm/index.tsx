import React, { useState } from "react";
import { useAppSelector, useAppDispatch } from "@/shared/lib/hooks";
import { Modal, Button } from "@/shared/ui";
import { RegistrationForm } from "@/features/auth/ui/RegistrationForm";
import { VerificationForm } from "@/features/auth/ui/VerificationForm";
import { LoginForm } from "@/features/auth/ui";
import { clearError, loginUser } from "@/features/auth";

export const AuthForm: React.FC = () => {
  const { registrationEmail, isLoading, error } = useAppSelector(
    (state) => state.auth
  );
  const dispatch = useAppDispatch();
  const [showRegistrationModal, setShowRegistrationModal] = useState(false);
  const [showVerificationModal, setShowVerificationModal] = useState(false);
  const [registrationPassword, setRegistrationPassword] = useState("");
  const [loginData, setLoginData] = useState({ email: "", password: "" });

  const handleRegistrationSuccess = (password: string) => {
    setRegistrationPassword(password);
    setShowRegistrationModal(false);
    setShowVerificationModal(true);
  };

  const handleVerificationSuccess = () => {
    setShowVerificationModal(false);
    setRegistrationPassword("");
  };

  const handleOpenRegistrationModal = () => {
    dispatch(clearError());
    setShowRegistrationModal(true);
  };

  const handleLoginInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginData((prev) => ({ ...prev, [name]: value }));
    if (error) dispatch(clearError());
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    await dispatch(loginUser(loginData));
  };

  return (
    <>
      <div className="min-h-screen bg-gray-100 flex items-center justify-center py-8">
        <div className="max-w-md w-full mx-4">
          <div className="bg-white rounded-lg shadow-md p-8">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-gray-800 mb-2">
                Добро пожаловать
              </h1>
              <p className="text-gray-600 mb-6">
                Войдите или зарегистрируйтесь, чтобы начать работу
              </p>
              <form onSubmit={handleLogin} className="space-y-4">
                {error && (
                  <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                    {error}
                  </div>
                )}
                <LoginForm
                  onChange={handleLoginInputChange}
                  values={loginData}
                  disableSubmit
                />
                <Button
                  type="submit"
                  size="lg"
                  variant="primary"
                  fullWidth
                  disabled={isLoading}
                >
                  {isLoading ? "Вход..." : "Войти"}
                </Button>
              </form>
            </div>
            <div className="flex gap-4 mt-6">
              <Button
                onClick={handleOpenRegistrationModal}
                size="lg"
                variant="secondary"
                fullWidth
              >
                Зарегистрироваться
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Registration Modal */}
      <Modal
        isOpen={showRegistrationModal}
        onClose={() => {
          dispatch(clearError());
          setShowRegistrationModal(false);
        }}
        title="Регистрация"
      >
        <RegistrationForm onSuccess={handleRegistrationSuccess} />
      </Modal>

      {/* Verification Modal */}
      <Modal
        isOpen={showVerificationModal}
        onClose={() => {
          dispatch(clearError());
          setShowVerificationModal(false);
        }}
        title="Подтверждение email"
      >
        <VerificationForm
          email={registrationEmail || ""}
          password={registrationPassword}
          onSuccess={handleVerificationSuccess}
        />
      </Modal>
    </>
  );
};
