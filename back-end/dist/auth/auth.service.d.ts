import { Repository } from 'typeorm';
import { User } from './user.entity';
export declare class AuthService {
    private userRepository;
    constructor(userRepository: Repository<User>);
    login(body: {
        email: string;
        password: string;
    }): Promise<{
        message: string;
    }>;
    register(body: {
        email: string;
        password: string;
    }): Promise<{
        message: string;
    }>;
}
