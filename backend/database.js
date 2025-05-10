import mongoose from 'mongoose';
import 'dotenv/config';

const MAX_RETRIES = 5; // Maximum number of retry attempts
const RETRY_INTERVAL = 5000; // Interval between retries in milliseconds

export const dbConnect = async () => {
    let attempts = 0; // Counter for retry attempts

    const connectWithRetry = async () => {
        try {
            await mongoose.connect(process.env.DATABASE_URI, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            });
            console.log("DB is Connected Successfully...");
        } catch (error) {
            attempts += 1;
            console.error(`Attempt ${attempts}: Issue in DB Connection...`);
            console.error(`Error: ${error.message}`);

            if (attempts < MAX_RETRIES) {
                console.log(`Retrying in ${RETRY_INTERVAL / 1000} seconds...`);
                setTimeout(connectWithRetry, RETRY_INTERVAL);
            } else {
                console.error("Max retries reached. Exiting...");
                process.exit(1);
            }
        }
    };

    await connectWithRetry();
};
