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
  
  updateUser(id: number, user: UserDto): Promise<any> {
    return this.userRepository.update(id, { username: user.username, email: user.email, password: user.password, updatedAt: new Date().toISOString().slice(0, 19).replace('T', ' ') });
  }
}
