import { Module } from '@nestjs/common';
import { FlightsController } from './flights.controller';
import { ProxyModule } from 'src/common/proxy/proxy.module';

@Module({
  controllers: [FlightsController],
  imports: [ProxyModule],
})
export class FlightsModule {}
