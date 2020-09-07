const { Router } = require("express");
const { Invoice, validateInvoice } = require("../models/invoice");
const { route } = require("./suppliers");
const { sendEmailToSupplier } = require("../util/sendEmail");

const router = Router();

router.post("/", async (req, res) => {
  const { error } = validateInvoice(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const { createdBy, supplierEmail, supplierName, orderedItems } = req.body;

  const invoice = new Invoice({
    createdBy,
    supplierEmail,
    supplierName,
    orderedItems,
  });

  // Creating a 8 digit unique reference no
  const reference = invoice._id.toString().substr(15);
  invoice.referenceNo = reference;

  try {
    await invoice.save();
    await sendEmailToSupplier(supplierEmail, orderedItems);
    return res.send(invoice);
  } catch (e) {
    return res.status(500).send("Internal Server");
  }
});

router.get("/", async (req, res) => {
  try {
    const invoices = await Invoice.find({});
    return res.send(invoices);
  } catch (e) {
    return res.status(500).send("Internal Server Errro");
  }
});

router.put("/:refNo", async (req, res) => {
  const { invoiceStatus } = req.body;
  if (!invoiceStatus) return res.status(400).send("Invalid Invoice Status");

  const referenceNo = req.params.refNo;
  const invoice = await Invoice.findOne({ referenceNo });
  console.log("Invoice", invoice);

  if (!invoice) return res.status(400).send("Invoice not found!");

  invoice.invoiceStatus = invoiceStatus;

  try {
    const resp = await invoice.save();
    return res.send(resp);
  } catch (e) {
    console.log("error message", e.message);
    return res.status(500).send("Internal ServerError");
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const invoice = await Invoice.findByIdAndRemove(req.params.id);
    if (!invoice) return res.status(400).send("Given Invoice Doesnt Exist");
    return res.send(invoice);
  } catch (e) {
    console.log("Error Deleting invoice");
    return res.status(500).send("Internal Server Error");
  }
});

//Route for reporting a issue

router.put("/report/:refNo", async (req, res) => {
  const { issueDescription } = req.body;

  if (!issueDescription)
    return res.status(400).send("Invalid issueDescription");

  const referenceNo = req.params.refNo;

  const invoice = await Invoice.findOne({ referenceNo });
  if (!invoice) return res.status(400).send("Given invoice doesnt exist");

  invoice.invoiceStatus = "issue";
  invoice.issueDescription = issueDescription;

  try {
    const resp = await invoice.save();
    return res.send(resp);
  } catch (e) {
    console.log("error message", e.message);
    return res.status(500).send("Internal ServerError");
  }
});

module.exports = router;
