// db.js
const mongoose = require('mongoose');
require('dotenv').config(); // Carrega as variáveis de ambiente

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
      // useNewUrlParser: true, // Desnecessário em versões recentes
      // useUnifiedTopology: true, // Desnecessário em versões recentes
        });
    console.log('Conectado ao MongoDB com sucesso!');
    } catch (error) {
        console.error('Erro ao conectar ao MongoDB:', error.message);
        process.exit(1); // Encerra o processo se a conexão falhar
    }
};

module.exports = connectDB;
