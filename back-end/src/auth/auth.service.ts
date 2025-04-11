import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity'; 

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>, 
  ) {}


  async login(body: { email: string; password: string }) {
    const user = await this.userRepository.findOne({
      where: { email: body.email },
    });

    if (!user || user.password !== body.password) {
      throw new Error('Invalid email or password');
    }

    return { message: 'Login successful' };
  }

 
  async register(body: { email: string; password: string }) {
    const userExists = await this.userRepository.findOne({
      where: { email: body.email },
    });

    if (userExists) {
      throw new Error('User already exists');
    }

    const user = new User();
    user.email = body.email;
    user.password = body.password;

    await this.userRepository.save(user); 

    return { message: 'User registered successfully' };
  }
}
