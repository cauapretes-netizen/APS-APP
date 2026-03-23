import React from "react";
import { detailsStyles, styles } from "./details";

import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from "react-native";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Ionicons } from "@expo/vector-icons";

const Stack = createStackNavigator();

export default function App() {
  const [salvaData, setSalvaData] = React.useState([]);

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{
          headerStyle: { backgroundColor: "#0F172A" },
          headerTintColor: "#fff",
          headerTitleStyle: { fontWeight: "bold" },
        }}
      >
        {/* LOGIN */}
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />

        {/* HOME */}
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ headerShown: false }}
        />

        {/* DETAILS */}
        <Stack.Screen name="Details">
          {(props) => (
            <DetailsScreen
              {...props}
              salvaData={salvaData}
              setSalvaData={setSalvaData}
            />
          )}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

////////////////////////////////////////////////////////
/* ================= LOGIN ================= */
////////////////////////////////////////////////////////

function LoginScreen({ navigation }) {
  const [nome, setNome] = React.useState("");
  const [senha, setSenha] = React.useState("");

  const handleLogin = (tipo) => {
    if (!nome || !senha) {
      alert("Preencha todos os campos!");
      return;
    }

    navigation.navigate("Home", { tipo });
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#0F172A",
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
      }}
    >
      <Text style={{ color: "#fff", fontSize: 28, marginBottom: 40 }}>
        Bem-vindo 👋
      </Text>

      <TextInput
        style={{
          backgroundColor: "#1E293B",
          padding: 15,
          width: "100%",
          borderRadius: 10,
          color: "#fff",
          marginBottom: 20,
        }}
        placeholder="Digite seu nome"
        placeholderTextColor="#94A3B8"
        value={nome}
        onChangeText={setNome}
      />

      <TextInput
        style={{
          backgroundColor: "#1E293B",
          padding: 15,
          width: "100%",
          borderRadius: 10,
          color: "#fff",
          marginBottom: 20,
        }}
        placeholder="Digite sua senha"
        placeholderTextColor="#94A3B8"
        secureTextEntry={true}
        value={senha}
        onChangeText={setSenha}
      />

      {/* CLIENTE */}
      <TouchableOpacity
        style={{
          backgroundColor: "#C9A227",
          padding: 15,
          borderRadius: 15,
          width: "100%",
          alignItems: "center",
          marginBottom: 10,
        }}
        onPress={() => handleLogin("cliente")}
      >
        <Text style={{ color: "#000", fontWeight: "bold" }}>
          Entrar como Cliente
        </Text>
      </TouchableOpacity>

      {/* BARBEIRO */}
      <TouchableOpacity
        style={{
          backgroundColor: "#1E293B",
          padding: 15,
          borderRadius: 15,
          width: "100%",
          alignItems: "center",
        }}
        onPress={() => handleLogin("barbeiro")}
      >
        <Text style={{ color: "#fff" }}>
          Entrar como Barbeiro
        </Text>
      </TouchableOpacity>
    </View>
  );
}

////////////////////////////////////////////////////////
/* ================= HOME ================= */
////////////////////////////////////////////////////////

function HomeScreen({ navigation, route }) {
  const tipo = route?.params?.tipo;

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

        {/* MOSTRA TIPO */}
        <Text style={{ color: "#C9A227", marginTop: 5 }}>
          {tipo === "barbeiro" ? "Modo Barbeiro" : "Modo Cliente"}
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

////////////////////////////////////////////////////////
/* ================= CARD ================= */
////////////////////////////////////////////////////////

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

////////////////////////////////////////////////////////
/* ================= DETAILS ================= */
////////////////////////////////////////////////////////

function DetailsScreen({ route, salvaData, setSalvaData }) {
  const { service, price, duration } = route.params;
  const [selectedTime, setSelectedTime] = React.useState(null);

  const schedule = {
    "Segunda-feira": ["14:00", "14:30", "15:00", "15:30"],
    "Terça-feira": ["14:00", "14:30", "15:00", "15:30"],
    "Quarta-feira": ["14:00", "14:30", "15:00", "15:30"],
    "Quinta-feira": ["14:00", "14:30", "15:00", "15:30"],
    "Sexta-feira": ["14:00", "14:30", "15:00", "15:30"],
    "Sábado": ["14:00", "14:30", "15:00", "15:30"],
    "Domingo": ["14:00", "14:30", "15:00"],
  };

  return (
    <ScrollView
      style={{ backgroundColor: "#0F172A" }}
      contentContainerStyle={{ padding: 20, paddingBottom: 40 }}
      showsVerticalScrollIndicator={false}
    >
      <Text style={detailsStyles.title}>Agendamento</Text>

      <View style={detailsStyles.card}>
        <Text style={detailsStyles.service}>{service}</Text>
        <Text style={detailsStyles.info}>⏱ {duration}</Text>
        <Text style={detailsStyles.info}>💰 {price}</Text>
      </View>

      {Object.keys(schedule).map((day) => (
        <View key={day} style={{ marginBottom: 20 }}>
          <Text style={{ color: "#C9A227", fontSize: 18 }}>
            {day}
          </Text>

          {schedule[day].map((time) => {
            const fullTime = `${day} ${time}`;

            return (
              <TouchableOpacity
                key={fullTime}
                onPress={() => setSelectedTime(fullTime)}
                style={{
                  backgroundColor:
                    selectedTime === fullTime ? "#C9A227" : "#1E293B",
                  padding: 12,
                  borderRadius: 10,
                  marginBottom: 8,
                }}
              >
                <Text
                  style={{
                    color: selectedTime === fullTime ? "#000" : "#fff",
                  }}
                >
                  {time}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      ))}

      <TouchableOpacity
        style={detailsStyles.button}
        onPress={() => {
          if (selectedTime) {
            const novaLista = [...salvaData, selectedTime];
            setSalvaData(novaLista);

            console.log("Agendamentos:", novaLista);

            alert("Agendamento confirmado!");
            setSelectedTime(null);
          }
        }}
      >
        <Text style={detailsStyles.buttonText}>
          {selectedTime
            ? `Confirmar ${selectedTime}`
            : "Selecione um horário"}
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
