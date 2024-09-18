import { BadRequestException, Injectable } from '@nestjs/common'
import { CreateCategoryDto } from './dto/create-category.dto'
import { UpdateCategoryDto } from './dto/update-category.dto'
import { Repository } from 'typeorm'
import { Category } from './entities/category.entity'
import { InjectRepository } from '@nestjs/typeorm'

@Injectable()
export class CategoryService {
    constructor(
        @InjectRepository(Category)
        private readonly categoryRepository: Repository<Category>
    ) {}
    async create(createCategoryDto: CreateCategoryDto, id: number) {
        const isExist = await this.categoryRepository.findBy({
            user: { id },
            title: createCategoryDto.title,
        })
        if (isExist.length) {
            throw new BadRequestException(
                'Category with this title already exists'
            )
        }
        const category = this.categoryRepository.save({
            ...createCategoryDto,
            user: { id },
        })
        return category
    }

    async findAll(id: number) {
        return await this.categoryRepository.find({ where: { user: { id } } })
    }

    findOne(id: number) {
        return `This action returns a #${id} category`
    }

    update(id: number, updateCategoryDto: UpdateCategoryDto) {
        return `This action updates a #${id} category`
    }

    remove(id: number) {
        return `This action removes a #${id} category`
    }
}
