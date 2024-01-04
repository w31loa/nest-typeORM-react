import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Transaction } from './entities/transaction.entity';
import { Repository } from 'typeorm';
import { HttpAdapterHost } from '@nestjs/core';
import { CATEGORY_NOT_EXIST_EXCEPTION, TRANSACTION_NOT_FOUND_EXCEPTION } from './transactions.constants';

@Injectable()
export class TransactionService {


  constructor(@InjectRepository(Transaction) private readonly transactionRepository:Repository<Transaction>){}

  async create(createTransactionDto: CreateTransactionDto, id:number) {
    const newTransaction = {
      title: createTransactionDto.title,
      amount: createTransactionDto.amount,
      type: createTransactionDto.type,
      user: {id},
      category: {id:+createTransactionDto.category.id}
    }

    if(!newTransaction){
      throw new HttpException('Something wrong-----', HttpStatus.BAD_REQUEST)
    }
    console.log(newTransaction)
    try{
      await this.transactionRepository.save(newTransaction)
    }
    catch(e){
        throw new HttpException(CATEGORY_NOT_EXIST_EXCEPTION, HttpStatus.INTERNAL_SERVER_ERROR)
    }
    return newTransaction
  }

  async findAll(id:number) {
    const transactions = await this.transactionRepository.find({
      where:{
        user: {id}
      },
      order:{
        createdAt:"DESC"
      }
    })
    return transactions;
  }

  async findOne(id: number) {
    const transaction = await this.transactionRepository.findOne({
      where:{
        id
      },
      relations:{
        user:true
      }
    })
    if(!transaction){
      throw new HttpException(TRANSACTION_NOT_FOUND_EXCEPTION, HttpStatus.NOT_FOUND) 
    }

    return transaction;
  }

  async update(id: number, updateTransactionDto: UpdateTransactionDto) {
    const transaction = await this.transactionRepository.findOne({
      where:{
        id
      }
    })
    if(!transaction){
      throw new HttpException(TRANSACTION_NOT_FOUND_EXCEPTION, HttpStatus.NOT_FOUND) 
    }

    try{
      await this.transactionRepository.update(id,updateTransactionDto)
    }
    catch(e){
        throw new HttpException(CATEGORY_NOT_EXIST_EXCEPTION, HttpStatus.INTERNAL_SERVER_ERROR)
    }

    return updateTransactionDto;
  }

  async remove(id: number) {
    const transaction = await this.transactionRepository.findOne({
      where:{
        id
      }
    })
    if(!transaction){
      throw new HttpException(TRANSACTION_NOT_FOUND_EXCEPTION, HttpStatus.NOT_FOUND) 
    }

    return await this.transactionRepository.delete(id)
  }

  async findAllWithPagination(id:number, page:number, limit:number){
    const transactions = await this.transactionRepository.find({
      where: {
        user:{id}
      },
      relations:{
        category:true,
        user:true
      },
      order:{
        createdAt:'DESC'
      },
      take: limit,
      skip: (page-1)*limit
    })
    return transactions
  }
  

  async findTotalAmountByType(id:number, type:string){
      const transactions = await this.transactionRepository.find({
        where:{
          user: {id},
          type
        }
      })


      const total = transactions.reduce((acc , el)=> acc+el.amount, 0)

      return total
  }
}
