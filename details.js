import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  header: {
    marginBottom: 30,
  },

  logoCircle: {
    width: 60,
    height: 60,
    backgroundColor: "#C9A227",
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },

  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#fff",
  },

  highlight: {
    color: "#C9A227",
  },
   subtitle: {
    color: "#94A3B8",
    marginTop: 10,
    lineHeight: 20,
  },

  card: {
    backgroundColor: "#1E293B",
    borderRadius: 20,
    marginBottom: 20,
    overflow: "hidden",
  },

  imagePlaceholder: {
    height: 180,
    backgroundColor: "#334155",
  },

  cardContent: {
    padding: 16,
  },
    cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
  },

  cardDescription: {
    color: "#94A3B8",
    marginTop: 4,
    marginBottom: 10,
  },

  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },

  duration: {
    color: "#C9A227",
  },

  priceLabel: {
    color: "#94A3B8",
    fontSize: 12,
  },
  priceRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  price: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#C9A227",
  },

  arrowButton: {
    backgroundColor: "#FDE68A",
    padding: 10,
    borderRadius: 20,
  },
});

export const detailsStyles = StyleSheet.create({
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 30,
    textAlign: "center",
  },

  card: {
    backgroundColor: "#1E293B",
    padding: 20,
    borderRadius: 20,
    marginBottom: 30,
  },

  service: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#C9A227",
    marginBottom: 15,
  },
   info: {
    color: "#fff",
    fontSize: 16,
    marginBottom: 8,
  },

  button: {
    backgroundColor: "#C9A227",
    padding: 15,
    borderRadius: 15,
    alignItems: "center",
  },

  buttonText: {
    color: "#000",
    fontWeight: "bold",
    fontSize: 16,
  },
});