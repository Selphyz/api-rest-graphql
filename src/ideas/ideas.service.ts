import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IdeaDto } from './dto/idea.dto';
import { Idea } from './idea.entity';

@Injectable()
export class IdeasService {
  constructor(
    @InjectRepository(Idea) private ideasRepository: Repository<Idea>,
  ) {}
  async showAll(): Promise<Idea[]> {
    return await this.ideasRepository.find();
  }
  async showOne(id: string): Promise<Idea> {
    const idea = await this.ideasRepository.findOne({ where: { id } });
    if (!idea) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }
    return idea;
  }
  async createIdea(data: IdeaDto): Promise<Idea> {
    return await this.ideasRepository.save(data);
  }
  async updateOne(id: string, data: Partial<IdeaDto>): Promise<Idea> {
    const idea = await this.showOne(id);
    if (!idea) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }
    if (data.description) idea.description = data.description;
    if (data.idea) idea.idea = data.idea;
    idea.save();
    return idea;
  }
  async deleteOne(id: string): Promise<void> {
    const result = await this.ideasRepository.delete({ id });
    if (result.affected === 0) {
      throw new NotFoundException(`Idea with ID: ${id} not found`);
    }
  }
}
