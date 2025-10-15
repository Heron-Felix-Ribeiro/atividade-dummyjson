import { Stack, Tabs } from "expo-router";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

export default function RootLayout() {
  return <Tabs >
    <Tabs.Screen 
      name="receitas"
      options={{
        title: "Receitas",
        tabBarIcon: ({ color, size }) => (
          <MaterialIcons name="food-bank" size={24} color="black" />
        )
      }}
    />
    <Tabs.Screen 
      name="cadastrar"
      options={{
        title: "Cadastrar",
        tabBarIcon: ({ color, size }) => (
          <MaterialIcons name="add-box" size={24} color="black" />
        )
      }}
    />
  </Tabs>;
}
