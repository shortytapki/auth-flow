import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "@/shared/lib/hooks";
import { Input, Button } from "@/shared/ui";
import { registerUser } from "../../model/slice";
import { type RegistrationData } from "../../model/types";
import {
  validateName,
  validateUsername,
  validateEmail,
  validatePassword,
  validateConfirmPassword,
} from "@/shared/lib/validation";

interface RegistrationFormProps {
  onSuccess: (password: string) => void;
}

export const RegistrationForm: React.FC<RegistrationFormProps> = ({
  onSuccess,
}) => {
  const dispatch = useAppDispatch();
  const { isLoading, error } = useAppSelector((state) => state.auth);

  const [formData, setFormData] = useState<RegistrationData>({
    name: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState<Partial<RegistrationData>>({});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (errors[name as keyof RegistrationData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<RegistrationData> = {};

    const nameError = validateName(formData.name);
    if (nameError) newErrors.name = nameError;

    const usernameError = validateUsername(formData.username);
    if (usernameError) newErrors.username = usernameError;

    const emailError = validateEmail(formData.email);
    if (emailError) newErrors.email = emailError;

    const passwordError = validatePassword(formData.password);
    if (passwordError) newErrors.password = passwordError;

    const confirmPasswordError = validateConfirmPassword(
      formData.password,
      formData.confirmPassword
    );
    if (confirmPasswordError) newErrors.confirmPassword = confirmPasswordError;

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const result = await dispatch(registerUser(formData));
    if (registerUser.fulfilled.match(result)) {
      onSuccess(formData.password);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      )}

      <Input
        type="text"
        name="name"
        label="Имя для отображения"
        value={formData.name}
        onChange={handleInputChange}
        placeholder="Введите ваше имя"
        error={errors.name}
      />

      <Input
        type="text"
        name="username"
        label="Никнейм"
        value={formData.username}
        onChange={handleInputChange}
        placeholder="Введите никнейм"
        error={errors.username}
      />

      <Input
        type="email"
        name="email"
        label="Email"
        value={formData.email}
        onChange={handleInputChange}
        placeholder="Введите email"
        error={errors.email}
      />

      <Input
        type="password"
        name="password"
        label="Пароль"
        value={formData.password}
        onChange={handleInputChange}
        placeholder="Введите пароль"
        error={errors.password}
      />

      <Input
        type="password"
        name="confirmPassword"
        label="Повторить пароль"
        value={formData.confirmPassword}
        onChange={handleInputChange}
        placeholder="Повторите пароль"
        error={errors.confirmPassword}
      />

      <Button type="submit" disabled={isLoading} fullWidth>
        {isLoading ? "Регистрация..." : "Зарегистрироваться"}
      </Button>
    </form>
  );
};
