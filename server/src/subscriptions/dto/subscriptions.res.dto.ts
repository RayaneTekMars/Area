import { ApiProperty } from '@nestjs/swagger'

class SubscriptionData {

    @ApiProperty()
    id: string

    @ApiProperty()
    serviceName: string

    @ApiProperty()
    expiresAt: string | null

}

class SubscriptionUrlResDto {

    @ApiProperty()
    status: 'success'

    @ApiProperty()
    data: {
        url: string
    }

}

class SubscriptionResDto {

    @ApiProperty()
    status: 'success'

    @ApiProperty()
    data: {
        id: string
    }

}

class GetSubscriptionsResDto {

    @ApiProperty()
    status: 'success'

    @ApiProperty({
        type: Array<SubscriptionData>
    })
    data: SubscriptionData[]

}

export { SubscriptionUrlResDto, SubscriptionResDto, GetSubscriptionsResDto }
