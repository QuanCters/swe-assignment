"use strict"

const { findUserById } = require("../repositories/user.repository");

const pay = async ({ paymentInfo }) => {
    const { userId, pageCount, config } = paymentInfo;
    const user = findUserById(userId);
    if (!user) {
        throw new Error(`User ${userId} not found`);
    }
    if (!user.money) {
        throw new Error(`User ${userId} has no money`);
    }
    const paymentAmount = pageCount
        * config.printCount
        * (config.color === 'color' ? 2 : 1)
        * (config.duplex ? 1.5 : 1)
        * (config.pageType === 'A3' ? 1.5 : 1)
        * 200; // 200VN$ per page
    console.log(`User ${userId} paid ${paymentAmount}VN$`);
    return paymentAmount;
}

module.exports = {
    pay
}