import { StyleSheet } from "react-native";

//import { COLORS, FONT, SIZES } from "../../../constants";

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FAFAFA",
    padding: 15,
    margin: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#E0E0E0",
    elevation: 2,
  },
  headText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#007AFF",
    textAlign: "center",
    marginBottom: 10,
  },
  heur: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
  },
  heurText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  heurText2: {
    fontSize: 16,
    color: "#007AFF",
    fontWeight: "600",
  },
});

export default styles;
