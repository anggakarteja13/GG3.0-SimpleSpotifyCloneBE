import { Response } from 'express'

export function responseSuccess(res: Response, data: any): Response {
    return res.status(200).json({
        status: 'Success',
        statusCode: 200,
        data
    });
}

export function responseError(res: Response, statusCode: number, error: any): Response {
    return res.status(statusCode).json({
        status: 'Error',
        statusCode,
        message: error.message || error
    });
}
