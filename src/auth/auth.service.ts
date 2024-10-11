import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateAuthDto } from './dto/signup.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { User } from './schema/user.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private readonly UserModel: Model<User>,
  ) {}
  async create(createAuthDto: CreateAuthDto) {
    const { email, name, password } = createAuthDto;
    const userEmail = await this.UserModel.findOne({ email });

    if (userEmail) throw new BadRequestException('Email already exists');

    const hashedPassword  = await  bcrypt.hash(password, 10);

   await this.UserModel.create({name, email, password: hashedPassword});
  }


  async login(loginDto: LoginDto){
    const {email, password} = loginDto;

    const emailInuse = await this.UserModel.findOne({email});

    if(!emailInuse) throw new UnauthorizedException('Invalid credentials')

    const isPasswordValid = await bcrypt.compare(password, emailInuse.password);

    if(!isPasswordValid) throw new UnauthorizedException('Invalid credentials')

      return ({
        userId: emailInuse._id,
      })
  }

  findAll() {
    return `This action returns all auth`;
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  update(id: number, updateAuthDto: UpdateAuthDto) {
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }


}
