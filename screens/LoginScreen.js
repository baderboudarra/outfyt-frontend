import { ActivityIndicator, Button, StyleSheet, Text, TextInput, View } from "react-native";
import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { login as loginRequest } from "../services/api";

export default function LoginScreen() {
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async () => {
    try {
      setIsLoading(true);
      setError("");
      const { data } = await loginRequest(email, password);
      login(data.user, data.token);
    } catch (err) {
      console.error(err);
      setError("No pudimos iniciar sesión. Revisa tus datos.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput placeholder="Email" onChangeText={setEmail} style={styles.input} />
      <TextInput
        placeholder="Password"
        secureTextEntry
        onChangeText={setPassword}
        style={styles.input}
      />
      {error ? <Text style={styles.error}>{error}</Text> : null}
      {isLoading ? <ActivityIndicator size="small" /> : null}
      <Button title="Login" onPress={handleLogin} disabled={isLoading} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    gap: 12,
  },
  input: {
    borderWidth: 1,
    borderColor: "#d1d5db",
    padding: 10,
    borderRadius: 8,
  },
  error: {
    color: "#b91c1c",
  },
});

