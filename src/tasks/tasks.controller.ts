import { Body, Controller, Get, Post, Param, Delete, Patch, Query, UseGuards } from '@nestjs/common';
import { TaskStatus } from './task-status.enum';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { UpdateTaskStatusDto } from './dto/update-task-status.dto';
import { Task } from './task.entity';
import { TasksService } from './tasks.service';
import { AuthGuard } from '@nestjs/passport';
import { User } from '../auth/user.entity';
import { GetUser } from '../auth/get-user.decorator';
import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Controller('tasks')
@UseGuards(AuthGuard())
export class TasksController {
  private logger = new Logger('TaskController');
  constructor(
    private tasksService: TasksService,
    private configService: ConfigService
    ) {
      console.log(configService.get('TEST_VALUE'));
    }

  @Get()
  getTasks(@Query() FilterDto: GetTasksFilterDto,
   @GetUser() user: User
   ): Promise<Task[]> {
    this.logger.verbose(`User "${user.username}" getting all task`);
    return this.tasksService.getTasks(FilterDto, user);
  }


  @Get('/:id')
     gettaskById(@Param('id') id: string,
      @GetUser() user: User
      ): Promise<Task> {
      return this.tasksService.getTaskById(id, user);
  }
 

  @Post()
   createTask(
    @Body() createTaskDto: CreateTaskDto,
    @GetUser() user: User,
    ): Promise<Task> {
    return this.tasksService.createTask(createTaskDto, user);
  }

  @Delete('/:id')
  deleteTask(@Param('id') id: string, @GetUser() user: User): Promise<void> {
    return this.tasksService.deleteTask(id, user);
  }

  @Patch('/:id/status')
  updateTaskStatus(
    @Param('id') id: string,
    @Body() updateTaskStatusDto: UpdateTaskStatusDto,
    @GetUser() user: User
  ): Promise<Task> {
    const { status } = updateTaskStatusDto;
    return this.tasksService.updateTaskStatus(id, status, user);
  }

}
