import app from './app';
import { createServer } from 'http';
import { connectDB } from './db';

const server = createServer(app);

server.listen(app.get('port'), () => {
    console.log(`   App is live on localhost:${app.get('port')} | env ${app.get('env')}`);
    new connectDB().startDB();
});
server.on('error', (error: any) => {
    if (error.syscall !== 'listen')
        throw error;

    switch (error.code) {
        case 'EACCES':
            console.error('   Port requires elevated privileges');
            break;
        case 'EADDRINUSE':
            console.error('   Port is already in use');
            break;
        default:
            throw error;
    }
    process.exit(1);
});

export default server;