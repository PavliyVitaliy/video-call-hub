import { Module } from '@nestjs/common';
import { ChatGateway } from './chat.gateway';
import { RoomsModule } from 'src/rooms/rooms.module';
import { ChatService } from './chat.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MessageEntity } from './entities/message.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([MessageEntity]),
        RoomsModule,
    ],
    providers: [ChatGateway, ChatService],
    exports: [ChatService],
})
export class ChatModule {}
