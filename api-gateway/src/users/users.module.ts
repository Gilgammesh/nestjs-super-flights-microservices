import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { ProxyModule } from 'src/common/proxy/proxy.module';

@Module({
  controllers: [UsersController],
  imports: [ProxyModule],
})
export class UsersModule {}
