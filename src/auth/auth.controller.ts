import { Body, Controller, ForbiddenException, Get, HttpException, HttpStatus, Param, Post, Put, Request, UnauthorizedException, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { PasswordDTO } from 'src/DTOs/PasswordDTO';
import { User } from 'src/DTOs/user.interface';
import { UserDTO } from 'src/DTOs/UserDTO';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt.auth.guard';

@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService) {

    }

    @UseGuards(AuthGuard('loginGuard'))
    @Post('login')
    login(@Body() user: UserDTO) {

        let userCred: User = {
            userId: user.userId,
            password: user.password
        }

        return this.authService.login(userCred);
    }

    @Post('signup')
    signup(@Body() user: UserDTO) {

        let newUser: User = {
            userId: user.userId,
            password: user.password
        }

        return this.authService.signUp(newUser);
    }

    @UseGuards(AuthGuard('jwtGuard'))
    @Get('logout')
    logout(@Request() request) {

        return this.authService.logout(request.user);
    }

    @UseGuards(AuthGuard('jwtGuard'))
    @Get('user/profile')
    getUserProfile(@Request() request) {

        return this.authService.getUserProfile(request.user);
    }

    @Put('forgotPassword')
    changePassword(@Body() updatedPassword: PasswordDTO){

        return this.authService.updatePassword(updatedPassword);
    }

    @UseGuards(AuthGuard('jwtGuard'))
    @Get('allUsers')
    getAllusers(@Request() request){

        if(request.user == 'admin'){
            return this.authService.getAllUsers()
        }else{
            throw new ForbiddenException("You are not allowed to perform this action");
        }
    }
}
