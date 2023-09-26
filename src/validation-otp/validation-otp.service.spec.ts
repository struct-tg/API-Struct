import { Test, TestingModule } from '@nestjs/testing';
import { ValidationOtpService } from './validation-otp.service';

describe('ValidationOtpService', () => {
  let service: ValidationOtpService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ValidationOtpService],
    }).compile();

    service = module.get<ValidationOtpService>(ValidationOtpService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
