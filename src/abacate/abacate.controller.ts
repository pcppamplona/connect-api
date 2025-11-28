import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { AbacateService } from './abacate.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { CreateBillingDto } from './dto/create-billing.dto';
import { CreatePixDto } from './dto/create-pix.dto';

@Controller('abacate')
export class AbacateController {
  constructor(private service: AbacateService) {}

  @Get('customers')
  listCustomers() {
    return this.service.listCustomers();
  }

  @Post('customers')
  createCustomer(@Body() body: CreateCustomerDto) {
    return this.service.createCustomer(body);
  }

  @Get('billings')
  listBillings() {
    return this.service.listBillings();
  }

  @Post('billings')
  createBilling(@Body() body: CreateBillingDto) {
    return this.service.createBilling(body);
  }

  @Post('pix')
  createPix(@Body() body: CreatePixDto) {
    return this.service.createPix(body);
  }

  @Get('pix/check')
  checkPix(@Query('id') id: string) {
    return this.service.checkPix(id);
  }

  @Post('pix/simulate')
  simulatePix() {
    return this.service.simulatePayment();
  }
}
