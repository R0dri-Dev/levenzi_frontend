import { HttpErrorResponse } from '@angular/common/http';

export function extractErrorMessage(error: unknown, fallback = 'Ocurrió un error inesperado.'): string {
    if (error instanceof HttpErrorResponse) {
        const body = error.error;

        if (body?.errors) {
            const firstField = Object.keys(body.errors)[0];
            const firstMessage = body.errors[firstField]?.[0];
            if (firstMessage) return firstMessage;
        }

        // Mensaje directo: { message: '...' }
        if (body?.message) return body.message;
    }

    return fallback;
}