export interface AppError {
    type: string;
    message: string;
    statusCode: number;
  }
  
  export function notFoundError(entity: string): AppError {
    return {
      type: 'not_found',
      message: `${entity} not found`,
      statusCode: 404
    };
  }
  
  export function unauthorizedError(message = 'Unauthorized'): AppError {
    return {
      type: 'unauthorized',
      message,
      statusCode: 401
    };
  }
  
  export function conflictError(message: string): AppError {
    return {
      type: 'conflict',
      message,
      statusCode: 409
    };
  }
  
  export function badRequestError(message: string): AppError {
    return {
      type: 'bad_request',
      message,
      statusCode: 400
    };
  }
  
  export function unprocessableEntityError(message: string): AppError {
    return {
      type: 'unprocessable_entity',
      message,
      statusCode: 422
    };
  }