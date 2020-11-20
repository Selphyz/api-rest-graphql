import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { IdeaDto } from './dto/idea.dto';
import { Idea } from './idea.entity';
import { IdeasService } from './ideas.service';

@Controller('ideas')
export class IdeasController {
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
  createIdea(@Body() data: IdeaDto): Promise<Idea> {
    return this.ideaService.createIdea(data);
  }

  @Put(':id')
  updateIdea(
    @Param('id') id: string,
    @Body() data: Partial<IdeaDto>,
  ): Promise<Idea> {
    return this.ideaService.updateOne(id, data);
  }

  @Delete(':id')
  deleteIdea(@Param('id') id: string): void {
    this.ideaService.deleteOne(id);
  }
}
