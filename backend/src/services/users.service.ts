import {Injectable, NotFoundException} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {User} from "../entities/user.entity";

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>,
    ) {}
    getAllUsers(): Promise<Array<User>> {
        return this.usersRepository.find();
    }

    async updateUser(user: User): Promise<User> {
        const userToUpdate = await this.usersRepository.findOneBy({ username: user.username });

        if (!userToUpdate) {
            throw new NotFoundException('User not found');
        }

        // Merge updated data into the existing entity
        Object.assign(userToUpdate, user);

        return this.usersRepository.save(userToUpdate);
    }
}