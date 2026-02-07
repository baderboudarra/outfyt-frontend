import { useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";

export default function HistoryScreen({ route }) {
  const { user } = route.params;
  const [history, setHistory] = useState([]);

  useEffect(() => {
    fetch(`fetch("https://outfyt-backend.onrender.com/api/outfit/history");`)
      .then((res) => res.json())
      .then(setHistory);
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Outfit History</Text>

      {history.map((item, index) => (
        <View key={index} style={styles.card}>
          <Text>{item.description}</Text>
        </View>
      ))}
    </ScrollView>
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
  card: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 15,
    marginBottom: 15,
  },
});

