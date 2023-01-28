import express from 'express';

const router = express.Router();
/**
 * @swagger
 *  components:
 *    schemas:
 *      STATUS:
 *        type: object
 *        properties:
 *          status:
 *            type: string
 *            description: status title
 *          message:
 *            type: string
 *            description: status message description
 *      RESPONSE_SUCCESS:
 *        type: object
 *        description: Success response schema for import file
 *        properties:
 *          status:
 *            type: string
 *            description: 'success | error'
 *          code:
 *            type: number
 *            description: 'status code of request: 200, 201, etc'
 *          data:
 *            type: object
 *            description: 'response content of request'
 *      RESPONSE_ERROR:
 *        type: object
 *        description: Failed response schema for import file
 *        allOf:
 *          - $ref: '#/components/schemas/RESPONSE_SUCCESS'
 *          - type: object
 *            properties:
 *              error:
 *                type: string
 *                description: Detailed message of the error
 */

/**
 * @swagger
 * '/api/v1/status':
 *   get:
 *     summary: get the status info of the app
 *     tags: [Status]
 *     description: 'This route will retreive the list of all product owners in application that were beeing used in cost parts. Here pagination, filtering and sorting is not implemented due to we need always all elements retreived. For more description refer to the following task: https://jsw.ibm.com/browse/BLP-2774'
 *     parameters:
 *       - in: query
 *         name: echo
 *         required: false
 *         description: "Just dust and echoes"
 *     responses:
 *       '200':
 *         description: 'Success'
 *         content:
 *           'application/json':
 *             schema:
 *               $ref: '#/components/schemas/STATUS'
 *             examples:
 *               'All roles':
 *                 summary: "All roles"
 *                 value:
 *                   status: success
 *                   code: 200
 *                   data:
 *                     - status: success
 *                       message: app running
 *       '401':
 *         description: 'User is not authenticated or token expired'
 *         content:
 *           'application/json':
 *             schema:
 *               $ref: '#/components/schemas/RESPONSE_ERROR'
 *             examples:
 *               'All roles':
 *                 summary: 'All roles'
 *                 value:
 *                   status: error
 *                   code: 401
 *                   data: null
 *                   error: 'User is not authenticated or token expired'
 *       '500':
 *         description: 'Server Error.'
 *         content:
 *           'application/json':
 *             schema:
 *               $ref: '#/components/schemas/RESPONSE_ERROR'
 *             examples:
 *               'All roles':
 *                 summary: 'All roles'
 *                 value:
 *                   status: error
 *                   code: 500
 *                   data: null
 *                   error: 'Something went wrong!... ${error}'
 */
