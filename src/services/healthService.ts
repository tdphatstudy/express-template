import { sequelize } from '@/config/database';

export interface HealthData {
  status: string;
  timestamp: string;
  service: string;
  version: string;
  database: {
    status: string;
    type?: string;
    error?: string;
  };
  uptime?: number;
  memory?: {
    used: number;
    total: number;
    unit: string;
  };
}

export class HealthService {
  private readonly serviceName = 'Express Template API';
  private readonly version = '1.0.0';

  async getHealthStatus(): Promise<HealthData> {
    try {
      await sequelize.authenticate();

      return {
        status: 'OK',
        timestamp: new Date().toISOString(),
        service: this.serviceName,
        version: this.version,
        database: {
          status: 'Connected',
          type: 'PostgreSQL',
        },
        uptime: process.uptime(),
        memory: {
          used: Math.round(process.memoryUsage().heapUsed / 1024 / 1024),
          total: Math.round(process.memoryUsage().heapTotal / 1024 / 1024),
          unit: 'MB',
        },
      };
    } catch (error) {
      return {
        status: 'ERROR',
        timestamp: new Date().toISOString(),
        service: this.serviceName,
        version: this.version,
        database: {
          status: 'Disconnected',
          error: error instanceof Error ? error.message : 'Unknown error',
        },
      };
    }
  }

  getSimpleHealthStatus(): { status: string; message: string } {
    return {
      status: 'OK',
      message: 'Service is healthy',
    };
  }
}

export const healthService = new HealthService();
