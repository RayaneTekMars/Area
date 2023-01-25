import { ApiProperty } from '@nestjs/swagger'

class Action {
  name: string
  description: string
}

class Reaction {
  name: string
  description: string
}

class Service {
  name: string
  description: string
  actions: Action[]
  reactions: Reaction[]
}

export class AboutDto {
  @ApiProperty()
  client: {
    host: string
  }
  @ApiProperty()
  server: {
    current_time: number
    services: Service[]
  }
}
