import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { UsersService } from './users.service';
import { CreateUserDto, UpdateUserDto } from './dtos';
import { UserMSG } from 'src/common/constants';

@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @MessagePattern(UserMSG.CREATE)
  create(@Payload() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @MessagePattern(UserMSG.FIND_ALL)
  findAll() {
    return this.usersService.findAll();
  }

  @MessagePattern(UserMSG.FIND_ONE)
  findOne(@Payload() id: string) {
    return this.usersService.findOne(id);
  }

  @MessagePattern(UserMSG.UPDATE)
  update(
    @Payload()
    { id, updateUserDto }: { id: string; updateUserDto: UpdateUserDto },
  ) {
    return this.usersService.update(id, updateUserDto);
  }

  @MessagePattern(UserMSG.DELETE)
  remove(@Payload() id: string) {
    return this.usersService.remove(id);
  }

  @MessagePattern(UserMSG.VALID)
  validateUser(
    @Payload() { username, password }: { username: string; password: string },
  ) {
    return this.usersService.validateUser(username, password);
  }
}
