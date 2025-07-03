import React from "react";
import { Input } from "@/shared/ui";
import type { LoginData } from "../../model/types";

interface LoginFormProps {
  values: LoginData;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disableSubmit?: boolean;
}

export const LoginForm: React.FC<LoginFormProps> = ({ values, onChange }) => {
  return (
    <>
      <Input
        type="email"
        name="email"
        label="Email"
        value={values.email}
        onChange={onChange}
        placeholder="Введите email"
        required
      />
      <Input
        type="password"
        name="password"
        label="Пароль"
        value={values.password}
        onChange={onChange}
        placeholder="Введите пароль"
        required
      />
    </>
  );
};
