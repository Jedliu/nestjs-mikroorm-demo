import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  Param,
  Post,
  Put,
  UsePipes,
} from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { ValidationPipe } from '../shared/pipes/validation.pipe';
import { CreateUserDto, LoginUserDto, UpdateUserDto } from './dto';
import { User } from './user.decorator';
import { IUserRO } from './user.interface';
import { UserService } from './user.service';

@ApiBearerAuth()
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('me')
  async findMe(@User('email') email: string): Promise<IUserRO> {
    return this.userService.findByEmail(email);
  }

  @Put()
  async update(@User('id') userId: number, @Body() userData: UpdateUserDto) {
    return this.userService.update(userId, userData);
  }

  @Post('signup')
  async create(@Body() userData: CreateUserDto) {
    return this.userService.create(userData);
  }

  @Delete('users/:slug')
  async delete(@Param() params): Promise<any> {
    return this.userService.delete(params.slug);
  }

  @UsePipes(new ValidationPipe())
  @Post('login')
  async login(@Body() loginUserDto: LoginUserDto): Promise<IUserRO> {
    const foundUser = await this.userService.findOne(loginUserDto);

    const errors = { User: ' not found' };
    if (!foundUser) {
      throw new HttpException({ errors }, 401);
    }
    const token = this.userService.generateJWT(foundUser);
    const { email, username, bio, image } = foundUser;
    const user = { email, token, username, bio, image };
    return { user };
  }
}
