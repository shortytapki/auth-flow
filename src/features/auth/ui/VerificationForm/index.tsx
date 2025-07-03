import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "@/shared/lib/hooks";
import { Input, Button } from "@/shared/ui";
import { verifyCode, loginUser } from "../../model/slice";
import type { VerificationData, LoginData } from "../../model/types";

interface VerificationFormProps {
  email: string;
  password: string;
  onSuccess: () => void;
}

export const VerificationForm: React.FC<VerificationFormProps> = ({
  email,
  password,
  onSuccess,
}) => {
  const dispatch = useAppDispatch();
  const { isLoading, error } = useAppSelector((state) => state.auth);

  const [code, setCode] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!code.trim()) {
      return;
    }

    const verificationData: VerificationData = {
      code: code.trim(),
      email,
    };

    const verifyResult = await dispatch(verifyCode(verificationData));

    if (verifyCode.fulfilled.match(verifyResult)) {
      const loginData: LoginData = {
        email,
        password,
      };

      const loginResult = await dispatch(loginUser(loginData));
      if (loginUser.fulfilled.match(loginResult)) {
        onSuccess();
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      )}

      <div className="text-center mb-4">
        <p className="text-gray-600">
          Код подтверждения отправлен на <strong>{email}</strong>
        </p>
      </div>

      <Input
        type="text"
        label="Код подтверждения"
        value={code}
        onChange={(e) => setCode(e.target.value)}
        placeholder="Введите код из письма"
        maxLength={6}
      />

      <Button type="submit" disabled={isLoading || !code.trim()} fullWidth>
        {isLoading ? "Проверка..." : "Подтвердить"}
      </Button>
    </form>
  );
};
