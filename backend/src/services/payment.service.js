"use strict"

const pay = async ({ paymentInfo }) => {
    const { userId, pageCount, config } = paymentInfo;
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