import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from "../users/dto/create-user.dto";
import { UsersService } from "../users/users.service";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from 'bcryptjs'
import { UserEntity } from 'src/users/entities/user.entity';
import { LoginDto } from './dto/login.dto';


@Injectable()
export class AuthService {
    constructor(
        private userService: UsersService,
        private jwtService: JwtService
    ) {}

    async login(userDto: LoginDto) {
        const user = await this.validateUser(userDto)
        return this.generateToken(user)
    }

    async registration(userDto: CreateUserDto) {
        const userByEmail = await this.userService.getUserByEmail(userDto.email);
        if (userByEmail) {
            throw new HttpException('A user with this email already exists', HttpStatus.BAD_REQUEST);
        }
        const hashPassword = await bcrypt.hash(userDto.password, 10);
        const user = await this.userService.createUser({...userDto, password: hashPassword})
        return this.generateToken(user)
    }

    private async generateToken(user: UserEntity) {
        const payload = {email: user.email, id: user.id}
        return {
            access_token: this.jwtService.sign(payload),
        }
    }

    private async validateUser(loginDto: LoginDto) {
        const user = await this.userService.getUserByEmail(loginDto.email);
        if (user === null) {
            throw new UnauthorizedException({message: 'Incorrect email'})
        }
        const passwordEquals = await bcrypt.compare(loginDto.password, user.password);
        if (!passwordEquals) {
            throw new UnauthorizedException({message: 'Incorrect password'})
        }
        return user;
    }
}
