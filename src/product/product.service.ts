import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { ProductCategoryService } from 'src/product-category/product-category.service';

@Injectable()
export class ProductService {
  constructor(private prismaService: PrismaService) {}

  async create(payload: CreateProductDto) {
    const productCategory = await this.prismaService.productCategory.findUnique(
      {
        where: { id: payload.categoryId },
      },
    );

    if (!productCategory) throw new Error('Product category not found');

    const product = await this.prismaService.product.create({
      data: {
        name: payload.name,
        categoryId: payload.categoryId,
        price: Number(payload.price),
      },
    });

    return { message: 'success', data: product };
  }

  async findAll() {
    const products = await this.prismaService.product.findMany();

    return { message: 'success', data: products };
  }

  async findOne(id: string) {
    const product = await this.prismaService.product.findUnique({
      where: { id: id },
    });

    if (!product) throw new Error('Product not found');

    return { message: 'success', data: product };
  }

  async update(id: string, payload: UpdateProductDto) {
    const product = await this.prismaService.product.findFirst({
      where: { id: id },
    });

    if (!product) throw new Error('Product not found');

    const updatedProduct = await this.prismaService.product.update({
      where: { id: id },
      data: {
        name: payload.name,
        price: Number(payload.price),
        categoryId: payload.categoryId,
      },
    });

    return { message: 'success', data: updatedProduct };
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
