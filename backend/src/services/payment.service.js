"use strict"

const { findUserById, updateStudentPageBalance } = require("../repositories/user.repository");

const pay = async ({ paymentInfo }) => {
    const { userId, pageCount, config } = paymentInfo;
    const user = await findUserById({ id: userId, role: "0000" });
    if (!user) {
        throw new Error(`User ${userId} not found`);
    }
    const paymentAmount = pageCount
        * config.printCount
        * (config.color === 'color' ? 2 : 1)
        * (config.duplex ? 2 : 1)
        * (config.pageType === 'A3' ? 2 : 1)
    if (user.pageBalance < paymentAmount) {
        throw new Error(`User ${userId} has insufficient pages`);
    }
    await updateStudentPageBalance({ id: userId, pageBalance: user.pageBalance - paymentAmount });
    console.log(`User ${userId} paid ${paymentAmount} pages`);
    return paymentAmount;
}

module.exports = {
    pay
}