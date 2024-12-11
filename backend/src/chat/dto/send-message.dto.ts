import { IsString, IsUUID } from 'class-validator';

export class SendMessageDto {
  @IsUUID()
  roomId: string;

  @IsString()
  message: string;

  @IsUUID()
  userId: string;
}
