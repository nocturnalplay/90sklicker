createPdf();
const { PDFDocument, StandardFonts, rgb } = PDFLib;
async function createPdf() {
  const existingPdfBytes = await fetch("http://localhost:9000/qt.pdf").then(
    (res) => res.arrayBuffer()
  );
  const pdfDoc = await PDFDocument.load(existingPdfBytes);
  pdfDoc.registerFontkit(StandardFonts.Helvetica);

  const fontBytes = await fetch(`http://localhost:9000/beb.otf`).then((res) =>
    res.arrayBuffer()
  );
  const Font = await pdfDoc.embedFont(fontBytes);
  const pages = pdfDoc.getPages();
  const firstPage = pages[0];

  firstPage.drawText("45000 /-", obj(770, 1021, 25, Font));
  firstPage.drawText("Jan 10 / Salem", obj(500, 983, 25, Font));

  const pdfBytes = await pdfDoc.save();
  console.log(pdfBytes);

  download(pdfBytes, "90's klicker.pdf", "application/pdf");
}

const obj = (x, y, s, f) => ({
  x: x,
  y: y,
  size: s,
  font: f,
  color: rgb(0.33, 0.03, 0.34), // (1/255*85) 255 to 0 to 1 conversion
});
