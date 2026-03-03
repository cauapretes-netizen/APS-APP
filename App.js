import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Ionicons } from "@expo/vector-icons";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: { backgroundColor: "#0F172A" },
          headerTintColor: "#fff",
          headerTitleStyle: { fontWeight: "bold" },
        }}
      >
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Details"
          component={DetailsScreen}
          options={{ title: "Agendamento" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

/* ================= HOME ================= */

function HomeScreen({ navigation }) {
  return (
    <ScrollView
      style={{ backgroundColor: "#0F172A" }}
      contentContainerStyle={{
        paddingHorizontal: 16,
        paddingTop: 60,
        paddingBottom: 40,
      }}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.header}>
        <View style={styles.logoCircle}>
          <Ionicons name="cut-outline" size={28} color="#fff" />
        </View>

        <Text style={styles.title}>
          Barbearia <Text style={styles.highlight}>Premium</Text>
        </Text>

        <Text style={styles.subtitle}>
          Experiência de barbearia de alta qualidade.
          Escolha seu serviço e agende um horário.
        </Text>
      </View>

      <ServiceCard
        navigation={navigation}
        service="Barba Completa"
        description="Design de barba, aparação e hidratação"
        price="R$ 35,00"
        duration="25 minutos"
      />

      <ServiceCard
        navigation={navigation}
        service="Corte Infantil"
        description="Corte especial para crianças"
        price="R$ 35,00"
        duration="25 minutos"
      />

      <ServiceCard
        navigation={navigation}
        service="Corte Clássico"
        description="Corte tradicional com máquina e tesoura"
        price="R$ 45,00"
        duration="30 minutos"
      />
    </ScrollView>
  );
}

/* ================= CARD ================= */

function ServiceCard({ navigation, service, description, price, duration }) {
  return (
    <View style={styles.card}>
      <View style={styles.imagePlaceholder} />

      <View style={styles.cardContent}>
        <Text style={styles.cardTitle}>{service}</Text>
        <Text style={styles.cardDescription}>{description}</Text>

        <View style={styles.infoRow}>
          <Ionicons name="time-outline" size={16} color="#C9A227" />
          <Text style={styles.duration}> {duration}</Text>
        </View>

        <Text style={styles.priceLabel}>A partir de</Text>

        <View style={styles.priceRow}>
          <Text style={styles.price}>{price}</Text>

          <TouchableOpacity
            style={styles.arrowButton}
            onPress={() =>
              navigation.navigate("Details", {
                service,
                price,
                duration,
              })
            }
          >
            <Ionicons name="arrow-forward" size={18} color="#000" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

/* ================= DETAILS ================= */

function DetailsScreen({ route }) {
  const { service, price, duration } = route.params;

  return (
    <ScrollView
      style={{ backgroundColor: "#0F172A" }}
      contentContainerStyle={{
        padding: 20,
        paddingBottom: 40,
      }}
      showsVerticalScrollIndicator={false}
    >
      <Text style={detailsStyles.title}>Agendamento</Text>

      <View style={detailsStyles.card}>
        <Text style={detailsStyles.service}>{service}</Text>
        <Text style={detailsStyles.info}>⏱ Duração: {duration}</Text>
        <Text style={detailsStyles.info}>💰 Valor: {price}</Text>
      </View>

      <TouchableOpacity style={detailsStyles.button}>
        <Text style={detailsStyles.buttonText}>
          Confirmar Agendamento
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

/* ================= ESTILOS ================= */

const styles = StyleSheet.create({
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

const detailsStyles = StyleSheet.create({
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