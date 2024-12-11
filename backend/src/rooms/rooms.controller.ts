import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { RoomsService } from './rooms.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';


@ApiTags('Rooms')
@Controller('rooms')
export class RoomsController {

    constructor(private roomsService: RoomsService) {}

    @UseGuards(JwtAuthGuard)
    @Post('create')
    async createRoom(@Req() request: any) {
        const userId = request.user.id; // ID from the token
        return this.roomsService.createRoom(userId);
    }
}
