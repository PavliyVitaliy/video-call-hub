import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';


@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly usersRepository: Repository<UserEntity>,
  ) {}

  async createUser(dto: CreateUserDto) {
    const user = await this.usersRepository.save(dto);
    return user;
}

  async getAllUsers(): Promise<UserEntity[]> {
    return await this.usersRepository.find();
  }

  async getUser(id: string): Promise<UserEntity | null> {
    return await this.usersRepository.findOneBy({ id });
  }

  async getUserByEmail(email: string): Promise<UserEntity | null> {
    return await this.usersRepository.findOne({where: {email}})
  }

  async removeUser(id: string): Promise<void> {
    await this.usersRepository.delete(id);
  }
}