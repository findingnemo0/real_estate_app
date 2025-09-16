import { Account, Avatars, Client, OAuthProvider } from "appwrite";
import * as Linking from "expo-linking";

const client = new Client()
  .setEndpoint(process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT!)
  .setProject(process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID!);

export const account = new Account(client);
export const avatars = new Avatars(client);

// ✅ Login with Google OAuth
export async function login() {
  try {
    const redirectUri = Linking.createURL("/");

    await account.createOAuth2Session(
      OAuthProvider.Google,
      redirectUri,
      redirectUri
    );

    // At this point Appwrite sets the session for you.
    const user = await account.get();
    console.log("User logged in:", user);

    return {
      ...user,
      avatar: avatars.getInitials(user.name).toString(),
    };
  } catch (error) {
    console.error("Login error:", error);
    return null;
  }
}

// ✅ Logout
export async function logout() {
  try {
    await account.deleteSession("current");
    return true;
  } catch (error) {
    console.error("Logout error:", error);
    return false;
  }
}

// ✅ Get User + Avatar
export async function getCurrentUser() {
  try {
    const user = await account.get();
    return {
      ...user,
      avatar: avatars.getInitials(user.name).toString(),
    };
  } catch (error: any) {
    if (error?.code === 401) {
      // No active session
      return null;
    }
    console.error("Get user error:", error);
    return null;
  }
}
