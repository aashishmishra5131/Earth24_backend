const paymentService = require("../services/payment.services.js");

const createPaymentLink = async (req, res) => {
  try {
    const paymentLink = await paymentService.createPaymentLink(req.params.id);
    return res.status(200).send(paymentLink);
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};

const updatePaymentInformation = async (req, res) => {
  try {
    await paymentService.updatePaymentInformation(req.query);
    return res.status(200).send({
      message: "payment information updated",
      status: true,
    });
    
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};

module.exports = {
  createPaymentLink,
  updatePaymentInformation,
};
