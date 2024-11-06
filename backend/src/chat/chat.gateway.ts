
import { Logger } from "@nestjs/common";
import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from "@nestjs/websockets";
import { Server, Socket } from 'socket.io';

@WebSocketGateway(
    { 
        cors: { 
            origin: ['http://localhost:5173'],
            methods: ['GET', 'POST'],
            credentials: true },
        transports: ["websocket", "polling"],
    })
export class ChatGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
    private readonly logger = new Logger(ChatGateway.name);

    @WebSocketServer()
    server: Server;

    afterInit() {
        this.logger.log("Initialized");
    }

    handleConnection(client: Socket) {
        const { sockets } = this.server.sockets;
        this.logger.log(`Client id: ${client.id} connected`);
        this.logger.debug(`Number of connected clients: ${sockets.size}`);
    }

    handleDisconnect(client: Socket) {
        this.logger.log(`Cliend id:${client.id} disconnected`);
    }

    @SubscribeMessage('joinRoom')
    handleJoinRoom(client: Socket, room: string) {
        this.logger.log(`Message "joinRoom" received from client id: ${client.id}, room: ${room}`);
        client.join(room);
        client.to(room).emit('userJoined', client.id);
    }

    @SubscribeMessage('signal')
    handleSignal(client: Socket, data: { room: string; signal: any; from: string }) {
        this.logger.log(`Message "signal" received from client id: ${client.id}`);
        client.to(data.room).emit('signal', { signal: data.signal, from: data.from, to: client.id });
    }
}
