/*import { ConflictException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Login } from './schema/login.schema';
import mongoose from 'mongoose';
import * as bcrypt from 'bcryptjs';
import { CreateLoginDto } from './dto/create-login.dto';

@Injectable()
export class LoginService {
    
    constructor(
        @InjectModel(Login.name)
        private loginModel: mongoose.Model<Login>,
    ) {}

    // Create a new user with username, password, and email
    async create(createLoginDto: CreateLoginDto): Promise<Login> {
        const { username, password, email } = createLoginDto;

        // Check if the username or email already exists in the database
        const existingUser = await this.loginModel.findOne({ $or: [{ username }, { email }] });
        if (existingUser) {
            throw new ConflictException('Username or email is already taken');
        }

        // Hash the password before saving
        const hashedPassword = await bcrypt.hash(password, 10);

        const createdUser = new this.loginModel({ username, password: hashedPassword, email });
        return createdUser.save();
    }

    // Login user by verifying username and password
    async login(username: string, password: string): Promise<Login> {
        // Find the user by username
        const user = await this.loginModel.findOne({ username });
        if (!user) {
            throw new NotFoundException('User not found');
        }

        // Check if the password is correct
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            throw new UnauthorizedException('Invalid password');
        }

        return user;
    }

}*/


import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Login } from './schema/login.schema';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { SigninDto } from './dto/create-signin.dto';
import { LoginDto } from './dto/create-login.dto';

@Injectable()
export class LoginService {
  constructor(
    @InjectModel(Login.name)
    private loginModel: Model<Login>,
    private jwtService: JwtService,
  ) {}

  async signin(signinDto: SigninDto): Promise<{ token: string }> {
    const { username, email, password } = signinDto;

    const hashedPassword = await bcrypt.hash(password, 10);

    const login = await this.loginModel.create({
      username,
      email,
      password: hashedPassword,
    });

    const token = this.jwtService.sign({ id: login._id });

    return { token };
  }

  async login(loginDto: LoginDto): Promise<{ token: string }> {
    const { email, password } = loginDto;

    const login = await this.loginModel.findOne({ email });

    if (!login) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const isPasswordMatched = await bcrypt.compare(password, login.password);

    if (!isPasswordMatched) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const token = this.jwtService.sign({ id: login._id });

    return { token };
  }
}


