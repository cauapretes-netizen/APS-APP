import React from 'react';
import { detailsStyles, styles } from './details';

import { View, Text, ScrollView, TouchableOpacity } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';

const Stack = createStackNavigator();

export default function App() {
  // ARRAY GLOBAL DE AGENDAMENTOS
  const [salvaData, setSalvaData] = React.useState([]);

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: { backgroundColor: '#0F172A' },
          headerTintColor: '#fff',
          headerTitleStyle: { fontWeight: 'bold' },
        }}>
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

/* ================= HOME ================= */

function HomeScreen({ navigation }) {
  return (
    <ScrollView
      style={{ backgroundColor: '#0F172A' }}
      contentContainerStyle={{
        paddingHorizontal: 16,
        paddingTop: 60,
        paddingBottom: 40,
      }}
      showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <View style={styles.logoCircle}>
          <Ionicons name="cut-outline" size={28} color="#fff" />
        </View>

        <Text style={styles.title}>
          Barbearia <Text style={styles.highlight}>Premium</Text>
        </Text>

        <Text style={styles.subtitle}>
          Experiência de barbearia de alta qualidade. Escolha seu serviço e
          agende um horário.
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
              navigation.navigate('Details', {
                service,
                price,
                duration,
              })
            }>
            <Ionicons name="arrow-forward" size={18} color="#000" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

/* ================= DETAILS ================= */

function DetailsScreen({ route, salvaData, setSalvaData }) {
  const { service, price, duration } = route.params;

  const [selectedTime, setSelectedTime] = React.useState(null);

  const schedule = {
    'Segunda-feira': ['14:00', '14:30', '15:00', '15:30'],
    'Terça-feira': ['14:00', '14:30', '15:00', '15:30'],
    'Quarta-feira': ['14:00', '14:30', '15:00', '15:30'],
    'Quinta-feira': ['14:00', '14:30', '15:00', '15:30'],
    'Sexta-feira': ['14:00', '14:30', '15:00', '15:30'],
    'Sábado': ['14:00', '14:30', '15:00', '15:30'],
    'Domingo': ['14:00', '14:30', '15:00'],
  };
   

  return (
    <ScrollView
      style={{ backgroundColor: '#0F172A' }}
      contentContainerStyle={{
        padding: 20,
        paddingBottom: 40,
      }}
      showsVerticalScrollIndicator={false}>
      <Text style={detailsStyles.title}>Agendamento</Text>

      <View style={detailsStyles.card}>
        <Text style={detailsStyles.service}>{service}</Text>
        <Text style={detailsStyles.info}>⏱ Duração: {duration}</Text>
        <Text style={detailsStyles.info}>💰 Valor: {price}</Text>
      </View>

      {/* LISTA DE HORÁRIOS */}

      {Object.keys(schedule).map((day) => (
        <View key={day} style={{ marginBottom: 20 }}>
          <Text
            style={{
              color: '#C9A227',
              fontSize: 18,
              fontWeight: 'bold',
              marginBottom: 10,
            }}>
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
                    selectedTime === fullTime ? '#C9A227' : '#1E293B',
                  padding: 12,
                  borderRadius: 10,
                  marginBottom: 8,
                }}>
                <Text
                  style={{
                    color: selectedTime === fullTime ? '#000' : '#fff',
                    fontSize: 16,
                  }}>
                  {time}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      ))}

      {/* BOTÃO CONFIRMAR */}

      <TouchableOpacity
        style={detailsStyles.button}
        onPress={() => {
          if (selectedTime) {
            const novaLista = [...salvaData, selectedTime];
            setSalvaData(novaLista);

            console.log('Agendamentos:', novaLista);

            alert('Agendamento confirmado!');
            setSelectedTime(null);
          }
        }}>
        <Text style={detailsStyles.buttonText}>
          {selectedTime ? `Confirmar ${selectedTime}` : 'Selecione um horário'}
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
