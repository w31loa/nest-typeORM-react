import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from './entities/category.entity';
import { CATEGORY_NOT_FOUND_EXCEPTION } from './category.constants';

@Injectable()
export class CategoryService {

  constructor(@InjectRepository(Category) private readonly categoryRepository:Repository<Category>){}

  async create(createCategoryDto: CreateCategoryDto, id:number) {
    const isExist = await this.categoryRepository.findBy({
      user: {id},
      title: createCategoryDto.title
    })

    if(isExist.length){
      throw new HttpException(CATEGORY_NOT_FOUND_EXCEPTION, HttpStatus.BAD_REQUEST)
    }

    const newCategory = {
      title:createCategoryDto.title,
      user: {
        id
      }
    }
    return await this.categoryRepository.save(newCategory);
  }

  async findAll(id:number) {
    return await this.categoryRepository.find({where:{
      user: {id}
    },
    relations:{
      transactions: true
    }});
  }

  async findOne(id: number) {
    const category = await this.categoryRepository.findOne({
      where: {id},
      relations: {
        user:true,
        transactions:true
      }
    })

    if(!category){
      throw new HttpException(CATEGORY_NOT_FOUND_EXCEPTION, HttpStatus.NOT_FOUND)
    }
    return category;
  }

  async update(id: number, updateCategoryDto: UpdateCategoryDto) {
    const category = await this.categoryRepository.findOne({where: {id:id}})
    if(!category){
      throw new HttpException(CATEGORY_NOT_FOUND_EXCEPTION, HttpStatus.NOT_FOUND)
    }

    return await this.categoryRepository.update(id,updateCategoryDto)
  }

  async remove(id: number) {
    const category = await this.categoryRepository.findOne({where: {id:id}})
    if(!category){
      throw new HttpException(CATEGORY_NOT_FOUND_EXCEPTION, HttpStatus.NOT_FOUND)
    }

    return await this.categoryRepository.delete(id)
  }
}
