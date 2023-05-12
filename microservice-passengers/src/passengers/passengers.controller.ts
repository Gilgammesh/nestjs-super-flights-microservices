import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { PassengersService } from './passengers.service';
import { CreatePassengerDto, UpdatePassengerDto } from './dtos';
import { PassengerMSG } from 'src/common/constants';

@Controller()
export class PassengersController {
  constructor(private readonly passengersService: PassengersService) {}

  @MessagePattern(PassengerMSG.CREATE)
  create(@Payload() createPassengerDto: CreatePassengerDto) {
    return this.passengersService.create(createPassengerDto);
  }

  @MessagePattern(PassengerMSG.FIND_ALL)
  findAll() {
    return this.passengersService.findAll();
  }

  @MessagePattern(PassengerMSG.FIND_ONE)
  findOne(@Payload() id: string) {
    return this.passengersService.findOne(id);
  }

  @MessagePattern(PassengerMSG.UPDATE)
  update(
    @Payload()
    {
      id,
      updatePassengerDto,
    }: {
      id: string;
      updatePassengerDto: UpdatePassengerDto;
    },
  ) {
    return this.passengersService.update(id, updatePassengerDto);
  }

  @MessagePattern(PassengerMSG.DELETE)
  remove(@Payload() id: string) {
    return this.passengersService.remove(id);
  }
}
