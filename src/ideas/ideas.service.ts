import { Injectable, NotFoundException } from '@nestjs/common';
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
    return await this.ideasRepository.findOne({ where: { id } });
  }
  async createIdea(data: IdeaDto): Promise<Idea> {
    return await this.ideasRepository.save(data);
  }
  async updateOne(id: string, data: Partial<IdeaDto>): Promise<Idea> {
    await this.ideasRepository.update({ id }, data);
    return await this.ideasRepository.findOne({ where: { id } });
  }
  async deleteOne(id: string): Promise<void> {
    const result = await this.ideasRepository.delete({ id });
    if (result.affected === 0) {
      throw new NotFoundException(`Idea with ID: ${id} not found`);
    }
  }
}
