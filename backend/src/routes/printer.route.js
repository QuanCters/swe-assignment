"use strict";

const printerCtrl = require("../controllers/printer.controller");

const express = require("express");
const router = express.Router();

const { apiKey, permission } = require("../auth/checkAuth");

// available to users and spso
/**
 * @swagger
 * '/v1/api/printers':
 *  get:
 *     summary: Get all printers
 *     tags:
 *     - Printer Controller
 *     responses:
 *      200:
 *        description: Fetched Successfully
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                id:
 *                  type: integer
 *                name:
 *                  type: string
 *                location:
 *                  type: string
 *                status:
 *                  type: string
 *                condition:
 *                  type: string
 *      400:
 *        description: Bad Request
 *      404:
 *        description: Not Found
 *      500:
 *        description: Server Error
 */
router.get("/", printerCtrl.findAllPrinters);

/**
 * @swagger
 * '/v1/api/printer/:id':
 *  get:
 *     tags:
 *     - Printer Controller
 *     summary: Get printer by id
 *     parameters:
 *      - id: id
 *        in: path
 *        description: The id of printer
 *     responses:
 *      200:
 *        description: Get Successfully
 *        content:
 *          application/json:
 *              schema:
 *                  type: object
 *                  properties:
 *                    id:
 *                      type: integer
 *                    name:
 *                      type: string
 *                    location:
 *                      type: string
 *                    status:
 *                      type: string
 *                    condition:
 *                      type: string
 *      400:
 *        description: Bad Request
 *      404:
 *        description: Not Found
 *      500:
 *        description: Server Error
 */
router.get("/:id", printerCtrl.findPrinterById);

router.use(apiKey);
router.use(permission("1111"));

// available to spso
router.post("/", printerCtrl.savePrinter);
router.put("/", printerCtrl.updatePrinter);
router.delete("/:id", printerCtrl.deletePrinter);

module.exports = router;
