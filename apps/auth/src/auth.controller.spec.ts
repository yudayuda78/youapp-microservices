import { Test, TestingModule } from '@nestjs/testing';
jest.mock('./auth.service', () => ({
  AuthService: jest.fn().mockImplementation(() => ({
    getHello: jest.fn(),
    register: jest.fn(),
    login: jest.fn(),
  })),
}));
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

describe('AuthController (Microservice)', () => {
  let controller: AuthController;
  let service: jest.Mocked<AuthService>;

  const mockAuthService = {
    getHello: jest.fn(),
    register: jest.fn(),
    login: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: mockAuthService, // 🔥 INI KUNCI UTAMA
        },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    service = module.get(AuthService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return hello message', () => {
    mockAuthService.getHello.mockReturnValue('Hello Baby!');

    const result = controller.getHello();

    expect(result).toBe('Hello Baby!');
    expect(service.getHello).toHaveBeenCalled();
  });

  it('should call register service with RegisterDto', async () => {
    const dto: RegisterDto = {
      email: 'test@mail.com',
      username: 'testuser',
      password: 'password123',
    };

    mockAuthService.register.mockResolvedValue({
      message: 'Register success',
    } as any);

    const result = await controller.register(dto);

    expect(service.register).toHaveBeenCalledWith(dto);
    expect(result).toEqual({ message: 'Register success' });
  });

  it('should call login service with LoginDto', async () => {
    const dto: LoginDto = {
      login: 'testuser',
      password: 'password123',
    };

    mockAuthService.login.mockResolvedValue({
      access_token: 'jwt-token',
    } as any);

    const result = await controller.login(dto);

    expect(service.login).toHaveBeenCalledWith(dto);
    expect(result).toEqual({ access_token: 'jwt-token' });
  });
});
