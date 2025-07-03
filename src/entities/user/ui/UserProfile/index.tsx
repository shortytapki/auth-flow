import React from "react";
import { Button } from "@/shared/ui";
import type { User } from "../../model/types";

interface UserProfileProps {
  user: User;
  onLogout: () => void;
}

export const UserProfile: React.FC<UserProfileProps> = ({ user, onLogout }) => {
  return (
    <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-6">
      <div className="text-center mb-6">
        <div className="w-24 h-24 mx-auto mb-4 bg-gray-200 rounded-full flex items-center justify-center">
          {user.photo ? (
            <img
              src={user.photo}
              alt={user.name}
              className="w-24 h-24 rounded-full object-cover"
            />
          ) : (
            <span className="text-3xl text-gray-500">
              {user.name.charAt(0).toUpperCase()}
            </span>
          )}
        </div>
        <h2 className="text-2xl font-bold text-gray-800">{user.name}</h2>
        <p className="text-gray-600">@{user.username}</p>
        <p className="text-gray-600">{user.email}</p>
      </div>

      <div className="space-y-4">
        <div className="border-t pt-4">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            Информация о пользователе
          </h3>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-600">Имя:</span>
              <span className="font-medium">{user.name}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Username:</span>
              <span className="font-medium">@{user.username}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Email:</span>
              <span className="font-medium">{user.email}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Токены:</span>
              <span className="font-medium">{user.tokens}</span>
            </div>
          </div>
        </div>

        <Button onClick={onLogout} variant="danger" fullWidth>
          Выйти
        </Button>
      </div>
    </div>
  );
};
