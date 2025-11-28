import { Controller, Post, Body } from "@nestjs/common";
import { EvolutionService } from "./evolution.service";
import { SendTextDto } from "./dto/send-text.dto";

@Controller("evolution")
export class EvolutionController {
  constructor(private service: EvolutionService) {}

  @Post("send-text")
  sendText(@Body() body: SendTextDto) {
    return this.service.sendText(body.number, body.text);
  }
}
