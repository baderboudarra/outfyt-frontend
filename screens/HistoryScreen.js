import { useContext, useEffect, useState } from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import { AuthContext } from "../context/AuthContext";
import { getOutfitHistory } from "../services/api";

export default function HistoryScreen() {
  const { token } = useContext(AuthContext);
  const [history, setHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchHistory = async () => {
      if (!token) {
        setIsLoading(false);
        return;
      }

      try {
        setError("");
        const { data } = await getOutfitHistory(token);
        setHistory(data);
      } catch (err) {
        console.error(err);
        setError("No pudimos cargar tu historial.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchHistory();
  }, [token]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Outfit History</Text>

      {isLoading ? <ActivityIndicator size="large" /> : null}
      {error ? <Text style={styles.error}>{error}</Text> : null}

      {!isLoading && history.length === 0 ? (
        <Text style={styles.empty}>Todavía no hay outfits en tu historial.</Text>
      ) : null}

      {history.map((item) => (
        <View key={item._id} style={styles.card}>
          <Text style={styles.cardText}>{item.description}</Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 20,
  },
  error: {
    color: "#b91c1c",
    marginBottom: 12,
  },
  empty: {
    color: "#6b7280",
    marginBottom: 12,
  },
  card: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 15,
    marginBottom: 15,
  },
  cardText: {
    fontSize: 16,
    color: "#111827",
  },
});

