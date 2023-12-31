import { Injectable, NotFoundException } from '@nestjs/common';
import { TaskStatus } from './task-status.enum';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { TasksRepository } from './tasks.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TasksRepository)
    private tasksRepository: TasksRepository,
  ) {}

  // constructor(private tasksRepository: TasksRepository) {}


      getTasks(filterDto: GetTasksFilterDto): Promise<Task []> {
        return this.tasksRepository.getTask(filterDto);
      }

      async getTaskById(id: string): Promise<Task> {
        
        
         const task = await this.tasksRepository.findOneBy({id: id});

         if (!task) {
            throw new NotFoundException(`Task with id "${id}" not found`);
         }

         return task;
      }
    
   async deleteTask(id: string): Promise<void> {
        const result = this.tasksRepository.delete(id);
        if((await result).affected === 0) {
          throw new NotFoundException(`Task with ID ${id} Not found`)
        }
    }

    async updateTaskStatus(id: string, status: TaskStatus): Promise<Task> {
        const task = await this.getTaskById(id);
        task.status = status;
        await this.tasksRepository.save(task);
        return task;
    }

    async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
      return this.tasksRepository.createTask(createTaskDto);
    }
}