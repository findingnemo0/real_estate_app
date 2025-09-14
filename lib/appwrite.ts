import { Account, Avatars, Client, OAuthProvider } from "appwrite";
import * as Linking from "expo-linking";
import * as WebBrowser from "expo-web-browser";

const client = new Client()
  .setEndpoint(process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT!)
  .setProject(process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID!);

export const account = new Account(client);
export const avatars = new Avatars(client);

// ✅ Login with Google OAuth
export async function login() {
  try {
    const redirectUri = Linking.createURL("/");

    // Opens Appwrite OAuth session (redirects user to Google login)
    await account.createOAuth2Session(
      OAuthProvider.Google,
      redirectUri,
      redirectUri
    );

    // At this point Appwrite sets the session for you.
    const user = await account.get();
    console.log("User logged in:", user);

    return user;
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
export async function getUser() {
  try {
    const user = await account.get();
    const userAvatar = avatars.getInitials(user.name);

    return {
      ...user,
      avatar: userAvatar.toString(),
    };
  } catch (error) {
    console.error("Get user error:", error);
    return null;
  }
}
