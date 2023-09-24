import { LifeService } from './life.service';

describe('LifeCellService', () => {
  const service: LifeService = new LifeService();

  it('should create', () => {
    expect(service).toBeTruthy();
  });
});
