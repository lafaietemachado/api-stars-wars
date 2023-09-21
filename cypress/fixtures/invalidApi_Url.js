export const invalidRequest = {
    type: 'object',
    required: [
        'detail'
    ],
    properties: {
        detail: {
            type: 'string'
        }
    }
}