import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Observable } from 'rxjs';
import { CreateUserDto, UpdateUserDto } from './dtos';
import { ClientProxySuperFlights } from 'src/common/proxy/client-proxy';
import { IUser } from 'src/common/interfaces/user.interface';
import { UserMSG } from 'src/common/constants';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@ApiTags('Users')
@UseGuards(JwtAuthGuard)
@Controller('users')
export class UsersController {
  constructor(private readonly clientProxy: ClientProxySuperFlights) {}

  private clientProxyUser = this.clientProxy.clientProxyUsers();

  @Post()
  create(@Body() createUserDto: CreateUserDto): Observable<IUser> {
    return this.clientProxyUser.send(UserMSG.CREATE, createUserDto);
  }

  @Get()
  findAll(): Observable<IUser[]> {
    return this.clientProxyUser.send(UserMSG.FIND_ALL, '');
  }

  @Get(':id')
  findOne(@Param('id') id: string): Observable<IUser> {
    return this.clientProxyUser.send(UserMSG.FIND_ONE, id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Observable<IUser> {
    return this.clientProxyUser.send(UserMSG.UPDATE, { id, updateUserDto });
  }

  @Delete(':id')
  delete(@Param('id') id: string): Observable<string> {
    return this.clientProxyUser.send(UserMSG.DELETE, id);
  }
}
