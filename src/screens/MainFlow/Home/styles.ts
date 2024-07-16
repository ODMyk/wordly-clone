import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        justifyContent: "space-around",
        height: "100%",
        backgroundColor: "#333945",
        padding: 24,
    },
    titleContainer: {
        height: 320,
        justifyContent: "center",
        alignItems: "center",
    },
    title: {
        fontSize: 48
    },
    statsContainer: {
        justifyContent: "center",
        alignItems: "center",
    },
    statsText: {
        color: "#fdfdfd",
        fontSize: 16,
        fontWeight: 500,
    },
    buttonContainer: {
        justifyContent: "center",
        alignItems: "center",
        height: 140,
    },
    button: {
        height: 100,
        width: "60%",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#3498DB",
        borderRadius: 8,
    },
    buttonText: {
        color: "#fdfdfd",
        fontWeight: 700,
        fontSize: 32,
    },
})