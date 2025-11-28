import { Controller, Post, Body, Get, Param } from "@nestjs/common";
import { OrdersService } from "./orders.service";
import { CreateOrderDto } from "./dto/create-order.dto";

@Controller("orders")
export class OrdersController {
  constructor(private service: OrdersService) {}

  @Post()
  create(@Body() body: CreateOrderDto) {
    return this.service.createOrder(body);
  }

  @Get("check/:id")
  check(@Param("id") id: string) {
    return this.service.checkOrder(id);
  }

  @Post("simulate/:id")
  simulate(@Param("id") id: string) {
    return this.service.simulate(id);
  }
}
