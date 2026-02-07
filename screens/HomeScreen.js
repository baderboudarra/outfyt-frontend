import {
  ActivityIndicator,
  FlatList,
  Image,
  RefreshControl,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { useCallback, useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { createOutfit, getOutfits } from "../services/api";

export default function HomeScreen() {
  const { token } = useContext(AuthContext);
  const [outfits, setOutfits] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchOutfits();
  }, []);

  const fetchOutfits = useCallback(async () => {
    if (!token) {
      setIsLoading(false);
      return;
    }

    try {
      setError("");
      const { data } = await getOutfits(token);
      setOutfits(data);
    } catch (err) {
      console.error(err);
      setError("No pudimos cargar tus outfits. Intenta nuevamente.");
    } finally {
      setIsLoading(false);
    }
  }, [token]);

  const pickImage = async () => {
    if (!token || isUploading) return;
    const result = await ImagePicker.launchImageLibraryAsync({
      quality: 1,
    });

    if (result.canceled) return;

    const image = result.assets[0];
    setIsUploading(true);

    try {
      await createOutfit(token, image, "Nuevo outfit");
      fetchOutfits();
    } catch (err) {
      console.error(err);
      setError("No pudimos subir el outfit. Intenta nuevamente.");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={pickImage} disabled={isUploading}>
        <Text style={styles.buttonText}>
          {isUploading ? "Subiendo..." : "Subir outfit"}
        </Text>
      </TouchableOpacity>

      {error ? <Text style={styles.error}>{error}</Text> : null}

      {isLoading ? (
        <ActivityIndicator size="large" />
      ) : (
        <FlatList
          data={outfits}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Image source={{ uri: item.imageUrl }} style={styles.image} />
              <Text style={styles.description}>{item.description}</Text>
            </View>
          )}
          refreshControl={
            <RefreshControl refreshing={isLoading} onRefresh={fetchOutfits} />
          }
          ListEmptyComponent={
            <Text style={styles.empty}>Todavía no tienes outfits cargados.</Text>
          }
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  button: {
    backgroundColor: "#111827",
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 12,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "600",
  },
  error: {
    color: "#b91c1c",
    marginBottom: 12,
  },
  card: {
    marginBottom: 16,
    borderRadius: 12,
    backgroundColor: "#fff",
    overflow: "hidden",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
    elevation: 3,
  },
  image: {
    width: "100%",
    height: 200,
  },
  description: {
    padding: 12,
    fontSize: 16,
  },
  empty: {
    textAlign: "center",
    color: "#6b7280",
    marginTop: 24,
  },
});








