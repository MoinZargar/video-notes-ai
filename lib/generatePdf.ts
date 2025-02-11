import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { marked } from 'marked';
import htmlToPdfmake from 'html-to-pdfmake';
import { TDocumentDefinitions, Content } from 'pdfmake/interfaces';
import { pdfStyles } from './constants';

pdfMake.vfs = pdfFonts.vfs;

interface GeneratePdfProps {
  content: string
  docName: string
}

export const generatePdf = async ({ content, docName }: GeneratePdfProps) => {
  try {
    const htmlContent = await marked.parse(content);
    const pdfContent = htmlToPdfmake(htmlContent) as Content;

    const documentDefinition: TDocumentDefinitions = {
      content: pdfContent,
      styles: pdfStyles,
      defaultStyle: {
        font: 'Roboto',
        fontSize: 12,
        lineHeight: 1.5,
      },
    };

    const pdfDoc = pdfMake.createPdf(documentDefinition);
    pdfDoc.download(`${docName}.pdf`);
  } catch (error) {
    throw new Error('Error generating PDF');
  }
};