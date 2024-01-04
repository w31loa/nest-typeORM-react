import { Controller, Get, Post, Body, Patch, Param, Delete, UsePipes, ValidationPipe, UseGuards, Request, Query} from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { AuthorGuard } from 'src/guard/author.guard';

@Controller('transactions')
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}


  @Get(':type/total')
  @UseGuards(JwtAuthGuard)
  findTotalAmountByType(@Request() req, @Param('type') type:string){
    return this.transactionService.findTotalAmountByType(req.user.id, type)
  }

  @Get('pagination')
  @UseGuards(JwtAuthGuard)
  findAllWithPagination( 
        @Request() req,
        @Query('page')page:number = 1, 
        @Query('limit')limit:number = 3
     ){
    return this.transactionService.findAllWithPagination(+req.user.id, +page, +limit)
  }


  @UsePipes(new ValidationPipe())
  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createTransactionDto: CreateTransactionDto, @Request() req) {
    return this.transactionService.create(createTransactionDto, +req.user.id);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  findAll(@Request() req) {
    return this.transactionService.findAll(+req.user.id);
  }

  @Get(':type/:id')
  @UseGuards(JwtAuthGuard, AuthorGuard)
  findOne(@Param('id') id: string) {
    return this.transactionService.findOne(+id);
  }

  @Patch(':type/:id')
  @UseGuards(JwtAuthGuard, AuthorGuard)
  update(@Param('id') id: string, @Body() updateTransactionDto: UpdateTransactionDto) {
    return this.transactionService.update(+id, updateTransactionDto);
  }

  @UseGuards(JwtAuthGuard, AuthorGuard)
  @Delete(':type/:id')
  remove(@Param('id') id: string) {
    return this.transactionService.remove(+id);
  }


}
