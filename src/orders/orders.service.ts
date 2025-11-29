import { Injectable } from '@nestjs/common';
import { EvolutionService } from '../evolution/evolution.service';
import { AbacateService } from 'src/abacate/abacate.service';
import { CreateOrderDto } from './dto/create-order.dto';

@Injectable()
export class OrdersService {
  private orders: any[] = [];

  constructor(
    private abacate: AbacateService,
    private evo: EvolutionService,
  ) {}

  async createOrder(body: CreateOrderDto) {
    const amount = Math.round(Number(body.valor.replace(',', '.')) * 100);

    const customer = await this.abacate.createCustomer({
      name: body.nome,
      cellphone: body.telefone,
      email: body.email,
      taxId: body.cpf,
    });

    const pix = await this.abacate.createPix({
      amount,
      description: `Pedido de ${body.produto}`,
      customer: {
        name: body.nome,
        cellphone: body.telefone,
        email: body.email,
        taxId: body.cpf,
      },
      metadata: {
        externalId: Date.now().toString(),
      },
    });

    const order = {
      id: pix.data.id,
      status: pix.data.status,
      brCode: pix.data.brCode,
      brCodeBase64: pix.data.brCodeBase64,
      amount,
      ...body,
    };

    this.orders.push(order);

    const msg = `
Olá ${body.nome}, aqui é da LOJA X, recebemos o seu pedido e está quase tudo pronto para o envio!
Precisamos apenas da confirmação do pagamento.

Detalhes do pedido:
• ${body.produto}
• R$ ${(amount / 100).toFixed(2)}
• ${body.endereco}

Pague agora mesmo com o PIX copia e cola abaixo e garanta o seu pedido antes que acabem as últimas unidades:

${pix.data.brCode}
    `;

    await this.evo.sendText(body.telefone, msg);

    return order;
  }

  async checkOrder(id: string) {
    const status = await this.abacate.checkPix(id);

    const order = this.orders.find((o) => o.id === id);
    if (!order) return { error: 'Order not found' };

    order.status = status.data.status;

    return order;
  }

  async simulate(id: string) {
    const order = this.orders.find((o) => o.id === id);
    if (!order) return { error: 'Order not found' };

    try {
      // Passa o id para a simulação
      await this.abacate.simulatePayment(order.id);

      // Opcional: verificar status real da API
      // const statusData = await this.abacate.checkPix(order.id);
      // order.status = statusData.data.status;

      // Para simplificar, já podemos marcar como pago
      order.status = 'PAID';

      await this.evo.sendText(order.telefone, 'Obrigado por comprar conosco!');

      return order;
    } catch (err) {
      console.error('Erro ao simular pagamento:', err);
      throw new Error('Falha ao processar pagamento');
    }
  }
}
