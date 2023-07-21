import { Connection, connect } from 'mongoose';
import { config } from '../config/env.config';

export class connectDB {
    async startDB() {
        try {
            const connResult = await connect(config.db.uri, {
                dbName: config.db.name,
                autoIndex: true
            });
            if (connResult.connections)
                console.log('   DB is online');
        } catch (error) {
            console.error('   Please recheck db env');
            process.exit(1);
        }
    }
}

// export async function connectDB() {
    // try {
    //     const conn = await connect(config.db.uri, {
    //         dbName: config.db.name,
    //         autoIndex: true
    //     });
    //     if (conn.connections)
    //         console.log('   DB is online');
    // } catch (error) {
    //     console.error('   Please recheck db env');
    //     process.exit(1);
    // }
// }
