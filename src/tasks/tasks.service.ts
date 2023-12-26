/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import { v4 as uuid} from 'uuid'
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { NotFoundError } from 'rxjs';

@Injectable()
export class TasksService {
    private tasks: Task[] = [];

    getAllTasks(): Task[] {
        return this.tasks;
    }

    getTaskWithFilters(FilterDto: GetTasksFilterDto): Task[] {
       const { status, search } = FilterDto;

       let tasks = this.getAllTasks();

       if (status) {
        tasks = tasks.filter((task) => task.status === status);
       }

       if (search) {
         tasks = tasks.filter((task) => {
            if (task.title.includes(search) || task.description.includes(search)) {
                return true
            }
            return false
         }); 
       }

       return tasks;
    }

    getTaskById(id: string): Task {
       const found =  this.tasks.find((task) => task.id === id );
    
       if(!found) {
        throw new NotFoundException(`Task with id "${id}" not found`);
      } else {
         return found;
      }
    }
    

    deleteTask(id: string): void {
        const found = this.getTaskById(id);
       this.tasks = this.tasks.filter((tasks) => tasks.id !== found.id)
    }

    updateTaskStatus(id: string, status: TaskStatus): Task {
        const task = this.getTaskById(id);
        task.status = status;
        return task;
    }

    createTasks(createTaskDto: CreateTaskDto): Task {
        const { title, description } = createTaskDto;
        
        const tasks: Task = {
            id: uuid(),
            title,
            description,
            status: TaskStatus.OPEN
        };

        this.tasks.push(tasks);
        return tasks;
    }
}
