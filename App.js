import { AuthProvider } from "./context/AuthContext";
import HomeScreen from "./screens/HomeScreen";

export default function App() {
  return (
    <AuthProvider>
      <HomeScreen />
    </AuthProvider>
  );
}





