export const validateUsername = (username: string): string | null => {
  if (!username) {
    return "Никнейм обязателен";
  }

  if (!/^[a-zA-Z]/.test(username)) {
    return "Никнейм должен начинаться с буквы";
  }

  if (!/^[a-zA-Z0-9_]+$/.test(username)) {
    return "Никнейм может содержать только латинские буквы, цифры и знак подчёркивания";
  }

  return null;
};

export const validateEmail = (email: string): string | null => {
  if (!email) {
    return "Email обязателен";
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return "Введите корректный email";
  }

  return null;
};

export const validatePassword = (password: string): string | null => {
  if (!password) {
    return "Пароль обязателен";
  }

  if (password.length < 8) {
    return "Пароль должен содержать не менее 8 символов";
  }

  return null;
};

export const validateConfirmPassword = (
  password: string,
  confirmPassword: string
): string | null => {
  if (!confirmPassword) {
    return "Подтвердите пароль";
  }

  if (password !== confirmPassword) {
    return "Пароли не совпадают";
  }

  return null;
};

export const validateName = (name: string): string | null => {
  if (!name) {
    return "Имя обязательно";
  }

  if (name.trim().length < 2) {
    return "Имя должно содержать не менее 2 символов";
  }

  return null;
};
