import { Test, TestingModule } from '@nestjs/testing';
import { ValidationOtpController } from './validation-otp.controller';
import { ValidationOtpService } from './validation-otp.service';

describe('ValidationOtpController', () => {
  let controller: ValidationOtpController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ValidationOtpController],
      providers: [ValidationOtpService],
    }).compile();

    controller = module.get<ValidationOtpController>(ValidationOtpController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
