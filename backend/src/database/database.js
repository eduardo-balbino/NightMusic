import mongoose from 'mongoose'
import dotenv from 'dotenv'

const connectdb = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI, {
        });
    console.log('Conectado ao MongoDB com sucesso!');
    } catch (error) {
        console.error('Erro ao conectar ao MongoDB:', error.message);
        process.exit(1); // Encerra o processo se a conexão falhar
    }
};

export default connectdb;
