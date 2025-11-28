import { Module } from "@nestjs/common";
import { OrdersService } from "./orders.service";
import { OrdersController } from "./orders.controller";
import { EvolutionModule } from "../evolution/evolution.module";
import { AbacateModule } from "src/abacate/abacate.module";

@Module({
  imports: [
    AbacateModule, 
    EvolutionModule, 
  ],
  controllers: [OrdersController],
  providers: [OrdersService],
})
export class OrdersModule {}
