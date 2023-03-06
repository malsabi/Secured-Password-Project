
// Importing modules
const PDFDocument = require('pdfkit')
const fs = require('fs')

function makeID(length) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    return result;
}


async function pdfGenerator(){
    // Create a document
    const doc = new PDFDocument();

    id = makeID(10)
    // Saving the pdf file in root directory.
    doc.pipe(fs.createWriteStream(`./pdf/${id}.pdf`));

    // Adding functionality
    doc
    .fontSize(27)
    .text('This the article for GeeksforGeeks', 100, 100);

    // Adding an image in the pdf.

    doc.image('pdf/logo.png', {
        fit: [300, 300],
        align: 'left',
        valign: 'top'
    });

    // Finalize PDF file
    doc.end();

    return id;
}

module.exports = {pdfGenerator};