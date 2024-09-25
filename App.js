import { useState, useEffect } from "react";
import { FlatList, SafeAreaView, StyleSheet, Text, View, Platform } from "react-native";
import axios from "axios";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function App() {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/todos")
      .then((response) => {
        setComments(response.data);
      })
      .catch((e) => {
        console.error("Error fetching data: ", e);
      });
  },[]);

  // Item renderer for FlatList
  const renderItem = ({ item }) => (
    <View style={styles.todoItem}>
      <Text style={styles.idNames}>User ID: {item.userId}</Text>
      {/* <Text style={styles.idNames}>ID: {item.id}</Text> */}
      <Text style={styles.title}>{item.title}</Text>
      <Text
        style={[
          styles.completed,
          { color: item.completed ? "#4CAF50" : "#FF6347" }, // Change color based on completion
        ]}
      >
        {item.completed ? "✓ Completed" : "✗ Not Completed"}
      </Text>
    </View>
  );

  // Key extractor for FlatList
  const keyExtractor = (item) => item.id.toString();

  return (
    <SafeAreaProvider style={styles.container}>
      <SafeAreaView>
        <FlatList style={styles.listContentContainer}
          data={comments}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
        />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 6,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  listContentContainer: {
    top: Platform.OS === "ios" ? 10 : 60,
    paddingBottom: 20, 
    paddingHorizontal: 6, 
  },
  todoItem: {
    backgroundColor: "#fff",
    padding: 20,
    marginVertical: 10,
    marginHorizontal: 16,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  idNames: {
    fontSize: 14,
    fontWeight: "600",
    color: "#555",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    marginVertical: 4,
  },
  completed: {
    fontSize: 16,
    color: "#4CAF50",
    marginTop: 4,
    fontWeight: "500",
  },
});