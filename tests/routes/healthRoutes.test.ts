import request from 'supertest';
import app from '@/app';
import { sequelize } from '@/config/database';

// Mock database connection
jest.mock('@/config/database', () => ({
  sequelize: {
    authenticate: jest.fn(),
  },
}));

describe('Health Routes Integration Tests', () => {
  const mockSequelize = sequelize as jest.Mocked<typeof sequelize>;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('GET /api/health', () => {
    it('should return health status with 200 when database is connected', async () => {
      // Arrange
      mockSequelize.authenticate.mockResolvedValue();

      // Act
      const response = await request(app)
        .get('/api/health')
        .expect(200);

      // Assert
      expect(response.body).toMatchObject({
        status: 'OK',
        service: 'Express Template API',
        version: '1.0.0',
        database: {
          status: 'Connected',
          type: 'PostgreSQL'
        }
      });
      expect(response.body.timestamp).toBeDefined();
      expect(response.body.uptime).toBeDefined();
      expect(response.body.memory).toMatchObject({
        used: expect.any(Number),
        total: expect.any(Number),
        unit: 'MB'
      });
    });

    it('should return error status with 503 when database connection fails', async () => {
      // Arrange
      const dbError = new Error('Connection refused');
      mockSequelize.authenticate.mockRejectedValue(dbError);

      // Act
      const response = await request(app)
        .get('/api/health')
        .expect(503);

      // Assert
      expect(response.body).toMatchObject({
        status: 'ERROR',
        service: 'Express Template API',
        version: '1.0.0',
        database: {
          status: 'Disconnected',
          error: 'Connection refused'
        }
      });
      expect(response.body.timestamp).toBeDefined();
    });

    it('should have correct content type', async () => {
      // Arrange
      mockSequelize.authenticate.mockResolvedValue();

      // Act & Assert
      await request(app)
        .get('/api/health')
        .expect('Content-Type', /json/)
        .expect(200);
    });
  });

  describe('GET /api/health/simple', () => {
    it('should return simple health status with 200', async () => {
      // Act
      const response = await request(app)
        .get('/api/health/simple')
        .expect(200);

      // Assert
      expect(response.body).toEqual({
        status: 'OK',
        message: 'Service is healthy'
      });
    });

    it('should have correct content type', async () => {
      // Act & Assert
      await request(app)
        .get('/api/health/simple')
        .expect('Content-Type', /json/)
        .expect(200);
    });

    it('should not depend on database connection', async () => {
      // Arrange
      mockSequelize.authenticate.mockRejectedValue(new Error('DB Error'));

      // Act & Assert
      await request(app)
        .get('/api/health/simple')
        .expect(200);
    });
  });

  describe('Error handling', () => {
    it('should return 404 for non-existent health endpoints', async () => {
      // Act & Assert
      await request(app)
        .get('/api/health/nonexistent')
        .expect(404);
    });
  });
}); 