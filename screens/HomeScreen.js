import { View, Text, Button, Image, ScrollView } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";

export default function HomeScreen() {
  const { token } = useContext(AuthContext);
  const [outfits, setOutfits] = useState([]);

  useEffect(() => {
    fetchOutfits();
  }, []);

  const fetchOutfits = async () => {
    const res = await fetch(
      "https://outfyt-backend.onrender.com/api/outfits",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    setOutfits(await res.json());
  };

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      quality: 1,
    });

    if (result.canceled) return;

    const image = result.assets[0];

    const formData = new FormData();
    formData.append("image", {
      uri: image.uri,
      name: "outfit.jpg",
      type: "image/jpeg",
    });
    formData.append("description", "Nuevo outfit");

    await fetch(
      "https://outfyt-backend.onrender.com/api/outfits",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      }
    );

    fetchOutfits();
  };

  return (
    <ScrollView>
      <Button title="Subir outfit" onPress={pickImage} />

      {outfits.map((o) => (
        <View key={o._id}>
          <Image
            source={{ uri: o.imageUrl }}
            style={{ width: "100%", height: 200 }}
          />
          <Text>{o.description}</Text>
        </View>
      ))}
    </ScrollView>
  );
}








