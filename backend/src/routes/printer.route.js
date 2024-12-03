"use strict";

const printerCtrl = require("../controllers/printer.controller");

const express = require("express");
const router = express.Router();
const { authentication } = require("../auth/authUtils");
const { apiKey, permission } = require("../auth/checkAuth");

router.use(authentication);

// available to users and spso
/**
 * @swagger
 * '/v1/api/printer':
 *   get:
 *     summary: Get all printers
 *     tags:
 *       - Printer Controller
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Fetched Successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                   name:
 *                     type: string
 *                   location:
 *                     type: string
 *                   status:
 *                     type: string
 *                   condition:
 *                     type: string
 *       400:
 *         description: Bad Request
 *       404:
 *         description: Not Found
 *       500:
 *         description: Server Error
 */
router.get("/", printerCtrl.findAllPrinters);

/**
 * @swagger
 * '/v1/api/printer/{id}':
 *   get:
 *     tags:
 *       - Printer Controller
 *     summary: Get printer by id
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         description: The ID of the printer
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Get Successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 name:
 *                   type: string
 *                 location:
 *                   type: string
 *                 status:
 *                   type: string
 *                 condition:
 *                   type: string
 *       400:
 *         description: Bad Request - Invalid ID format or missing parameters
 *       404:
 *         description: Not Found - Printer with the specified ID does not exist
 *       500:
 *         description: Server Error - An error occurred on the server
 */
router.get("/:id", printerCtrl.findPrinterById);

router.use(apiKey);
router.use(permission("1111"));

// available to spso

/**
 * @swagger
 * '/v1/api/printer':
 *   post:
 *     tags:
 *       - Printer Controller
 *     summary: Save printer
 *     security:
 *       - BearerAuth: []
 *       - ApiKeyAuth: []
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            required:
 *              - name
 *              - location
 *              - status
 *              - condition
 *            properties:
 *              name:
 *                type: string
 *              location:
 *                type: string
 *              status:
 *                type: string
 *              condition:
 *                type: string
 *     responses:
 *       201:
 *         description: Saved Successfull
 *       409:
 *         description: Bad Request - Invalid ID format or missing parameters
 *       404:
 *         description: Not Found - Printer with the specified ID does not exist
 *       500:
 *         description: Server Error - An error occurred on the server
 */
router.post("/", printerCtrl.savePrinter);

/**
 * @swagger
 * '/v1/api/printer':
 *   put:
 *     tags:
 *       - Printer Controller
 *     summary: Update printer
 *     security:
 *       - BearerAuth: []
 *       - ApiKeyAuth: []
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            required:
 *              - id
 *              - name
 *              - location
 *              - status
 *              - condition
 *            properties:
 *              id:
 *                type: string
 *              name:
 *                type: string
 *              location:
 *                type: string
 *              status:
 *                type: string
 *              condition:
 *                type: string
 *     responses:
 *       200:
 *         description: Updated Successfull
 *       409:
 *         description: Bad Request - Invalid ID format or missing parameters
 *       404:
 *         description: Not Found - Printer with the specified ID does not exist
 *       500:
 *         description: Server Error - An error occurred on the server
 */
router.put("/", printerCtrl.updatePrinter);

/**
 * @swagger
 * '/v1/api/printer/{id}':
 *   delete:
 *     tags:
 *       - Printer Controller
 *     summary: Delete printer
 *     security:
 *       - BearerAuth: []
 *       - ApiKeyAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         description: The ID of the printer
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Deleted Successfull
 *       409:
 *         description: Bad Request - Invalid ID format or missing parameters
 *       404:
 *         description: Not Found - Printer with the specified ID does not exist
 *       500:
 *         description: Server Error - An error occurred on the server
 */
router.delete("/:id", printerCtrl.deletePrinter);

module.exports = router;
