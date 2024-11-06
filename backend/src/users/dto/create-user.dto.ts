import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString, Length } from "class-validator";

export class CreateUserDto {

    @ApiProperty({description: 'User name'})
    @IsString({message: 'Must be a string'})
    readonly username: string;

    @ApiProperty({example: 'user@mail.ru', description: 'Mail'})
    @IsString({message: 'Must be a string'})
    @IsEmail({}, {message: "Incorrect email"})
    readonly email: string;

    @ApiProperty({example: '12345', description: 'Password'})
    @IsString({message: 'Must be a string'})
    @Length(4, 16, {message: 'Not less than 4 and not more than 16'})
    readonly password: string;
}