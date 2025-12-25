import { Test, TestingModule } from '@nestjs/testing';
import { ProfileService } from './profile.service';
import { ClientProxy } from '@nestjs/microservices';
import { of } from 'rxjs';
import { CreateProfileDto } from './dto/create-profile.dto';

describe('ProfileService', () => {
  let service: ProfileService;
  let clientProxy: ClientProxy;

  const mockClientProxy = {
    send: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProfileService,
        {
          provide: 'PROFILE_SERVICE',
          useValue: mockClientProxy,
        },
      ],
    }).compile();

    service = module.get<ProfileService>(ProfileService);
    clientProxy = module.get<ClientProxy>('PROFILE_SERVICE');
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  // =========================
  // createProfile
  // =========================
  it('should call createProfile with userId and dto', async () => {
    const userId = 'user-123';

    const dto: CreateProfileDto = {
      name: 'John Doe',
      birthday: '1998-05-20',
      gender: 'male',
      height: 170,
      weight: 65,
      interests: ['coding'],
    };

    const response = { success: true };

    mockClientProxy.send.mockReturnValue(of(response));

    const result = await service.createProfile(userId, dto).toPromise();

    expect(clientProxy.send).toHaveBeenCalledWith('createProfile', {
      userId,
      dto,
    });

    expect(result).toEqual(response);
  });

  // =========================
  // getProfile
  // =========================
  it('should call getProfile with userId', async () => {
    const userId = 'user-123';
    const response = { name: 'John Doe' };

    mockClientProxy.send.mockReturnValue(of(response));

    const result = await service.getProfile(userId).toPromise();

    expect(clientProxy.send).toHaveBeenCalledWith('getProfile', { userId });
    expect(result).toEqual(response);
  });

  // =========================
  // updateProfile
  // =========================
  it('should call updateProfile with userId and dto', async () => {
    const userId = 'user-123';

    const dto: CreateProfileDto = {
      name: 'John Updated',
      birthday: '1998-05-20',
      gender: 'male',
      height: 175,
      weight: 70,
      interests: ['music'],
    };

    const response = { success: true };

    mockClientProxy.send.mockReturnValue(of(response));

    const result = await service.updateProfile(userId, dto).toPromise();

    expect(clientProxy.send).toHaveBeenCalledWith('updateProfile', {
      userId,
      dto,
    });

    expect(result).toEqual(response);
  });
});
