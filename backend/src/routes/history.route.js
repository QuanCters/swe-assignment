"use strict";

const { authentication } = require("../auth/authUtils");
const { apiKey, permission } = require("../auth/checkAuth");
const historyCtrl = require("../controllers/history.controller");
const router = require("express").Router();

router.use(authentication);

/**
 * @swagger
 * '/v1/api/history/student/{userId}':
 *  get:
 *     summary: Find histories by userId
 *     tags:
 *     - History Controller
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - name: userId
 *         in: path
 *         description: The ID of history
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *      200:
 *        description: Get successfully
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                type: object
 *                properties:
 *                  id:
 *                    type: string
 *                  studentId:
 *                    type: string
 *                  printerId:
 *                    type: string
 *                  printerName:
 *                    type: string
 *                  documentId:
 *                    type: string
 *                  documentName:
 *                    type: string
 *                  pageType:
 *                    type: string
 *                  paymentAmount:
 *                    type: integer
 *                    example: 1
 *                  timestamp:
 *                    type: string
 *      400:
 *        description: Bad Request
 *      404:
 *        description: Not Found
 *      500:
 *        description: Server Error
 */
router.get("/student/:userId", historyCtrl.findHistoryByUserId);

router.use(apiKey);
router.use(permission("1111"));

/**
 * @swagger
 * '/v1/api/history':
 *  get:
 *     summary: Find all histories
 *     tags:
 *       - History Controller
 *     security:
 *       - BearerAuth: []
 *       - ApiKeyAuth: []
 *     responses:
 *      200:
 *        description: Get successfully
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                type: object
 *                properties:
 *                  id:
 *                    type: string
 *                  studentId:
 *                    type: string
 *                  printerId:
 *                    type: string
 *                  printerName:
 *                    type: string
 *                  documentId:
 *                    type: string
 *                  documentName:
 *                    type: string
 *                  pageType:
 *                    type: string
 *                  paymentAmount:
 *                    type: integer
 *                    example: 1
 *                  timestamp:
 *                    type: string
 *      400:
 *        description: Bad Request
 *      404:
 *        description: Not Found
 *      500:
 *        description: Server Error
 */
router.get("/", historyCtrl.findAllHistories);

module.exports = router;
