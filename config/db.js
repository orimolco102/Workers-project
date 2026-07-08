require('dotenv').config();

async function connectDB(mongoose) {
    try {
        console.log(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_URL}/${process.env.DB_NAME}`);   
        await mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_URL}/${process.env.DB_NAME}`);
        console.log("MongoDB connected secsessfuly");

    } catch (error) {
        console.error("DB connection failed");
        console.error(error);
        
    }
}

module.exports = connectDB;