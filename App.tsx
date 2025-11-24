import * as SQLite from 'expo-sqlite';
import { StatusBar } from 'expo-status-bar';
import { Text, View, FlatList, TextInput, TouchableOpacity, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { openDatabase, insertCarta, getCartas } from './Banco/Conf';
import { useEffect, useState } from 'react';
import styles from './styles/styles.js';

// 'Rotulo' declara uma formatação de dados. Previne erros.
interface Carta {
  ID_CARTA: number;
  NOME: string;
  ELIXIR: number;
  RARIDADE: string;
  IMAGEM_URI: string;
}

export default function App() {
  // ===== 1. DECLARAÇÕES =====
  const [cartas, setCartas] = useState<Carta[]>([]); // -> useState declara uma memoria e um mutador respectivamente
  const [loading, setLoading] = useState(true);
  const [db, setDb] = useState<SQLite.SQLiteDatabase | null>(null); // Manipula o banco de dados
  const [nome, setNome] = useState('');
  const [elixir, setElixir] = useState('');
  const [raridade, setRaridade] = useState('');
  const [imagemUri, setImagem] = useState<string | null>(null);

  // ===== 2. INÍCIO DAS FUNÇÕES ======

  // FUNÇÃO PARA ATUALIZAR O BANCO 
  const loadCartas = async (activeDb: SQLite.SQLiteDatabase) => {
    const loadedUsers = await getCartas(activeDb);
    setCartas(loadedUsers as Carta[]);
  };

  // FUNÇÃO DA IMAGEM
  const pegarImg = async () => {
    let img = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images, //tipos de media
      allowsEditing: true, // permite o usuario editar a img
      aspect: [4, 3], // proporção da img
      quality: 1, // alta qualidade
    });

    //confere se alguma img foi selecionada
    if (!img.canceled && img.assets && img.assets.length > 0) {
      setImagem(img.assets[0].uri)
    } else {
      setImagem(null);
    }
  }

  // FUNÇÃO PARA ABRIR O BANCO DE DADOS - Roda 1 vez
  const iniciar = async () => {

    try {
      //abre o banco de dados
      const activeDb = await openDatabase();
      setDb(activeDb);

      await loadCartas(activeDb) // 1° consulta

    } catch (error) {
      console.log('Error no fluxo principal: ', error)
    } finally { // <-- Finally é executado SEMPRE dando erro (catch) ou não 
      setLoading(false);
    }
  }

  // FUNÇÃO PARA INSERIR  
  const registrar = async () => {
    if (!db) {
      alert('Erro no banco de dados')
      return;
    }
    if (!nome.trim() || !elixir.trim() || !raridade.trim() || !imagemUri) {
      alert("Por favor, preencha todos os campos.")
      return;
    }

    // Conversão do elixir: number -> string 
    const elixirNum = parseInt(elixir);
    if (isNaN(elixirNum)) {
      alert("O Elixir deve ser um número válido.");
      return;
    }
    try {
      await insertCarta(db, nome, elixirNum, raridade, imagemUri);

      setNome('');
      setElixir('');
      setRaridade('');
      setImagem(null);

      await loadCartas(db);

    } catch (error) {
      alert("Erro ao inserir usuario");
      console.error(error);
    }
  }

  // 3. ===== CICLO DE VIDA =====
  useEffect(() => {
    iniciar();
  }, []);

  //4. ===== TELA DE CARREGAMENTO =====
  if (loading) {
    return (
      <View>
        <Text>Carregando banco de dados...</Text>
      </View>
    );
  }

  // ===== 5. VIZUALIZAÇÃO =====
  return (
    <View style={styles.container}>
      <View style={styles.form}>
        <Text style={styles.title}>⚔️ Clash Info ⚔️</Text>
        <Text style={styles.p}>Cadastre aqui suas cartas do Clash Royale. Insira: imagem, nome, elixir e raridade. </Text>

        <TextInput
          style={styles.input}
          placeholder='Nome da Carta'
          placeholderTextColor="#AAAAAA"
          value={nome}
          onChangeText={setNome}
        />
        <TextInput
          style={styles.input}
          placeholder='Elixir'
          placeholderTextColor="#AAAAAA"
          value={elixir}
          onChangeText={setElixir}
        />

        <TextInput
          style={styles.input}
          placeholder='Raridade'
          placeholderTextColor="#AAAAAA"
          value={raridade}
          onChangeText={setRaridade}
        />

        {/* BTN IMG */}
        <TouchableOpacity
          style={styles.buttonImg}
          onPress={pegarImg}
        >
          <Text style={styles.buttonTextImg}>
            {imagemUri ? "Imagem Selecionada" : "Selecionar Imagem"}
          </Text>
        </TouchableOpacity>

        {/* PRÉ VISUALIZAÇÃO */}
        {imagemUri && (
          <Image source={{ uri: imagemUri }} style={styles.imagePreview} />
        )}

        <TouchableOpacity
          style={styles.button}
          onPress={registrar}
        >
          <Text style={styles.buttonText}>Cadastrar</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.hr}></View>
      <Text style={styles.title}>Cartas Cadastradas</Text>
      <FlatList
        data={cartas}
        keyExtractor={(item) => item.ID_CARTA.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>

            <Image
              source={{ uri: item.IMAGEM_URI }}
              style={styles.cardImage}
            />
            <View style={styles.cardInfo}>
              <Text style={styles.cardName}>{item.NOME}</Text>
              <Text style={styles.cardDetail}>Elixir: {item.ELIXIR} ⚡</Text>
              <Text style={styles.cardDetail}>Raridade: {item.RARIDADE}</Text>
            </View>
          </View>
        )}
      />
      <StatusBar style="light" />
    </View>
  );
}


