import { useGlobalContext } from "@/lib/global-provider";
import { Redirect, Slot } from "expo-router";
import { ActivityIndicator, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function AppLayout() {
  const { loading, isLogged } = useGlobalContext();

  // ✅ Show loader while fetching user
  if (loading) {
    return (
      <SafeAreaView className="bg-white h-full flex justify-center items-center">
        <ActivityIndicator size="large" color="#4F46E5" />
      </SafeAreaView>
    );
  }

  // ✅ Redirect if not logged in
  if (!isLogged) return <Redirect href="/sign-in" />;

  // ✅ Otherwise render app
  return (
    <View style={{ flex: 1 }}>
      <Slot />
    </View>
  );
}
