import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { RoomsService } from './rooms.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';


@ApiTags('Rooms')
@Controller('rooms')
export class RoomsController {

    constructor(private roomsService: RoomsService) {}

    @UseGuards(JwtAuthGuard)
    @Post('create')
    async createRoom(@Body('roomName') roomName: string) {
        return this.roomsService.createRoom(roomName);
    }
}
