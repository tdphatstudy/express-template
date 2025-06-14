import { Request, Response } from 'express';
import { getHealth, getHealthSimple } from '@/controllers/healthController';
import { healthService } from '@/services/healthService';

// Mock the health service
jest.mock('@/services/healthService', () => ({
  healthService: {
    getHealthStatus: jest.fn(),
    getSimpleHealthStatus: jest.fn(),
  },
}));

describe('HealthController', () => {
  const mockHealthService = healthService as jest.Mocked<typeof healthService>;
  let req: Partial<Request>;
  let res: Partial<Response>;
  let statusSpy: jest.Mock;
  let jsonSpy: jest.Mock;

  beforeEach(() => {
    statusSpy = jest.fn().mockReturnThis();
    jsonSpy = jest.fn().mockReturnThis();

    req = {};
    res = {
      status: statusSpy,
      json: jsonSpy,
    };

    jest.clearAllMocks();
  });

  describe('getHealth', () => {
    it('should return 200 status when health service returns OK', async () => {
      // Arrange
      const healthData = {
        status: 'OK',
        timestamp: '2024-01-01T00:00:00.000Z',
        service: 'Express Template API',
        version: '1.0.0',
        database: {
          status: 'Connected',
          type: 'PostgreSQL',
        },
        uptime: 100,
        memory: {
          used: 50,
          total: 100,
          unit: 'MB',
        },
      };
      mockHealthService.getHealthStatus.mockResolvedValue(healthData);

      // Act
      await getHealth(req as Request, res as Response);

      // Assert
      expect(mockHealthService.getHealthStatus).toHaveBeenCalledTimes(1);
      expect(statusSpy).toHaveBeenCalledWith(200);
      expect(jsonSpy).toHaveBeenCalledWith(healthData);
    });

    it('should return 503 status when health service returns ERROR', async () => {
      // Arrange
      const healthData = {
        status: 'ERROR',
        timestamp: '2024-01-01T00:00:00.000Z',
        service: 'Express Template API',
        version: '1.0.0',
        database: {
          status: 'Disconnected',
          error: 'Database connection failed',
        },
      };
      mockHealthService.getHealthStatus.mockResolvedValue(healthData);

      // Act
      await getHealth(req as Request, res as Response);

      // Assert
      expect(mockHealthService.getHealthStatus).toHaveBeenCalledTimes(1);
      expect(statusSpy).toHaveBeenCalledWith(503);
      expect(jsonSpy).toHaveBeenCalledWith(healthData);
    });

    it('should return 500 status when health service throws an error', async () => {
      // Arrange
      const error = new Error('Service unavailable');
      mockHealthService.getHealthStatus.mockRejectedValue(error);

      // Act
      await getHealth(req as Request, res as Response);

      // Assert
      expect(mockHealthService.getHealthStatus).toHaveBeenCalledTimes(1);
      expect(statusSpy).toHaveBeenCalledWith(500);
      expect(jsonSpy).toHaveBeenCalledWith({
        status: 'ERROR',
        timestamp: expect.any(String),
        service: 'Express Template API',
        error: 'Service unavailable',
      });
    });

    it('should handle non-Error objects', async () => {
      // Arrange
      mockHealthService.getHealthStatus.mockRejectedValue('Unknown error');

      // Act
      await getHealth(req as Request, res as Response);

      // Assert
      expect(statusSpy).toHaveBeenCalledWith(500);
      expect(jsonSpy).toHaveBeenCalledWith({
        status: 'ERROR',
        timestamp: expect.any(String),
        service: 'Express Template API',
        error: 'Internal server error',
      });
    });
  });

  describe('getHealthSimple', () => {
    it('should return 200 status with simple health data', () => {
      // Arrange
      const simpleHealthData = {
        status: 'OK',
        message: 'Service is healthy',
      };
      mockHealthService.getSimpleHealthStatus.mockReturnValue(simpleHealthData);

      // Act
      getHealthSimple(req as Request, res as Response);

      // Assert
      expect(mockHealthService.getSimpleHealthStatus).toHaveBeenCalledTimes(1);
      expect(statusSpy).toHaveBeenCalledWith(200);
      expect(jsonSpy).toHaveBeenCalledWith(simpleHealthData);
    });

    it('should handle errors in simple health check', () => {
      // Arrange
      const error = new Error('Service error');
      mockHealthService.getSimpleHealthStatus.mockImplementation(() => {
        throw error;
      });

      // Act
      getHealthSimple(req as Request, res as Response);

      // Assert
      expect(statusSpy).toHaveBeenCalledWith(500);
      expect(jsonSpy).toHaveBeenCalledWith({
        status: 'ERROR',
        message: 'Service unavailable',
        error: 'Service error',
      });
    });

    it('should handle non-Error objects in simple health check', () => {
      // Arrange
      mockHealthService.getSimpleHealthStatus.mockImplementation(() => {
        throw 'Unknown error';
      });

      // Act
      getHealthSimple(req as Request, res as Response);

      // Assert
      expect(statusSpy).toHaveBeenCalledWith(500);
      expect(jsonSpy).toHaveBeenCalledWith({
        status: 'ERROR',
        message: 'Service unavailable',
        error: 'Internal server error',
      });
    });
  });
});
