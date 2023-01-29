import { Module } from '@nestjs/common';
import { ScenariosController } from './scenarios.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Scenario } from './entities/scenario.entity';
import { Account } from '../accounts/entities/account.entity';
import { ScenariosService } from './scenarios.service';

@Module({
  imports: [TypeOrmModule.forFeature([Scenario, Account])],
  controllers: [ScenariosController],
  providers: [ScenariosService],
  exports: [ScenariosService]
})
export class ScenariosModule { }
