const multer = require("multer");
const pdfParse = require("pdf-parse");
const run = require("../genai");
exports.pdfParse = async (req, res, next) => {
  try {
    // console.log('Parsing PDF...');
    const pdfBuffer = req.file.buffer;
    const data = await pdfParse(pdfBuffer);
    // console.log("parsed")

    // console.log(data.text);
    // run(data.text)
    req.resumeData = { text: data.text };
    next();
  } catch (error) {
    console.error("Error parsing PDF:", error);
    res.status(500).send("Error parsing PDF");
  }
};
