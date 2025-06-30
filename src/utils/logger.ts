/**
 * Enhanced logging utility for better visibility and debugging
 */

type LogLevel = 'info' | 'warn' | 'error' | 'debug' | 'success';

interface LogContext {
  timestamp?: string;
  userId?: string;
  sessionId?: string;
  component?: string;
  action?: string;
  url?: string;
  userAgent?: string;
  [key: string]: any;
}

const LOG_STYLES = {
  info: 'color: #3b82f6; font-weight: bold;',
  warn: 'color: #f59e0b; font-weight: bold;',
  error: 'color: #ef4444; font-weight: bold;',
  debug: 'color: #6b7280; font-weight: bold;',
  success: 'color: #10b981; font-weight: bold;'
};

const LOG_ICONS = {
  info: 'ℹ️',
  warn: '⚠️',
  error: '❌',
  debug: '🔍',
  success: '✅'
};

class Logger {
  private isDevelopment = process.env.NODE_ENV === 'development';
  private enabledLevels: Set<LogLevel> = new Set(['info', 'warn', 'error', 'success']);

  constructor() {
    if (this.isDevelopment) {
      this.enabledLevels.add('debug');
    }
  }

  private getBaseContext(): LogContext {
    return {
      timestamp: new Date().toISOString(),
      url: typeof window !== 'undefined' ? window.location.href : undefined,
      userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : undefined
    };
  }

  private formatMessage(level: LogLevel, message: string, context?: LogContext): void {
    if (!this.enabledLevels.has(level)) return;

    const icon = LOG_ICONS[level];
    const style = LOG_STYLES[level];
    const fullContext = { ...this.getBaseContext(), ...context };

    if (level === 'error') {
      console.group(`%c${icon} ${message}`, style);
      if (Object.keys(fullContext).length > 0) {
        console.error('📋 Context:', fullContext);
      }
      console.groupEnd();
    } else {
      console.log(`%c${icon} ${message}`, style);
      if (Object.keys(fullContext).length > 0) {
        console.log('📋 Context:', fullContext);
      }
    }
  }

  info(message: string, context?: LogContext): void {
    this.formatMessage('info', message, context);
  }

  warn(message: string, context?: LogContext): void {
    this.formatMessage('warn', message, context);
  }

  error(message: string, error?: Error | any, context?: LogContext): void {
    const errorContext = {
      ...context,
      error: error instanceof Error ? {
        name: error.name,
        message: error.message,
        stack: error.stack
      } : error
    };
    this.formatMessage('error', message, errorContext);
  }

  debug(message: string, context?: LogContext): void {
    this.formatMessage('debug', message, context);
  }

  success(message: string, context?: LogContext): void {
    this.formatMessage('success', message, context);
  }

  // Specific logging methods for common scenarios
  apiCall(method: string, endpoint: string, context?: LogContext): void {
    this.info(`API ${method.toUpperCase()} ${endpoint}`, {
      ...context,
      component: 'API',
      action: 'request'
    });
  }

  apiError(method: string, endpoint: string, error: any, context?: LogContext): void {
    this.error(`API ${method.toUpperCase()} ${endpoint} failed`, error, {
      ...context,
      component: 'API',
      action: 'error'
    });
  }

  userAction(action: string, context?: LogContext): void {
    this.info(`User action: ${action}`, {
      ...context,
      component: 'User',
      action: action
    });
  }

  chatEvent(event: string, context?: LogContext): void {
    this.info(`Chat event: ${event}`, {
      ...context,
      component: 'Chat',
      action: event
    });
  }

  authEvent(event: string, context?: LogContext): void {
    this.info(`Auth event: ${event}`, {
      ...context,
      component: 'Auth',
      action: event
    });
  }
}

export const logger = new Logger();
export default logger;