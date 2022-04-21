import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { BookController } from './book.controller';
import { Book } from './book.entity';
import { BookService } from './book.service';

@Module({
  imports: [MikroOrmModule.forFeature({ entities: [Book] })],
  controllers: [BookController],
  providers: [BookService],
})
export class BookModule {}
