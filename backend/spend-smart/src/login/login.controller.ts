/*import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
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
}*/


import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { LoginService } from './login.service';
import { LoginDto } from './dto/create-login.dto';
import { SigninDto } from './dto/create-signin.dto';

@Controller('login')
export class LoginController {
  constructor(private loginService: LoginService) {}

  @Post('/create')
  signin(@Body() signinDto: SigninDto): Promise<{ token: string }> {
    return this.loginService.signin(signinDto);
  }

  /*@Get('/read')
  login(@Body() loginDto: LoginDto): Promise<{ token: string }> {
    return this.loginService.login(loginDto);
  }*/


    @Get('/read')
    async login(
        @Query('username') username: string,
        @Query('email') email: string,
        @Query('password') password: string
    ): Promise<{ token: string }> {
        const loginDto: LoginDto = { username, email, password };
        return this.loginService.login(loginDto);
    }
}

