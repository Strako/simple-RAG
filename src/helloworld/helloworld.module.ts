import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { HelloworldController } from './helloworld.controller';
import { HelloworldService } from './helloworld.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Helloworld } from './entities';

@Module({
  imports: [HttpModule, TypeOrmModule.forFeature([Helloworld])],
  controllers: [HelloworldController],
  providers: [HelloworldService],
  exports: [HelloworldService],
})
export class HellowordModule {}
