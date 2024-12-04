"use strict";

const {
    findUserById,
    updateStudentPageBalance,
} = require("../repositories/user.repository");

const calculatePaymentAmount = ({ pageCount, config }) => {
    return pageCount *
        config.printCount *
        (config.color ? 2 : 1) *
        (config.duplex ? 2 : 1) *
        (config.pageType === "A3" ? 2 : 1);
}

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
    return pageCount;
};

module.exports = {
    pay,
    buyPages,
    calculatePaymentAmount,
};
