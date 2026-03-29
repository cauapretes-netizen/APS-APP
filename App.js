import React from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Image,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Ionicons } from "@expo/vector-icons";
import { styles, colors } from "./details";

const Stack = createStackNavigator();

export default function App() {
  const [salvaData, setSalvaData] = React.useState([]);

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{
          headerStyle: { backgroundColor: colors.bg },
          headerTintColor: colors.textPrimary,
          headerTitleStyle: { fontWeight: "bold" },
        }}
      >
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Cadastro" component={CadastroScreen} options={{ title: "Criar Conta" }} />
        <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Details">
          {(props) => (
            <DetailsScreen {...props} salvaData={salvaData} setSalvaData={setSalvaData} />
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
    if (!nome || !senha) { alert("Preencha todos os campos!"); return; }
    navigation.navigate("Home", { tipo });
  };

  return (
    <View style={styles.screenCenter}>
      <View style={styles.iconCircle}>
        <Ionicons name="cut-outline" size={36} color={colors.gold} />
      </View>

      <Text style={styles.welcomeText}>Bem-vindo 👋</Text>

      <TextInput
        style={styles.input}
        placeholder="Digite seu nome"
        placeholderTextColor={colors.textSecondary}
        value={nome}
        onChangeText={setNome}
      />

      <TextInput
        style={styles.input}
        placeholder="Digite sua senha"
        placeholderTextColor={colors.textSecondary}
        secureTextEntry
        value={senha}
        onChangeText={setSenha}
      />

      <TouchableOpacity style={styles.primaryButton} onPress={() => handleLogin("cliente")}>
        <Text style={styles.primaryButtonText}>Entrar</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.linkRow} onPress={() => navigation.navigate("Cadastro")}>
        <Text style={styles.linkText}>
          Não tem conta?{" "}
          <Text style={styles.linkHighlight}>Cadastre-se</Text>
        </Text>
      </TouchableOpacity>
    </View>
  );
}

////////////////////////////////////////////////////////
/* ================= CADASTRO ================= */
////////////////////////////////////////////////////////

function CadastroScreen({ navigation }) {
  const [nome, setNome] = React.useState("");
  const [senha, setSenha] = React.useState("");
  const [confirmarSenha, setConfirmarSenha] = React.useState("");
  const [tipo, setTipo] = React.useState("cliente");

  const handleCadastro = () => {
    if (!nome || !senha || !confirmarSenha) { alert("Preencha todos os campos!"); return; }
    if (senha !== confirmarSenha) { alert("As senhas não coincidem!"); return; }
    alert(`Cadastro realizado como ${tipo === "barbeiro" ? "Barbeiro ✂️" : "Cliente 👤"}!`);
    navigation.navigate("Login");
  };

  return (
    <View style={styles.screenCenter}>
      <View style={styles.iconCircle}>
        <Ionicons name="cut-outline" size={36} color={colors.gold} />
      </View>

      <Text style={styles.welcomeText}>Criar Conta ✂️</Text>

      <TextInput style={styles.inputSmall} placeholder="Digite seu nome" placeholderTextColor={colors.textSecondary} value={nome} onChangeText={setNome} />
      <TextInput style={styles.inputSmall} placeholder="Digite sua senha" placeholderTextColor={colors.textSecondary} secureTextEntry value={senha} onChangeText={setSenha} />
      <TextInput style={styles.inputSmall} placeholder="Confirme sua senha" placeholderTextColor={colors.textSecondary} secureTextEntry value={confirmarSenha} onChangeText={setConfirmarSenha} />

      <View style={{ width: "100%", marginBottom: 25 }}>
        <Text style={styles.checkboxLabel}>Cadastrar como:</Text>

        <View style={styles.checkboxRow}>
          {["cliente", "barbeiro"].map((t) => (
            <TouchableOpacity key={t} onPress={() => setTipo(t)} style={styles.checkboxCard(tipo === t)}>
              <View style={styles.checkboxBox(tipo === t)}>
                {tipo === t && <Text style={styles.checkboxCheck}>✓</Text>}
              </View>
              <View>
                <Text style={styles.checkboxTitle}>{t === "cliente" ? "👤 Cliente" : "✂️ Barbeiro"}</Text>
                <Text style={styles.checkboxSub}>{t === "cliente" ? "Agendar serviços" : "Gerenciar agenda"}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <TouchableOpacity style={styles.primaryButton} onPress={handleCadastro}>
        <Text style={styles.primaryButtonText}>Cadastrar</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.linkRow} onPress={() => navigation.goBack()}>
        <Text style={styles.linkText}>
          Já tem conta?{" "}
          <Text style={styles.linkHighlight}>Entrar</Text>
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
      style={{ backgroundColor: colors.bg }}
      contentContainerStyle={{ paddingHorizontal: 16, paddingTop: 60, paddingBottom: 40 }}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.homeHeader}>
        <View style={styles.homeIconCircle}>
          <Ionicons name="cut-outline" size={28} color={colors.textPrimary} />
        </View>
        <Text style={styles.homeTitle}>
          Barbearia <Text style={styles.homeHighlight}>Premium</Text>
        </Text>
        <Text style={styles.homeTipo}>{tipo === "barbeiro" ? "Modo Barbeiro" : "Modo Cliente"}</Text>
        <Text style={styles.homeSubtitle}>
          Experiência de barbearia de alta qualidade. Escolha seu serviço e agende um horário.
        </Text>
      </View>

      <ServiceCard navigation={navigation} service="Barba Completa" description="Design de barba, aparação e hidratação" price="R$ 35,00" duration="25 minutos" image="https://images.unsplash.com/photo-1621605815971-fbc98d665033?w=800" />
      <ServiceCard navigation={navigation} service="Corte Infantil" description="Corte especial para crianças" price="R$ 35,00" duration="25 minutos" image="https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=800" />
      <ServiceCard navigation={navigation} service="Corte Clássico" description="Corte tradicional com máquina e tesoura" price="R$ 45,00" duration="30 minutos" image="https://images.unsplash.com/photo-1622286342621-4bd786c2447c?w=800" />
    </ScrollView>
  );
}

////////////////////////////////////////////////////////
/* ================= CARD ================= */
////////////////////////////////////////////////////////

function ServiceCard({ navigation, service, description, price, duration, image }) {
  return (
    <View style={styles.card}>
      {image ? (
        <Image source={{ uri: image }} style={styles.cardImage} resizeMode="cover" />
      ) : (
        <View style={styles.cardImagePlaceholder}>
          <Ionicons name="image-outline" size={40} color={colors.placeholder} />
          <Text style={styles.cardImagePlaceholderText}>Sem imagem</Text>
        </View>
      )}

      <View style={styles.cardBody}>
        <Text style={styles.cardTitle}>{service}</Text>
        <Text style={styles.cardDescription}>{description}</Text>

        <View style={styles.cardDurationRow}>
          <Ionicons name="time-outline" size={16} color={colors.gold} />
          <Text style={styles.cardDurationText}>{duration}</Text>
        </View>

        <Text style={styles.cardPriceLabel}>A partir de</Text>

        <View style={styles.cardPriceRow}>
          <Text style={styles.cardPrice}>{price}</Text>
          <TouchableOpacity style={styles.cardArrowButton} onPress={() => navigation.navigate("Details", { service, price, duration })}>
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
      style={{ backgroundColor: colors.bg }}
      contentContainerStyle={{ padding: 20, paddingBottom: 40 }}
      showsVerticalScrollIndicator={false}
    >
      <Text style={styles.detailsTitle}>Agendamento</Text>

      <View style={styles.detailsCard}>
        <Text style={styles.detailsService}>{service}</Text>
        <Text style={styles.detailsInfo}>⏱ {duration}</Text>
        <Text style={styles.detailsInfo}>💰 {price}</Text>
      </View>

      {Object.keys(schedule).map((day) => (
        <View key={day} style={{ marginBottom: 20 }}>
          <Text style={styles.detailsDayTitle}>{day}</Text>

          {schedule[day].map((time) => {
            const fullTime = `${day} ${time}`;
            return (
              <TouchableOpacity
                key={fullTime}
                onPress={() => setSelectedTime(fullTime)}
                style={styles.detailsTimeButton(selectedTime === fullTime)}
              >
                <Text style={styles.detailsTimeText(selectedTime === fullTime)}>{time}</Text>
              </TouchableOpacity>
            );
          })}
        </View>
      ))}

      <TouchableOpacity
        style={styles.detailsConfirmButton(!!selectedTime)}
        onPress={() => {
          if (selectedTime) {
            setSalvaData([...salvaData, selectedTime]);
            alert("Agendamento confirmado!");
            setSelectedTime(null);
          }
        }}
      >
        <Text style={styles.detailsConfirmText(!!selectedTime)}>
          {selectedTime ? `Confirmar ${selectedTime}` : "Selecione um horário"}
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
