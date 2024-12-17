"use strict";

const express = require("express");
const { asyncHandler } = require("../helpers/asyncHandler");
const { authentication } = require("../auth/authUtils");
const AccessController = require("../controllers/access.controller");
const router = express.Router();

/**
 * @swagger
 * '/v1/api/user/login-student':
 *  post:
 *     tags:
 *     - User controller
 *     summary: Login for student
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            required:
 *              - email
 *              - password
 *            properties:
 *              email:
 *                type: string
 *                format: email
 *              password:
 *                type: string
 *                format: password
 *     responses:
 *      200:
 *        description: Login successfully
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                status:
 *                  type: integer
 *                  example: 200
 *                message:
 *                  type: string
 *                  description: message response
 *                access-token:
 *                  type: string
 *                  description: A token used for accessing protected routes
 *                id:
 *                  type: string
 *                  description: The ID of student
 *                name:
 *                  type: string
 *                  description: The name of student
 *      400:
 *        description: Bad Request (Invalid email or password)
 *      404:
 *        description: Not Found
 *      409:
 *        description: Conflict (User is already logged in)
 *      500:
 *        description: Server error
 */
router.post("/login-student", asyncHandler(AccessController.loginStudent));

// login for SPSO
/**
 * @swagger
 * '/v1/api/user/login-spso':
 *  post:
 *     tags:
 *     - User controller
 *     summary: Login for SPSO
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            required:
 *              - email
 *              - password
 *            properties:
 *              email:
 *                type: string
 *                format: email
 *              password:
 *                type: string
 *                format: password
 *     responses:
 *      200:
 *        description: Login successfully
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                status:
 *                  type: integer
 *                  example: 200
 *                message:
 *                  type: string
 *                  description: Return message
 *                access-token:
 *                  type: string
 *                  description: A token used for accessing protected routes
 *                id:
 *                  type: string
 *                  description: The ID of SPSO
 *                x-api-key:
 *                  type: string
 *                  description: Api key for SPSO
 *                name:
 *                  type: string
 *                  description: The name of SPSO
 *      400:
 *        description: Bad Request (Invalid email or password)
 *      404:
 *        description: Not Found
 *      409:
 *        description: Conflict (User is already logged in)
 *      500:
 *        description: Server error
 */
router.post("/login-spso", asyncHandler(AccessController.loginSPSO));

// authentication
router.use(authentication);

// password confirm
/**
 * @swagger
 * '/v1/api/user/confirm-password':
 *  post:
 *     tags:
 *     - User controller
 *     summary: Confirm password for student
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            required:
 *              - password
 *            properties:
 *              password:
 *                type: string
 *                format: password
 *     responses:
 *      200:
 *        description: Verify Password Successfully
 *      400:
 *        description: Bad Request (Invalid or missing token)
 *      401:
 *        description: Unauthorized (Token is invalid or expired)
 *      500:
 *        description: Server error
 */
router.post(
  "/confirm-password",
  asyncHandler(AccessController.confirmPassword)
);

// logout for student
/**
 * @swagger
 * components:
 *   securitySchemes:
 *     BearerAuth:
 *       type: apiKey
 *       in: header
 *       name: authorization
 *       description: "Bearer token for authorization"
 *     ApiKeyAuth:
 *       type: apiKey
 *       in: header
 *       name: x-api-key
 *       description: "API key for access"
 * '/v1/api/user/logout-student':
 *  post:
 *     tags:
 *     - User controller
 *     summary: Logout for student
 *     security:
 *       - BearerAuth: []
 *     responses:
 *      200:
 *        description: Logout successfully
 *      400:
 *        description: Bad Request (Invalid or missing token)
 *      401:
 *        description: Unauthorized (Token is invalid or expired)
 *      500:
 *        description: Server error
 */
router.post("/logout-student", asyncHandler(AccessController.logoutStudent));

// logout for SPSO
/**
 * @swagger
 * '/v1/api/user/logout-spso':
 *  post:
 *     tags:
 *     - User controller
 *     summary: Logout for SPSO
 *     security:
 *       - BearerAuth: []
 *     responses:
 *      200:
 *        description: Logout successfully
 *      400:
 *        description: Bad Request (Invalid or missing token)
 *      401:
 *        description: Unauthorized (Token is invalid or expired)
 *      500:
 *        description: Server error
 */
router.post("/logout-spso", asyncHandler(AccessController.logoutSPSO));

module.exports = router;
