import connectDB from './db/index.js';
import app from './app.js';
import dotenv from 'dotenv';

dotenv.config({
    path: './.env'
});
const PORT = process.env.PORT || 8000;


const db_connection = await connectDB().then(
    () => {
        app.listen(PORT,
            () => {
                console.log(`App running on port: ${PORT}`)
            }
        )
    }
).catch(
    (err)=>{
        console.error(err)
    }
)

