import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { from, Observable } from 'rxjs';
import { Repository } from 'typeorm';
import { UserEntity } from '../models/user.entity';
import { UserDto } from '../models/user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  add(user: UserDto): Observable<UserDto> {
    //set the createdAt and updatedAt to the current time format yyyy-mm-dd hh:mm:ss
    user.createdAt = new Date().toISOString().slice(0, 19).replace('T', ' ');
    user.updatedAt = new Date().toISOString().slice(0, 19).replace('T', ' ');
    console.log(user.createdAt);
    console.log(user.updatedAt);
    return from(this.userRepository.save(user));
  }

  findAll(): Observable<UserDto[]> {
    return from(this.userRepository.find());
  }
  deleteUserById(id: number): Promise<any> {
    return this.userRepository.delete(id);
  }
}
