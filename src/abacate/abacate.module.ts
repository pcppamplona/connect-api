import { Module } from "@nestjs/common";
import { AbacateService } from "./abacate.service";
import { AbacateController } from "./abacate.controller";

@Module({
  controllers: [AbacateController],
  providers: [AbacateService],
  exports: [AbacateService] 
})
export class AbacateModule {}
