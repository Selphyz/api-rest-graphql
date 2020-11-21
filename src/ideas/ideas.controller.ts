import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  Param,
  Post,
  Put,
  UsePipes,
} from '@nestjs/common';
import { ValidationPipe } from '../shared/validation.pipe';
import { IdeaDto } from './dto/idea.dto';
import { Idea } from './idea.entity';
import { IdeasService } from './ideas.service';

@Controller('ideas')
export class IdeasController {
  private logger = new Logger();
  constructor(private ideaService: IdeasService) {}
  @Get()
  getAllIdeas(): Promise<Idea[]> {
    return this.ideaService.showAll();
  }

  @Get(':id')
  getIdea(@Param('id') id: string): Promise<Idea> {
    return this.ideaService.showOne(id);
  }

  @Post()
  @UsePipes(new ValidationPipe())
  createIdea(@Body() data: IdeaDto): Promise<Idea> {
    this.logger.log(JSON.stringify(data));
    return this.ideaService.createIdea(data);
  }

  @Put(':id')
  @UsePipes(new ValidationPipe())
  updateIdea(
    @Param('id') id: string,
    @Body() data: Partial<IdeaDto>,
  ): Promise<Idea> {
    this.logger.log(JSON.stringify(data));
    return this.ideaService.updateOne(id, data);
  }

  @Delete(':id')
  deleteIdea(@Param('id') id: string): void {
    this.ideaService.deleteOne(id);
  }
}
