import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useRecipes } from "../hooks/useRecipes";
import { Recipe } from "../interfaces/Recipe";

export default function Receitas() {
  const { findAll, remove } = useRecipes();
  const navigation = useNavigation();
  const [recipes, setRecipes] = useState<Recipe[]>([]);

  useEffect(() => {
    findAll().then(response => {
      setRecipes(response.recipes);      
    });
  }, [findAll]);

  const deletar = (id: number) => {
    remove(id).then(() => {
      setRecipes(recipes.filter(recipe => recipe.id !== id));
    });
  }

  const editar = (id: number) => {
    navigation.navigate('cadastrar', { id });
  }

  return (
    <View style={estilos.card}>
      <FlatList
        data={recipes}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={estilos.itemContainer}>
            <Text style={estilos.itemText}>{item.name}</Text>
            <View style={estilos.botoesContainer}>
              <TouchableOpacity onPress={() => editar(1)}>
                <Text style={estilos.botaoEditar}>✏️</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => deletar(item.id)}>
                <Text style={estilos.botaoDeletar}>🗑️</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
  );
}

const estilos = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    width: '90%',
  },
  itemText: {
    fontSize: 18,
    flex: 1,
  },
  botoesContainer: {
    flexDirection: 'row',
  },
  botaoEditar: {
    fontSize: 20,
    marginHorizontal: 10,
  },
  botaoDeletar: {
    fontSize: 20,
    color: 'red',
  },
});
