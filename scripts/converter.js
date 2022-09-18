const { PDFDocument, StandardFonts, rgb } = PDFLib
// import fontkit from '@pdf-lib/fontkit';
// import { saveAs } from "file-saver";

const package = ["silver", "gold", "diamond", "platinum"]

async function generatePDF(Qdata) {
  const url = "https://90sklick.netlify.app/public/"
  const existingPdfBytes = await fetch(url + "90sQT.pdf").then((res) =>
    res.arrayBuffer()
  );
  // Load a PDFDocument from the existing PDF bytes
  const pdfDoc = await PDFDocument.load(existingPdfBytes);
  pdfDoc.registerFontkit(fontkit);
  // Get the first page of the document
  const pages = pdfDoc.getPages();
  let pag = parseInt(Qdata.pk)
  let pls = [0, 1, 2, 3]
  for (let i = 0; i < 3; i++) {
    if (pag === 0) {
      pdfDoc.removePage(1)
    }
    else if (pag == 1) {
      if (i == 0) {
        pdfDoc.removePage(0)
      } else {
        pdfDoc.removePage(1)
      }
    }
    else if (pag == 2) {
      if (i <= 1) {
        pdfDoc.removePage(0)
      }
      else {
        pdfDoc.removePage(1)
      }
    }
    else if (pag == 3) {
      pdfDoc.removePage(0)
    }
  }
  const firstPage = pages[parseInt(Qdata.pk)];
  //get font
  const fontBytes = await fetch(url + "/beb.otf").then((res) => res.arrayBuffer());
  const tnrfonts = await fetch(url + "/tnr.ttf").then((res) => res.arrayBuffer());
  // Embed our custom font in the document
  const Font = await pdfDoc.embedFont(fontBytes);
  const TFont = await pdfDoc.embedFont(tnrfonts);

  const { width, height } = firstPage.getSize()
  console.log(width, height)
  // Draw a string of text diagonally across the first page
  xandy(firstPage, Qdata, Font, width, height, TFont);

  //firstPage.drawText("welcome", obj(185, 245, 12, Font));
  // Serialize the PDFDocument to bytes (a Uint8Array)
  const pdfBytes = await pdfDoc.save();
  console.log("Done creating");

  // this was for creating uri and showing in iframe
  // const pdfDataUri = await pdfDoc.saveAsBase64({ dataUri: true });
  // document.getElementById("pdf").src = pdfDataUri;
  download(pdfBytes, Qdata.username +"-"+ package[pag], "application/pdf");
  // var file = new Blob([pdfBytes], {
  //   type: "application/pdf;charset=utf-8",
  // });
  // saveAs(file, Qdata.username);
}
