import AsyncStorage from "@react-native-async-storage/async-storage";

// Storage keys
const TOKEN_KEY = "@StickerSmash:token";
const USER_KEY = "@StickerSmash:user";

// User interface
export interface User {
  id: string;
  fullName: string;
  email: string;
  password?: string; // Only used during registration, not stored
  userType: "patient" | "doctor";
  createdAt: string;
  updatedAt: string;
}

// Save JWT token to AsyncStorage
export const saveToken = async (token: string): Promise<void> => {
  try {
    await AsyncStorage.setItem(TOKEN_KEY, token);
  } catch (error) {
    console.error("Error saving token:", error);
  }
};

// Get JWT token from AsyncStorage
export const getToken = async (): Promise<string | null> => {
  try {
    return await AsyncStorage.getItem(TOKEN_KEY);
  } catch (error) {
    console.error("Error getting token:", error);
    return null;
  }
};

// Remove JWT token from AsyncStorage
export const removeToken = async (): Promise<void> => {
  try {
    await AsyncStorage.removeItem(TOKEN_KEY);
  } catch (error) {
    console.error("Error removing token:", error);
  }
};

// Save user data to AsyncStorage
export const saveUser = async (user: User): Promise<void> => {
  try {
    await AsyncStorage.setItem(USER_KEY, JSON.stringify(user));
  } catch (error) {
    console.error("Error saving user:", error);
  }
};

// Get user data from AsyncStorage
export const getUser = async (): Promise<User | null> => {
  try {
    const userData = await AsyncStorage.getItem(USER_KEY);
    return userData ? JSON.parse(userData) : null;
  } catch (error) {
    console.error("Error getting user:", error);
    return null;
  }
};

// Remove user data from AsyncStorage
export const removeUser = async (): Promise<void> => {
  try {
    await AsyncStorage.removeItem(USER_KEY);
  } catch (error) {
    console.error("Error removing user:", error);
  }
};

// Save both token and user data (used after successful login)
export const saveAuthData = async (
  token: string,
  user: User
): Promise<void> => {
  await saveToken(token);
  await saveUser(user);
};

// Clear all auth data (used for logout)
export const clearAuthData = async (): Promise<void> => {
  await removeToken();
  await removeUser();
};

// Check if user is authenticated
export const isAuthenticated = async (): Promise<boolean> => {
  const token = await getToken();
  return !!token;
};
