"use strict";

const { authentication } = require("../auth/authUtils");
const documentCtrl = require("../controllers/document.controller");
const express = require("express");
const router = express.Router();

router.use(authentication);

// available to users and spso
/**
 * @swagger
 * '/v1/api/document':
 *  get:
 *     summary: Find all documents
 *     tags:
 *     - Document Controller
 *     security:
 *       - BearerAuth: []
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
 *                  pageCount:
 *                    type: integer
 *                  fileName:
 *                    type: string
 *      400:
 *        description: Bad Request
 *      404:
 *        description: Not Found
 *      500:
 *        description: Server Error
 */
router.get("/", documentCtrl.findAllDocuments);

/**
 * @swagger
 * '/v1/api/document':
 *  post:
 *     summary: Save document
 *     tags:
 *     - Document Controller
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            required:
 *              - pageCount
 *              - fileName
 *            properties:
 *              pageCount:
 *                type: integer
 *              fileName:
 *                type: string
 *     responses:
 *      201:
 *        description: Save document successfully
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                status:
 *                  type: integer
 *                  example: 201
 *                message:
 *                  type: string
 *      400:
 *        description: Bad Request
 *      404:
 *        description: Not Found
 *      500:
 *        description: Server Error
 */
router.post("/", documentCtrl.saveDocument);

/**
 * @swagger
 * '/v1/api/document/{id}':
 *   get:
 *     summary: Find document by id
 *     tags:
 *       - Document Controller
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         description: The ID of document
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Get successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 pageCount:
 *                   type: integer
 *                 fileName:
 *                   type: string
 *       400:
 *         description: Bad Request
 *       404:
 *         description: Not Found
 *       500:
 *         description: Server Error
 */
router.get("/:id", documentCtrl.findDocumentById);

/**
 * @swagger
 * '/v1/api/document/{id}':
 *   delete:
 *     summary: Delete document by id
 *     tags:
 *       - Document Controller
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         description: The ID of document
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Delete successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 200
 *                 message:
 *                   type: string
 *       400:
 *         description: Bad Request
 *       404:
 *         description: Not Found
 *       500:
 *         description: Server Error
 */
router.delete("/:id", documentCtrl.deleteDocument);

module.exports = router;
