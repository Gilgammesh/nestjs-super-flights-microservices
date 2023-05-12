import { Module } from '@nestjs/common';
import { PassengersController } from './passengers.controller';
import { ProxyModule } from 'src/common/proxy/proxy.module';

@Module({
  controllers: [PassengersController],
  imports: [ProxyModule],
})
export class PassengersModule {}
