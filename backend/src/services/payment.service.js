"use strict";

const {
  findUserById,
  updateStudentPageBalance,
} = require("../repositories/user.repository");
const crypto = require("node:crypto");

const calculatePaymentAmount = ({ pageCount, config }) => {
  return (
    pageCount *
    config.printCount *
    (config.color ? 2 : 1) *
    (config.duplex ? 2 : 1) *
    (config.pageType === "A3" ? 2 : 1)
  );
};

const pay = async ({ paymentInfo }) => {
  const { userId, pageCount, config } = paymentInfo;
  console.log(paymentInfo);
  const user = await findUserById({ id: userId, role: "0000" });
  if (!user) {
    throw new Error(`User ${userId} not found`);
  }
  const paymentAmount = calculatePaymentAmount({ pageCount, config });
  if (user.pageBalance < paymentAmount) {
    throw new Error(`User ${userId} has insufficient pages`);
  }
  await updateStudentPageBalance({
    id: userId,
    pageBalance: user.pageBalance - paymentAmount,
  });
  console.log(`User ${userId} paid ${paymentAmount} pages`);
  return paymentAmount;
};

const buyPages = async ({ userId, pageCount }) => {
  const user = await findUserById({ id: userId, role: "0000" });
  if (!user) {
    throw new Error(`User ${userId} not found`);
  }
  console.log(`User ${userId} is paying through BKPay`);
  await updateStudentPageBalance({
    id: userId,
    pageBalance: parseInt(user.pageBalance) + parseInt(pageCount),
  });
  console.log(`User ${userId} bought ${pageCount} pages`);
  return parseInt(user.pageBalance) + parseInt(pageCount);
};

const payment = async ({ amount }) => {
  var accessKey = process.env.ACCESS_KEY || "hcmut";
  var secretKey = process.env.SECRET_KEY || "hcmut";
  var orderInfo = "pay with MoMo";
  var partnerCode = "MOMO";
  var redirectUrl = process.env.FRONTEND_URL || "http://localhost:3000";
  var ipnUrl =
    "https://dd52-27-3-128-92.ngrok-free.app/v1/api/payment/callback";
  var requestType = "payWithMethod";
  var amount = amount;
  var orderId = partnerCode + new Date().getTime();
  var requestId = orderId;
  var extraData = "";
  var orderGroupId = "";
  var autoCapture = true;
  var lang = "vi";

  var rawSignature =
    "accessKey=" +
    accessKey +
    "&amount=" +
    amount +
    "&extraData=" +
    extraData +
    "&ipnUrl=" +
    ipnUrl +
    "&orderId=" +
    orderId +
    "&orderInfo=" +
    orderInfo +
    "&partnerCode=" +
    partnerCode +
    "&redirectUrl=" +
    redirectUrl +
    "&requestId=" +
    requestId +
    "&requestType=" +
    requestType;
  var signature = crypto
    .createHmac("sha256", secretKey)
    .update(rawSignature)
    .digest("hex");

  const requestBody = JSON.stringify({
    partnerCode: partnerCode,
    partnerName: "Test",
    storeId: "MomoTestStore",
    requestId: requestId,
    amount: amount,
    orderId: orderId,
    orderInfo: orderInfo,
    redirectUrl: redirectUrl,
    ipnUrl: ipnUrl,
    lang: lang,
    requestType: requestType,
    autoCapture: autoCapture,
    extraData: extraData,
    orderGroupId: orderGroupId,
    signature: signature,
  });

  try {
    const result = await fetch(
      "https://test-payment.momo.vn/v2/gateway/api/create",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: requestBody,
      }
    );

    const response = { status: 200, message: await result.json() };
    return response;
  } catch (error) {
    console.error(error);
    return {
      status: 500,
      message: error,
    };
  }
};

const callback = async (requestBody) => {
  console.log("-----call back test-----");
  console.log("callback::: ", requestBody);

  return { status: 200, message: requestBody };
};

const transactionStatus = async (requestBody) => {
  const { orderId } = requestBody;
  const rawSignature = `accessKey=${process.env.ACCESS_KEY}&orderId=${orderId}&partnerCode=MOMO&requestId=${orderId}`;
  const signature = crypto
    .createHmac("sha256", process.env.SECRET_KEY)
    .update(rawSignature)
    .digest("hex");

  const request = JSON.stringify({
    partnerCode: "MOMO",
    requestId: orderId,
    orderId,
    signature,
    lang: "vi",
  });

  const result = await fetch(
    "https://test-payment.momo.vn/v2/gateway/api/query",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: request,
    }
  );

  return { status: 200, message: await result.json() };
};

module.exports = {
  pay,
  buyPages,
  calculatePaymentAmount,
  payment,
  callback,
  transactionStatus,
};
