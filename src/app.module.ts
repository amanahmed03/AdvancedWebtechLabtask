
import { Module } from '@nestjs/common';
import { ProductsModule } from './products/products.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '0305',
      database: 'product_inventory_db',
      autoLoadEntities: true,
      synchronize: true,
    }),
    ProductsModule,
  ],
})
export class AppModule {}
