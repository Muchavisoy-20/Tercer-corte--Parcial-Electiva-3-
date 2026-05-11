import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { InventarioLogEntity } from './entities/inventario-log.entity';

@Injectable()
export class InventarioService {
  constructor(
    @InjectRepository(InventarioLogEntity)
    private readonly logRepository: Repository<InventarioLogEntity>,
  ) {}

  async getLogs() {
    return await this.logRepository.find({
      relations: ['producto'],
      order: { fecha: 'DESC' },
    });
  }
}
