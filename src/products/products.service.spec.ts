
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, ILike } from 'typeorm';
import { Products } from './entities/products.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PartialUpdateProductDto } from './dto/partial-update-product.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Products)
    private readonly productsRepo: Repository<Products>,
  ) {}

  async create(dto: CreateProductDto) {
    const product = this.productsRepo.create(dto);
    const savedProduct = await this.productsRepo.save(product);

    return {
      message: 'Product created successfully',
      data: savedProduct,
    };
  }

  async findAll() {
    const products = await this.productsRepo.find({
      order: { createdAt: 'DESC' },
    });

    return {
      message: 'Products retrieved successfully',
      count: products.length,
      data: products,
    };
  }

  async findOne(id: number) {
    const product = await this.productsRepo.findOne({
      where: { id },
    });

    if (!product) {
      throw new NotFoundException(`Product with id ${id} not found`);
    }

    return {
      message: 'Product retrieved successfully',
      data: product,
    };
  }

  async update(id: number, dto: PartialUpdateProductDto) {
    const product = await this.productsRepo.findOne({
      where: { id },
    });

    if (!product) {
      throw new NotFoundException(`Product with id ${id} not found`);
    }

    Object.assign(product, dto);
    const updatedProduct = await this.productsRepo.save(product);

    return {
      message: 'Product updated successfully',
      data: updatedProduct,
    };
  }

  async replace(id: number, dto: UpdateProductDto) {
    const product = await this.productsRepo.findOne({
      where: { id },
    });

    if (!product) {
      throw new NotFoundException(`Product with id ${id} not found`);
    }

    Object.assign(product, dto);
    const updatedProduct = await this.productsRepo.save(product);

    return {
      message: 'Product replaced successfully',
      data: updatedProduct,
    };
  }

  async remove(id: number) {
    const product = await this.productsRepo.findOne({
      where: { id },
    });

    if (!product) {
      throw new NotFoundException(`Product with id ${id} not found`);
    }

    await this.productsRepo.delete(id);

    return {
      message: 'Product deleted successfully',
      id,
    };
  }

  async findByCategory(category: string) {
    const products = await this.productsRepo.find({
      where: { category: ILike(category) },
      order: { createdAt: 'DESC' },
    });

    return {
      message: 'Products retrieved by category successfully',
      count: products.length,
      data: products,
    };
  }

  async search(keyword: string) {
    const products = await this.productsRepo.find({
      where: { name: ILike(`%${keyword}%`) },
      order: { createdAt: 'DESC' },
    });

    return {
      message: 'Product search completed successfully',
      count: products.length,
      data: products,
    };
  }

  async toggleActive(id: number) {
    const product = await this.productsRepo.findOne({
      where: { id },
    });

    if (!product) {
      throw new NotFoundException(`Product with id ${id} not found`);
    }

    product.isActive = !product.isActive;
    const updatedProduct = await this.productsRepo.save(product);

    return {
      message: 'Product active status toggled successfully',
      data: updatedProduct,
    };
  }
}
