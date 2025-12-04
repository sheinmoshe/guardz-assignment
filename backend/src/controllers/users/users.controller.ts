import {Body, Controller, Get, Post} from '@nestjs/common';
import {UsersService} from "../../services/users.service";
import {User} from "../../entities/user.entity";

@Controller()
export class UsersController {
    constructor(private readonly usersService: UsersService) {}
    @Get('/users')
    async getAllUsers(): Promise<Array<User>> {
        return await this.usersService.getAllUsers();
    }

    @Post('/edit-user')
    editUser(@Body() user: User): Promise<User> {
        return this.usersService.updateUser(user);
    }
}