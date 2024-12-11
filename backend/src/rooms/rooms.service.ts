import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RoomEntity } from './entities/room.entity';

@Injectable()
export class RoomsService {
    constructor(
        @InjectRepository(RoomEntity)
        private readonly roomRepository: Repository<RoomEntity>,
    ) {}

    async createRoom(creatorId: string): Promise<{ id: string }> {
        const room = this.roomRepository.create({ creatorId });
        await this.roomRepository.save(room);
        return { id: room.id };
    }

    async findRoomById(roomId: string): Promise<RoomEntity | null> {
        return await this.roomRepository.findOne({ where: { id: roomId } });
    }
}
