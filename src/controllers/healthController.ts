import { Request, Response } from 'express';
import { healthService } from '@/services/healthService';

export const getHealth = async (req: Request, res: Response) => {
  try {
    const healthData = await healthService.getHealthStatus();
    
    if (healthData.status === 'OK') {
      res.status(200).json(healthData);
    } else {
      res.status(503).json(healthData);
    }
  } catch (error) {
    res.status(500).json({
      status: 'ERROR',
      timestamp: new Date().toISOString(),
      service: 'Express Template API',
      error: error instanceof Error ? error.message : 'Internal server error'
    });
  }
};

export const getHealthSimple = (req: Request, res: Response) => {
  try {
    const healthData = healthService.getSimpleHealthStatus();
    res.status(200).json(healthData);
  } catch (error) {
    res.status(500).json({
      status: 'ERROR',
      message: 'Service unavailable',
      error: error instanceof Error ? error.message : 'Internal server error'
    });
  }
}; 