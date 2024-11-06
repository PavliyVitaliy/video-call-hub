import { Injectable } from '@nestjs/common';

@Injectable()
export class RoomsService {
    async createRoom(roomName: string): Promise<string> {
        // Logic for creating a unique room identifier
        const roomId = `room-${Math.random().toString(36).substr(2, 9)}`;
        return roomId;
      }
}
