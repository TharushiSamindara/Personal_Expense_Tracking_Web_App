import { ConflictException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Login } from './schema/login.schema';
import mongoose from 'mongoose';
import * as bcrypt from 'bcryptjs';
import { CreateLoginDto } from './dto/create-login.dto';
import * as crypto from 'crypto'; // To generate a reset token

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

        return user; // Return user data (consider excluding password in a real app)
    }

    // Send a reset token to the user's email (method logic for email sending is not included)
    async sendPasswordResetEmail(email: string): Promise<string> {
        const user = await this.loginModel.findOne({ email });
        if (!user) {
            throw new NotFoundException('User with this email does not exist');
        }

        // Generate a reset token (for simplicity, using a random string)
        const resetToken = crypto.randomBytes(32).toString('hex');
        user.resetToken = resetToken;
        user.resetTokenExpires = new Date(Date.now() + 3600000); // Token expires in 1 hour
        await user.save();

        // Logic to send an email should be added here
        // For example, using a mail service to send an email containing the resetToken

        return `Reset token sent to email. Use this token to reset your password: ${resetToken}`;
    }

    // Update the password using a valid reset token
    async resetPassword(token: string, newPassword: string): Promise<string> {
        const user = await this.loginModel.findOne({
            resetToken: token,
            resetTokenExpires: { $gt: new Date() }, // Ensure the token is not expired
        });
        if (!user) {
            throw new UnauthorizedException('Invalid or expired reset token');
        }

        // Hash the new password
        const hashedPassword = await bcrypt.hash(newPassword, 10);

        // Update the user's password and clear the reset token and its expiration
        user.password = hashedPassword;
        user.resetToken = undefined;
        user.resetTokenExpires = undefined;
        await user.save();

        return 'Password has been successfully updated';
    }
}


