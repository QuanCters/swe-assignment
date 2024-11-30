"use strict";

const { print, buyPages } = require("../controllers/student.controller");

const express = require("express");
const router = express.Router();
const { authentication } = require("../auth/authUtils");

router.use(authentication);

/**
 * @swagger
 * '/v1/api/student/{userId}/buyPages':
 *  patch:
 *     summary: Student buy more pages
 *     tags:
 *     - Student Controller
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - name: userId
 *         in: path
 *         description: The ID of student
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            required:
 *              - pageCount
 *            properties:
 *              pageCount:
 *               type: integer
 *     responses:
 *      200:
 *        description: Buy Successfully
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                status:
 *                  type: integer
 *                message:
 *                  type: string
 *                pageCount:
 *                  type: string
 *      400:
 *        description: Bad Request
 *      404:
 *        description: Not Found
 *      500:
 *        description: Server Error
 */
router.patch("/:userId/buyPages", buyPages);

/**
 * @swagger
 * '/v1/api/student/{userId}/print/{printerId}':
 *  post:
 *     summary: Student print pages
 *     tags:
 *     - Student Controller
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - name: userId
 *         in: path
 *         description: The ID of student
 *         required: true
 *         schema:
 *           type: string
 *       - name: printerId
 *         in: path
 *         description: The ID of printer
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            required:
 *              - documentId
 *              - config
 *            properties:
 *              documentId:
 *               type: string
 *              config:
 *               type: object
 *               description: Configuration settings for printing
 *               properties:
 *                 pageType:
 *                   type: string
 *                   description: The paper type to print
 *                   enum:
 *                     - A4
 *                     - Letter
 *                     - A3
 *                     - Legal
 *                 color:
 *                   type: string
 *                   description: The color mode for printing
 *                   enum:
 *                     - color
 *                     - none
 *                 duplex:
 *                   type: boolean
 *                   description: Whether to print on both sides of the paper
 *                 printCount:
 *                   type: integer
 *                   description: The number of copies to print
 *     responses:
 *      200:
 *        description: Buy Successfully
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                status:
 *                  type: integer
 *                message:
 *                  type: string
 *                pageCount:
 *                  type: string
 *      400:
 *        description: Bad Request
 *      404:
 *        description: Not Found
 *      500:
 *        description: Server Error
 */
router.post("/:userId/print/:printerId", print);

module.exports = router;
