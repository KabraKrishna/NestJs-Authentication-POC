import { Injectable, HttpException, HttpStatus, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PasswordDTO } from 'src/DTOs/PasswordDTO';
import { User } from 'src/DTOs/user.interface';
import { UserDTO } from 'src/DTOs/UserDTO';
import { UserService, UserRoles } from 'src/user/user.service';

@Injectable()
export class AuthService {

    constructor(private userService: UserService, private jwtService: JwtService) { }

    public signUp(userData: User) {

        let index = this.userService.findAll().findIndex(user => user.userId == userData.userId);

        if (index == -1) {

            let accessToken = this.jwtService.sign({ userId: userData.userId });

            let newUser: User = {
                ...userData,
                role: UserRoles.User,
                isLoggedIn: true,
                token: accessToken
            }

            this.userService.createUser(newUser);

            return {
                status: HttpStatus.CREATED,
                message: 'User Created successfully!',
                token: accessToken
            }

        } else {
            throw new HttpException("UserId already exists", HttpStatus.AMBIGUOUS)
        }

    }

    public login(user: User) {

        let accessToken = this.jwtService.sign({ userId: user.userId });

        let updatedUser: User = {
            ...user,
            isLoggedIn: true,
            role: user.userId == 'admin' ? UserRoles.Admin : UserRoles.User,
            token: accessToken
        }

        this.userService.updateUser(updatedUser);

        return {
            status: HttpStatus.OK,
            message: "User Logged In",
            token: accessToken
        }
    }

    async validateUser(userId: string, password: string) {

        return this.userService.findOne(userId).then((user) => {

            return user && user.password == password;
        })
    }

    async getUserProfile(userId: string) {

        return await this.userService.findOne(userId).then(
            (user) => {

                if (user) {
                    return user
                } else {
                    
                    return {
                        status: HttpStatus.UNAUTHORIZED,
                        message: 'Unauthorised userId'
                    }
                }

            }, (err) => {
                console.log("Error getting profile: ", err);
            })
    }

    async logout(userId: string) {

        return await this.userService.findOne(userId).then(
            (user) => {

                if (user) {
                    let updatedUser: User = {
                        ...user,
                        isLoggedIn: false,
                        token: null
                    }
                    this.userService.updateUser(updatedUser);

                    return {
                        status: HttpStatus.OK,
                        message: 'Logged Out successfully!'
                    }
                } else {

                    return {
                        status: HttpStatus.UNAUTHORIZED,
                        message: 'Unauthorised userId'
                    }
                }
            })
    }

    async updatePassword(updatedPassword: PasswordDTO) {

        return this.userService.findOne(updatedPassword.userId).then((user) => {

            if(user){

                if(updatedPassword.newPassword === updatedPassword.confirmPassword) {
                    
                    let updatedUser: User = {
                        ...user,
                        password: updatedPassword.newPassword,
                        isLoggedIn: false,
                        token: null
                    }

                    this.userService.updateUser(updatedUser)

                    return {
                        status: HttpStatus.OK,
                        message: 'Password changed successfully, Login to continue'
                    }
                }else{
                    return {
                        status: HttpStatus.CONFLICT,
                        message: 'New Password and confirm password do not match.'
                    }
                }
            }else{
                return {
                    status: HttpStatus.UNAUTHORIZED,
                    message: 'Unauthorised userId'
                }
            }
        })
    }

    async getAllUsers(){

        return this.userService.findAll();
    }

}
