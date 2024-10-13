import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({
    timestamps: true,
})
export class Login {
    @Prop({ unique: true ,  required: true })
    username: String

    @Prop({ required: true })
    password: String;

    @Prop({ unique: true ,  required: true })
    email: String;

    /*@Prop()
    resetToken?: string;

    @Prop()
    resetTokenExpires?: Date;*/
}

export const LoginSchema = SchemaFactory.createForClass(Login);

