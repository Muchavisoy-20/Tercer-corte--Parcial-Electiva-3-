import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './usuarios/entities/usuario.entity';
import { RoleEntity } from './modules/rol/entities/role.entitity';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class SeedService implements OnModuleInit {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    @InjectRepository(RoleEntity)
    private readonly roleRepository: Repository<RoleEntity>,
  ) {}

  async onModuleInit() {
    await this.seed();
  }

  async seed() {
    // 1. Crear Roles
    let adminRole = await this.roleRepository.findOne({ where: { name: 'admin' as any } });
    if (!adminRole) {
      adminRole = await this.roleRepository.save({ name: 'admin' as any });
    }

    let userRole = await this.roleRepository.findOne({ where: { name: 'user' as any } });
    if (!userRole) {
      userRole = await this.roleRepository.save({ name: 'user' as any });
    }

    // 2. Crear Usuario Admin
    const adminEmail = 'admin@email.com';
    const exists = await this.userRepository.findOne({ where: { email: adminEmail } });

    if (!exists) {
      const hashedPassword = await bcrypt.hash('admin123', 10);
      await this.userRepository.save({
        username: 'admin',
        email: adminEmail,
        password: hashedPassword,
        role: adminRole,
        roleId: adminRole.id,
      });
      console.log('✅ Usuario admin@email.com / admin123 creado');
    }

    // 3. Crear Categoría Inicial
    const categories = await this.roleRepository.query('SELECT * FROM categorias');
    if (categories.length === 0) {
       await this.roleRepository.query("INSERT INTO categorias (nombre) VALUES ('Electrónica')");
       console.log('✅ Categoría Electrónica creada');
    }

    // 4. Crear Productos Iniciales si no hay ninguno
    const productCountResult = await this.roleRepository.query('SELECT COUNT(*) as count FROM productos');
    if (parseInt(productCountResult[0].count) === 0) {
      const cats = await this.roleRepository.query('SELECT id_categoria FROM categorias LIMIT 1');
      const categoryId = cats[0].id_categoria;
      
      const products = [
        { 
          nombre: 'Laptop Gamer Pro', 
          precio: 1200.50, 
          imagen: 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&q=80&w=800' 
        },
        { 
          nombre: 'Smartphone Galaxy Z', 
          precio: 999.99, 
          imagen: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&q=80&w=800' 
        },
        { 
          nombre: 'Auriculares Noise Cancelling', 
          precio: 250.00, 
          imagen: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=800' 
        },
        { 
          nombre: 'Monitor 4K UltraWide', 
          precio: 450.75, 
          imagen: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&q=80&w=800' 
        },
      ];

      for (const p of products) {
        await this.roleRepository.query(
          `INSERT INTO productos (nombre, precio, imagen, categoria_id, fecha_creacion, fecha_actualizacion) 
           VALUES ('${p.nombre}', ${p.precio}, '${p.imagen}', ${categoryId}, NOW(), NOW())`
        );
      }
      console.log(`✅ ${products.length} productos iniciales creados`);
    }
  }
}
