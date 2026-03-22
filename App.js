import React from 'react';
import { detailsStyles, styles } from './details';
import { TextInput } from 'react-native';

import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
} from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';

const Stack = createStackNavigator();


export default function App() {
  const [salvaData, setSalvaData] = React.useState([]);

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: { backgroundColor: '#0F172A' },
          headerTintColor: '#fff',
          headerTitleStyle: { fontWeight: 'bold' },
        }}
      >
        {/* NOVA TELA LOGIN */}
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ headerShown: false }}
        />

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
  const [nome, setNome] = React.useState('');
  const [senha, setSenha] = React.useState('');

  const handleLogin = () => {
    // validação
    if (!nome || !senha) {
      alert('Preencha todos os campos!');
      return;
    }

    // se estiver tudo preenchido
    navigation.navigate('Home');
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#0F172A',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
      }}
    >
      <Text style={{ color: '#fff', fontSize: 28, marginBottom: 40 }}>
        Bem-vindo 👋
      </Text>

      {/* INPUT NOME */}
      <TextInput
        style={{
          backgroundColor: '#1E293B',
          padding: 15,
          width: '100%',
          borderRadius: 10,
          color: '#fff',
          marginBottom: 20,
        }}
        placeholder="Digite seu nome"
        placeholderTextColor="#94A3B8"
        value={nome}
        onChangeText={setNome}
      />

      {/* INPUT SENHA */}
      <TextInput
        style={{
          backgroundColor: '#1E293B',
          padding: 15,
          width: '100%',
          borderRadius: 10,
          color: '#fff',
          marginBottom: 20,
        }}
        placeholder="Digite sua senha"
        placeholderTextColor="#94A3B8"
        secureTextEntry={true}
        value={senha}
        onChangeText={setSenha}
      />

      {/* ESCOLHA DE TIPO */}
      <TouchableOpacity
        style={{
          backgroundColor: '#C9A227',
          padding: 15,
          borderRadius: 15,
          width: '100%',
          alignItems: 'center',
          marginBottom: 10,
        }}
        onPress={handleLogin}
      >
        <Text style={{ color: '#fff' }}>
          Entrar como Cliente
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={{
          backgroundColor: '#C9A227',
          padding: 15,
          borderRadius: 15,
          width: '100%',
          alignItems: 'center',
        }}
        onPress={handleLogin}
      >
        <Text style={{ color: '#fff' }}>
          Entrar como Barbeiro
        </Text>
      </TouchableOpacity>
    </View>
  );
}

////////////////////////////////////////////////////////
/* ================= HOME ================= */
////////////////////////////////////////////////////////

function HomeScreen({ navigation }) {
  return (
    <ScrollView
      style={{ backgroundColor: '#0F172A' }}
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
          Escolha seu serviço e agende um horário.
        </Text>
      </View>

      <ServiceCard
        navigation={navigation}
        service="Barba Completa"
        description="Design de barba"
        price="R$ 35,00"
        duration="25 minutos"
      />

      <ServiceCard
        navigation={navigation}
        service="Corte Infantil"
        description="Corte para crianças"
        price="R$ 35,00"
        duration="25 minutos"
      />

      <ServiceCard
        navigation={navigation}
        service="Corte Clássico"
        description="Corte tradicional"
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
              navigation.navigate('Details', {
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
    Segunda: ['14:00', '14:30', '15:00'],
    Terça: ['14:00', '14:30', '15:00'],
    Quarta: ['14:00', '14:30', '15:00'],
  };

  return (
    <ScrollView
      style={{ backgroundColor: '#0F172A' }}
      contentContainerStyle={{ padding: 20 }}
    >
      <Text style={detailsStyles.title}>Agendamento</Text>

      {Object.keys(schedule).map((day) => (
        <View key={day}>
          <Text style={{ color: '#C9A227', marginTop: 10 }}>{day}</Text>

          {schedule[day].map((time) => {
            const full = `${day} ${time}`;

            return (
              <TouchableOpacity
                key={full}
                onPress={() => setSelectedTime(full)}
              >
                <Text style={{ color: '#fff' }}>{time}</Text>
              </TouchableOpacity>
            );
          })}
        </View>
      ))}

      <TouchableOpacity
        style={detailsStyles.button}
        onPress={() => {
          if (selectedTime) {
            setSalvaData([...salvaData, selectedTime]);
            console.log('SALVOS:', [...salvaData, selectedTime]);
          }
        }}
      >
        <Text style={detailsStyles.buttonText}>
          Confirmar
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
