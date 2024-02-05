import { Test } from "@nestjs/testing";
import { TasksService } from "./tasks.service";
import { TasksRepository } from "./tasks.repository";
import { mock } from "node:test";
import { TaskStatus } from "./task-status.enum";
import { NotFoundException } from "@nestjs/common";

const mockTaskRepository = () => ({
    getTasks: jest.fn(),
    findOne: jest.fn(),
});

const mockUser = {
    username: 'abc',
    password: 'SomePassword@',
    id: 'someId',
    tasks: []
}

describe('TaskService', () => {
 let tasksService: TasksService;
 let tasksRepository;

 beforeEach(async () => {
    const module = await Test.createTestingModule({
        providers: [
            TasksService,
        { provide: TasksRepository, useFactory: mockTaskRepository },
        ],
    }).compile();

    tasksService = module.get(TasksService);
    tasksRepository = module.get(TasksRepository);
 });

describe('getTasks', () => {
 it('calls TasksRepository.getTasks and returns trsult', async () => {
   tasksRepository.getTasks.mockResolvedValue('someValue')
   const result = await tasksService.getTasks(null, mockUser);
    expect(result).toEqual('someValue');
 });
});

describe('getTaskById', () => {
  it('calls TasksRepository.findOne and returns result', async () => {
    const mockTasks = {
        title: 'someTile',
        description: 'somed',
        id: 'someId',
        status: TaskStatus.OPEN
    }
    tasksRepository.findOne.mockResolvedValue(mockTasks);
    const result = await tasksService.getTaskById('someId', mockUser);
    expect(result).toEqual(mockTasks);
  });

  it('calls TasksRepository.findOne and handles an error', async () => {
   tasksRepository.findOne.mockResolvedValue(null);
   expect(tasksService.getTaskById('someId', mockUser)).rejects.toThrow(NotFoundException);
  });

 });
});