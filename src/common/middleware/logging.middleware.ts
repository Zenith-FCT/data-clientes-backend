import { Injectable, NestMiddleware, Logger } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggingMiddleware implements NestMiddleware {
  private logger = new Logger('HTTP');
  use(request: Request, response: Response, next: NextFunction): void {
    const { ip, method, originalUrl } = request;
    const userAgent = request.get('user-agent') || '';
    const origin = request.get('origin') || '';
    const referer = request.get('referer') || '';
    const contentType = request.get('content-type') || '';
    const acceptHeader = request.get('accept') || '';

    // Log when request starts with more details for debugging CORS and API connectivity
    this.logger.log(`REQUEST [${method}] ${originalUrl} - IP: ${ip}, Origin: ${origin}, Referer: ${referer}`);
    this.logger.debug(`Headers: Content-Type: ${contentType}, Accept: ${acceptHeader}, User-Agent: ${userAgent.substring(0, 100)}${userAgent.length > 100 ? '...' : ''}`);

    // Log request body if it exists (for POST, PUT, PATCH)
    if (Object.keys(request.body || {}).length > 0) {
      this.logger.debug(`Request body: ${JSON.stringify(request.body)}`);
    }
    
    // Log query parameters if they exist (for GET)
    if (Object.keys(request.query || {}).length > 0) {
      this.logger.debug(`Query params: ${JSON.stringify(request.query)}`);
    }

    // Store original timestamp to calculate duration
    const startTime = Date.now();

    // Capture response logging after completion
    response.on('finish', () => {
      const { statusCode } = response;
      const contentLength = response.get('content-length') || 0;
      const duration = Date.now() - startTime;
      const responseContentType = response.get('content-type') || '';

      if (statusCode >= 400) {
        // Log errors with more detail
        this.logger.error(`RESPONSE [${method}] ${originalUrl} - ${statusCode} - ${contentLength} - ${duration}ms - Content-Type: ${responseContentType}`);
      } else {
        // Log successful responses
        this.logger.log(`RESPONSE [${method}] ${originalUrl} - ${statusCode} - ${contentLength} - ${duration}ms - Content-Type: ${responseContentType}`);
      }
    });

    next();
  }
}
