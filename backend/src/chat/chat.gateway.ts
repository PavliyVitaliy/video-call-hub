
import { Logger, UseGuards } from "@nestjs/common";
import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from "@nestjs/websockets";
import { Server, Socket } from 'socket.io';
import { ChatService } from "./chat.service";
import { RoomsService } from "src/rooms/rooms.service";
import { JwtWsGuard } from "src/auth/jwt-ws.guard";
import { JoinRoomDto } from "./dto/join-room.dto";
import { SendMessageDto } from "./dto/send-message.dto";

@WebSocketGateway(
    { 
        cors: { 
            origin: ['http://localhost:5173'],
            methods: ['GET', 'POST'],
            credentials: true },
        transports: ["websocket", "polling"],
    })
@UseGuards(JwtWsGuard)
export class ChatGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
    private readonly logger = new Logger(ChatGateway.name);

    @WebSocketServer()
    server: Server;

    constructor(
        private readonly chatService: ChatService,
        private readonly roomsService: RoomsService,
      ) {}

    afterInit() {
        this.logger.log("WebSocket Gateway Initialized");
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
    async handleJoinRoom(client: Socket, payload: JoinRoomDto) {
        const { roomId } = payload;
        const room = await this.roomsService.findRoomById(roomId);
        if (!room) {
            client.emit('error', { message: 'Room not found' });
            return;
        }
        this.logger.log(`Message "joinRoom" received from client id: ${client.id}, room: ${roomId}`);
        client.join(roomId);
        client.to(roomId).emit('userJoined', { userId: client.id, roomId });
    }

    @SubscribeMessage('signal')
    handleSignal(client: Socket, data: { roomId: string; signal: any; to: string }) {
        const { roomId, signal, to } = data;
        this.logger.log(`Signal received in room ${roomId} from client ${client.id} to client ${to}`);
        client.to(roomId).emit('signal', { signal, from: client.id });
    }

    @SubscribeMessage('sendMessage')
    async handleMessage(client: Socket, payload: SendMessageDto) {
        this.logger.log(`Message "sendMessage" received from client id: ${client.id}`);
        const { roomId, message, userId } = payload;

        if (client.data.user.id !== userId) {
            client.emit('error', { message: 'User ID mismatch' });
            return;
        }

        const room = await this.roomsService.findRoomById(roomId);
        if (!room) {
            client.emit('error', { message: 'Room not found' });
            return;
        }

        const savedMessage = await this.chatService.saveMessage(roomId, userId, message);

        client.to(roomId).emit('newMessage', savedMessage);
    }
}
