import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { CreateLoginDto } from './dto/create-login.dto';
import { Login } from './schema/login.schema';
import { LoginService } from './login.service';

@Controller('login')
export class LoginController {
    constructor(private loginService: LoginService) {}

    // Register a new user
    @Post('create')
    async createUser(@Body() createLoginDto: CreateLoginDto): Promise<Login> {
        return this.loginService.create(createLoginDto);
    }

    // Login a user by checking username and password
    @Get('read/:username/:password')
    async loginUser(
        @Param('username') username: string, 
        @Param('password') password: string
    ) {
        return this.loginService.login(username, password);
    }

    // Send a password reset email to the user
    @Post('send-reset-email')
    async sendPasswordResetEmail(@Body('email') email: string): Promise<string> {
        return this.loginService.sendPasswordResetEmail(email);
    }

    // Reset the password using a reset token
    @Post('reset-password')
    async resetPassword(
        @Query('token') token: string, 
        @Body('newPassword') newPassword: string
    ): Promise<string> {
        return this.loginService.resetPassword(token, newPassword);
    }
}

