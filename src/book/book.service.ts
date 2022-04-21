import { EntityRepository } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityManager } from '@mikro-orm/postgresql';
import { Book } from './book.entity';
import { CreateBookDTO } from './dto/create-book-dto';

export class BookService {
  constructor(
    @InjectRepository(Book)
    private readonly bookRepository: EntityRepository<Book>,
    private readonly em: EntityManager,
  ) {}

  async fetchAll(): Promise<Book[]> {
    return this.em
      .createQueryBuilder(Book)
      .select('title')
      .where({
        $not: {
          $not: {
            title: {
              $like: '%title2%',
            },
            author: {
              $like: '%jed%',
            },
          },
        },
      })
      .execute();
    return this.bookRepository.find({
      $not: {
        $not: {
          title: {
            $like: '%title2%',
          },
          author: {
            $like: '%jed%',
          },
        },
      },
    });
  }

  async findOne(id: number): Promise<Book> {
    const findOneOptions = {
      id: id,
    };
    return this.bookRepository.findOne(findOneOptions);
  }

  async createBook(dto: CreateBookDTO): Promise<Book> {
    const { title, author } = dto;
    const book = new Book(title, author);

    await this.bookRepository.persistAndFlush(book);
    return book;
  }
}
