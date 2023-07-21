import dotenv from 'dotenv';
dotenv.config();

export interface EnvConfigType {
    env: string,
    port: number,
    db: {
        uri: string,
        name: string
    }
}

export const config: EnvConfigType = {
    env: String(process.env.NODE_ENV),
    port: Number(process.env.PORT) || 3000,
    db: {
        uri: String(process.env.MONGO_URI),
        name: String(process.env.MONGO_NAME)
    }
}
