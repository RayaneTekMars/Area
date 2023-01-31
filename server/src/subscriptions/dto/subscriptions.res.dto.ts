import { ApiProperty } from '@nestjs/swagger'

class SubscriptionData {

    @ApiProperty()
    id: string

    @ApiProperty()
    serviceName: string

}

export class SubscriptionUrlResDto {

    @ApiProperty()
    status: 'success'

    @ApiProperty()
    data: {
        url: string
    }

}

export class SubscriptionResDto {

    @ApiProperty()
    status: 'success'

    @ApiProperty()
    data: {
        id: string
    }

}

export class GetSubscriptionsResDto {

    @ApiProperty()
    status: 'success'

    @ApiProperty({
        type: Array<SubscriptionData>
    })
    data: SubscriptionData[]

}

