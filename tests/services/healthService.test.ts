import { HealthService } from '@/services/healthService';
import { sequelize } from '@/config/database';

// Mock sequelize
jest.mock('@/config/database', () => ({
  sequelize: {
    authenticate: jest.fn(),
  },
}));

describe('HealthService', () => {
  let healthService: HealthService;
  const mockSequelize = sequelize as jest.Mocked<typeof sequelize>;

  beforeEach(() => {
    healthService = new HealthService();
    jest.clearAllMocks();
  });

  describe('getHealthStatus', () => {
    it('should return healthy status when database connection is successful', async () => {
      // Arrange
      mockSequelize.authenticate.mockResolvedValue();
      
      // Act
      const result = await healthService.getHealthStatus();
      
      // Assert
      expect(result).toMatchObject({
        status: 'OK',
        service: 'Express Template API',
        version: '1.0.0',
        database: {
          status: 'Connected',
          type: 'PostgreSQL'
        }
      });
      expect(result.timestamp).toBeDefined();
      expect(result.uptime).toBeDefined();
      expect(result.memory).toMatchObject({
        used: expect.any(Number),
        total: expect.any(Number),
        unit: 'MB'
      });
      expect(mockSequelize.authenticate).toHaveBeenCalledTimes(1);
    });

    it('should return error status when database connection fails', async () => {
      // Arrange
      const dbError = new Error('Database connection failed');
      mockSequelize.authenticate.mockRejectedValue(dbError);
      
      // Act
      const result = await healthService.getHealthStatus();
      
      // Assert
      expect(result).toMatchObject({
        status: 'ERROR',
        service: 'Express Template API',
        version: '1.0.0',
        database: {
          status: 'Disconnected',
          error: 'Database connection failed'
        }
      });
      expect(result.timestamp).toBeDefined();
      expect(result.uptime).toBeUndefined();
      expect(result.memory).toBeUndefined();
      expect(mockSequelize.authenticate).toHaveBeenCalledTimes(1);
    });

    it('should handle unknown error types', async () => {
      // Arrange
      mockSequelize.authenticate.mockRejectedValue('Unknown error');
      
      // Act
      const result = await healthService.getHealthStatus();
      
      // Assert
      expect(result.database.error).toBe('Unknown error');
    });

    it('should return timestamp in ISO format', async () => {
      // Arrange
      mockSequelize.authenticate.mockResolvedValue();
      const beforeTest = new Date();
      
      // Act
      const result = await healthService.getHealthStatus();
      const afterTest = new Date();
      
      // Assert
      const resultTime = new Date(result.timestamp);
      expect(resultTime).toBeInstanceOf(Date);
      expect(resultTime.getTime()).toBeGreaterThanOrEqual(beforeTest.getTime());
      expect(resultTime.getTime()).toBeLessThanOrEqual(afterTest.getTime());
    });
  });

  describe('getSimpleHealthStatus', () => {
    it('should return simple health status', () => {
      // Act
      const result = healthService.getSimpleHealthStatus();
      
      // Assert
      expect(result).toEqual({
        status: 'OK',
        message: 'Service is healthy'
      });
    });

    it('should always return the same response', () => {
      // Act
      const result1 = healthService.getSimpleHealthStatus();
      const result2 = healthService.getSimpleHealthStatus();
      
      // Assert
      expect(result1).toEqual(result2);
    });
  });
}); 