import { Injectable } from '@nestjs/common';
import { User } from 'src/DTOs/user.interface';

export enum UserRoles {
    User = "USER",
    Admin = "ADMIN"
}


@Injectable()
export class UserService {

    private users: User[] = [
        {
            userId: 'John',
            password: 'doe',
            role: UserRoles.User
        },
        {
            userId: 'Jane',
            password: 'doe',
            role: UserRoles.User
        },
        {
            userId: 'admin',
            password: 'admin',
            role: UserRoles.Admin
        }];

    createUser(userData: User) {

        this.users.push(userData);
    }

    findAll() {

        return this.users;
    }

    async findOne(userId: string): Promise<User | undefined> {

        return this.users.find(user => user.userId == userId);
    }

    updateAll(userDataArray: User[]) {

        this.users = [...userDataArray];
    }

    updateUser(updatedUser: User) {

        this.users = this.users.filter(user => user.userId != updatedUser.userId);

        this.users.push(updatedUser);
    }

    deteteUser(userId: string) {

        this.users = this.users.filter(user => user.userId != userId);
    }


}
