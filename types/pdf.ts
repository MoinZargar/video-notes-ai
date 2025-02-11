interface GeneratePdfProps {
    content: string
    docName: string
}

export interface PdfStyle {
    fontSize?: number;
    bold?: boolean;
    italics?: boolean;
    color?: string;
    margin?: [number, number, number, number];
    font?: string;
    background?: string;
    lineHeight?: number;
};