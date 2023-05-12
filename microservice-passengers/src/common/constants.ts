export enum RabbitMQ {
  PASSENGER_QUEUE = 'passengers',
}

export enum PassengerMSG {
  CREATE = 'createPassenger',
  FIND_ALL = 'findAllPassengers',
  FIND_ONE = 'findOnePassenger',
  UPDATE = 'updatePassenger',
  DELETE = 'deletePassenger',
}
