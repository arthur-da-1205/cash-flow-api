import { Injectable } from '@nestjs/common';
import { CreateProductCategoryDto } from './dto/create-product-category.dto';
import { UpdateProductCategoryDto } from './dto/update-product-category.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ProductCategoryService {
  constructor(private prismaService: PrismaService) {}

  async create(payload: CreateProductCategoryDto) {
    const category = await this.prismaService.productCategory.create({
      data: {
        name: payload.name,
      },
    });

    return { message: 'success', data: category };
  }

  async findAll() {
    const categories = await this.prismaService.productCategory.findMany();

    return { message: 'success', data: categories };
  }

  async findOne(id: string) {
    const category = await this.prismaService.productCategory.findUnique({
      where: { id: id },
    });

    return { message: 'seccuss', data: category };
  }

  async update(id: string, payload: UpdateProductCategoryDto) {
    const category = await this.prismaService.productCategory.findFirst({
      where: { id: id },
    });

    if (!category) throw new Error('Category not found');

    const updatedCategory = await this.prismaService.productCategory.update({
      where: { id: id },
      data: payload,
    });

    return { message: 'success', user: updatedCategory };
  }

  remove(id: string) {
    return `This action removes a #${id} productCategory`;
  }
}
