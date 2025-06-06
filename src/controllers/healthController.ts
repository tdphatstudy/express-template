import { Request, Response } from 'express';
import { sequelize } from '@/config/database';

export const getHealth = async (req: Request, res: Response) => {
  try {
    await sequelize.authenticate();
    
    const healthData = {
      status: 'OK',
      timestamp: new Date().toISOString(),
      service: 'Express Template API',
      version: '1.0.0',
      database: {
        status: 'Connected',
        type: 'PostgreSQL'
      },
      uptime: process.uptime(),
      memory: {
        used: Math.round(process.memoryUsage().heapUsed / 1024 / 1024),
        total: Math.round(process.memoryUsage().heapTotal / 1024 / 1024),
        unit: 'MB'
      }
    };

    res.status(200).json(healthData);
  } catch (error) {
    res.status(503).json({
      status: 'ERROR',
      timestamp: new Date().toISOString(),
      service: 'Express Template API',
      database: {
        status: 'Disconnected',
        error: error instanceof Error ? error.message : 'Unknown error'
      }
    });
  }
};

export const getHealthSimple = (req: Request, res: Response) => {
  res.status(200).json({ status: 'OK', message: 'Service is healthy' });
}; 