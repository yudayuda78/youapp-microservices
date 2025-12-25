import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { ClientProxy } from '@nestjs/microservices';
import { of, lastValueFrom } from 'rxjs';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

describe('AuthService', () => {
  let service: AuthService;
  let clientProxy: ClientProxy;

  const mockClientProxy = {
    send: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: 'AUTH_SERVICE',
          useValue: mockClientProxy,
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    clientProxy = module.get<ClientProxy>('AUTH_SERVICE');
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  // =========================
  // register
  // =========================
  it('should call register with RegisterDto', async () => {
    const dto: RegisterDto = {
      email: 'test@mail.com',
      username: 'testuser',
      password: '123456',
    };

    mockClientProxy.send.mockReturnValue(of({ success: true }));

    const result = await lastValueFrom(service.register(dto));

    expect(clientProxy.send).toHaveBeenCalledWith('register', dto);
    expect(result).toEqual({ success: true });
  });

  // =========================
  // login
  // =========================
  it('should call login with LoginDto', async () => {
    const dto: LoginDto = {
      login: 'testuser',
      password: '123456',
    };

    const response = { accessToken: 'jwt-token' };
    mockClientProxy.send.mockReturnValue(of(response));

    const result = await lastValueFrom(service.login(dto));

    expect(clientProxy.send).toHaveBeenCalledWith('login', dto);
    expect(result).toEqual(response);
  });
});
