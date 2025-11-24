import * as SQLite from 'expo-sqlite';

// ====== Função para abrir o banco de dados ====== 
async function openDatabase() {
  let db: SQLite.SQLiteDatabase;
  try {
    // 1. Abre o banco de dados (ou cria se não existir)
    db = await SQLite.openDatabaseAsync('clash.db');
    console.log('Banco de dados aberto com sucesso!');

    // 2. Chama a função para criar a tabela no banco aberto
    await createTable(db);

    // Retorna a referência do banco para ser usada em outras funções
    return db;

  } catch (error) {
    console.error('Erro ao abrir ou configurar o banco de dados:', error);
    throw error;
  }
}

// ======  Função para criar a tabela ====== 
async function createTable(db: SQLite.SQLiteDatabase) {
  try {
    if (!db) {
      console.error("ERRO: Objeto DB é nulo antes de criar a tabela.");
      return;
    }

    await db.execAsync(
      `
      CREATE TABLE IF NOT EXISTS CARTAS (
        ID_CARTA INTEGER PRIMARY KEY NOT NULL, 
        NOME VARCHAR(100) NOT NULL,
        ELIXIR INTEGER NOT NULL,
        RARIDADE VARCHAR(50) NOT NULL,
        IMAGEM_URI TEXT
      );`
    );
    console.log('Tabela CARTAS criada com sucesso!');
  } catch (error) {
    console.error('Erro ao criar a tabela:', error);
  }
}

// ======  Função para inserir uma carta ====== 
async function insertCarta(db: SQLite.SQLiteDatabase, nome: string, elixir: number, raridade: string, imagemUri: string) {
  try {
    const result = await db.runAsync(
      `INSERT INTO CARTAS (NOME, ELIXIR, RARIDADE, IMAGEM_URI) VALUES (?, ?, ?, ?)`,
      [nome, elixir, raridade, imagemUri]
    );

  } catch (error) {
    console.log('Erro ao inserir o usuario')
  }
}

//  ======  Função para vizualizar cartas ja cadastradas ====== 
async function getCartas(db: SQLite.SQLiteDatabase) {
  try {
    const allCartas = await db.getAllAsync<any>(`SELECT * FROM CARTAS`);
    return allCartas;
  } catch (error) {
    return [];
  }
}

// Exporta funções
export { openDatabase, insertCarta, getCartas };