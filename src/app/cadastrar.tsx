import { useNavigation, useRoute } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { useRecipes } from "../hooks/useRecipes";

export default function Cadastrar() {
    const route = useRoute();
    const navigation = useNavigation();
    const { id } = route.params || {};

    const [nome, setNome] = useState<string>('');
    const [ingredientes, setIngredientes] = useState<string>('');
    const [instrucoes, setInstrucoes] = useState<string>('');
    const [tempoPreparo, setTempoPreparo] = useState<string>('');
    const [tempoCozimento, setTempoCozimento] = useState<string>('');
    const [dificuldade, setDificuldade] = useState<string>('');

    const limparFormulario = () => {
        setNome('');
        setIngredientes('');
        setInstrucoes('');
        setTempoPreparo('');
        setTempoCozimento('');
        setDificuldade('');
    };

    const salvarReceita = async () => {
        if (!nome || !ingredientes || !instrucoes || !tempoPreparo || !tempoCozimento || !dificuldade) {
            Alert.alert("Erro", "Por favor, preencha todos os campos.");
            return;
        }

        const dadosReceita = {
            name: nome,
            ingredients: ingredientes.split(',').map(item => item.trim()),
            instructions: instrucoes.split('.').map(item => item.trim()),
            prepTimeMinutes: parseInt(tempoPreparo),
            cookTimeMinutes: parseInt(tempoCozimento),
            difficulty: dificuldade,
            userId: 1
        };

        try {
            if (id) {
                await update(1, dadosReceita);
                Alert.alert("Sucesso", "Receita atualizada com sucesso!");
                navigation.setParams({ id: null }); 
            } else {
                await create(dadosReceita);
                Alert.alert("Sucesso", "Receita salva com sucesso!");
                navigation.goBack();
            }
        } catch (error) {
            console.error("Falha ao salvar a receita:", error);
            Alert.alert("Erro", `Não foi possível ${id ? 'atualizar' : 'salvar'} a receita.`);
        }
    };

    const { create, update, findById } = useRecipes();

    useEffect(() => {
        if (id) {
            findById(id).then(recipe => {
                setNome(recipe.name);
                setIngredientes(recipe.ingredients.join(', '));
                setInstrucoes(recipe.instructions.join('. '));
                setTempoPreparo(recipe.prepTimeMinutes.toString());
                setTempoCozimento(recipe.cookTimeMinutes.toString());
                setDificuldade(recipe.difficulty);
            });
        } else { 
            limparFormulario();
        } 
    }, [id]);


    return (
        <View style={estilos.container}>
            <Text style={estilos.titulo}>{id ? 'Editar Receita' : 'Cadastrar Receita'}</Text>
            <Text>Nome</Text>
            <TextInput
                value={nome}
                onChangeText={setNome}
                placeholder="Ex: Ronaldo" />
            <Text>Ingredientes</Text>
            <TextInput
                value={ingredientes}
                onChangeText={setIngredientes}
                placeholder="Ex: Farinha, ovo, leite..." multiline />
            <Text>Instruções</Text>
            <TextInput
                value={instrucoes}
                onChangeText={setInstrucoes}
                placeholder="Ex: Misture tudo..." multiline />
            <Text>Tempo de Preparo</Text>
            <TextInput
                value={tempoPreparo}
                onChangeText={setTempoPreparo}
                placeholder="Ex: 30 minutos" />
            <Text>Tempo de Cozimento</Text>
            <TextInput
                value={tempoCozimento}
                onChangeText={setTempoCozimento}
                placeholder="Ex: 1 hora" />
            <Text>Dificuldade</Text>
            <TextInput
                value={dificuldade}
                onChangeText={setDificuldade}
                placeholder="Ex: Fácil, Médio, Difícil" />
            <TouchableOpacity style={estilos.btn} onPress={salvarReceita}>
                <Text style={estilos.btnTexto}>{id ? 'Atualizar' : 'Salvar'}</Text>
            </TouchableOpacity>
        </View>
    );
}

const estilos = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#fff',
    },
    titulo: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    input: {
        borderColor: 'gray',
        borderWidth: 1,
    },
    btn: {
        backgroundColor: 'green',
        padding: 10,
        borderRadius: 15,
        alignItems: 'center',
    },
    btnTexto: {
        color: '#fff',
        fontWeight: 'bold',
    },
})