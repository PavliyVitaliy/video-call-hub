import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MessageEntity } from './entities/message.entity';

@Injectable()
export class ChatService {
    constructor(
        @InjectRepository(MessageEntity)
        private readonly messageRepository: Repository<MessageEntity>,
    ) {}

    async saveMessage(roomId: string, userId: string, content: string) {
        const message = this.messageRepository.create({roomId, userId, content});

        return await this.messageRepository.save(message);
    }

    async getMessages(roomId: string): Promise<MessageEntity[]> {
        return await this.messageRepository.find({
            where: { roomId },
            order: { createdAt: 'ASC' },
            relations: ['user'],
        });
    }
}
