import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    Req,
    UseGuards,
} from '@nestjs/common'
import { CategoryService } from './category.service'
import { CreateCategoryDto } from './dto/create-category.dto'
import { UpdateCategoryDto } from './dto/update-category.dto'
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard'

@Controller('category')
export class CategoryController {
    constructor(private readonly categoryService: CategoryService) {}

    @Post()
    @UseGuards(JwtAuthGuard)
    create(@Body() createCategoryDto: CreateCategoryDto, @Req() req) {
        return this.categoryService.create(createCategoryDto, +req.user.id)
    }

    @Get()
    findAll() {
        return this.categoryService.findAll()
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.categoryService.findOne(+id)
    }

    @Patch(':id')
    update(
        @Param('id') id: string,
        @Body() updateCategoryDto: UpdateCategoryDto
    ) {
        return this.categoryService.update(+id, updateCategoryDto)
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.categoryService.remove(+id)
    }
}
