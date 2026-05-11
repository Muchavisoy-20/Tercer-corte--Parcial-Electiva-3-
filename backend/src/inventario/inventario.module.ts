import { Module } from '@nestjs/common';
import { InventarioService } from './inventario.service';
import { InventarioController } from './inventario.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InventarioEntity } from './entities/inventario.entity';
import { InventarioLogEntity } from './entities/inventario-log.entity';

@Module({
  imports: [TypeOrmModule.forFeature([InventarioEntity, InventarioLogEntity])],
  controllers: [InventarioController],
  providers: [InventarioService],
  exports: [InventarioService],
})
export class InventarioModule {}
