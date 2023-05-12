import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { User } from './entities/user.entity';
import { CreateUserDto, UpdateUserDto } from './dtos';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<User>,
  ) {}

  async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    return hash;
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const hashPassword = await this.hashPassword(createUserDto.password);
    Object.assign(createUserDto, { password: hashPassword });
    const newUser = await this.userModel.create(createUserDto);
    return newUser;
  }

  async findAll(): Promise<User[]> {
    const users = await this.userModel.find();
    return users;
  }

  async findOne(id: string): Promise<User> {
    const user = await this.userModel.findById(id);
    if (!user) {
      throw new NotFoundException('The User was not found');
    }
    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    if (updateUserDto.password) {
      const hashPassword = await this.hashPassword(updateUserDto.password);
      Object.assign(updateUserDto, { password: hashPassword });
    }
    const updatedUser = await this.userModel.findByIdAndUpdate(
      id,
      updateUserDto,
      { new: true },
    );
    if (!updatedUser) {
      throw new BadRequestException('User not found');
    }
    return updatedUser;
  }

  async remove(id: string): Promise<string> {
    const deletedUser = await this.userModel.findByIdAndDelete(id);
    if (!deletedUser) {
      throw new BadRequestException('User not found');
    }
    return 'User deleted';
  }

  async findByUsername(username: string) {
    return await this.userModel.findOne({ username });
  }

  async checkPassword(password: string, passwordDB: string): Promise<boolean> {
    return await bcrypt.compare(password, passwordDB);
  }

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.findByUsername(username);
    const isValidPassword = await this.checkPassword(password, user.password);
    if (user && isValidPassword) {
      return user;
    }
    return null;
  }
}
