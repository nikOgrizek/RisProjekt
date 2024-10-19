package com.primer.ris.models;

import com.itextpdf.text.*;
import jakarta.persistence.*;
import jakarta.persistence.Id;
import java.io.IOException;
import java.util.List;
import com.itextpdf.text.pdf.PdfPCell;
import com.itextpdf.text.pdf.PdfPTable;
import com.itextpdf.text.pdf.PdfWriter;
import jakarta.servlet.http.HttpServletResponse;
import org.apache.tomcat.util.http.fileupload.ByteArrayOutputStream;

public class PdfGenerator {

    public void generate(Potovanje potovanje, HttpServletResponse response)
            throws DocumentException, IOException {
        // Creating the Object of Document
        Document document = new Document(PageSize.A4);
        // Getting instance of PdfWriter
        PdfWriter.getInstance(document, response.getOutputStream());
        // Opening the created document to change it
        document.open();
        ByteArrayOutputStream pdfStream = new ByteArrayOutputStream();
        PdfWriter.getInstance(document, pdfStream);
        document.open();
        // Creating font for title
        Font fontTitle = FontFactory.getFont(FontFactory.TIMES_ROMAN);
        fontTitle.setSize(20);

        // Creating paragraph for title
        Paragraph paragraphTitle = new Paragraph("PDF POTOVANJA", fontTitle);
        // Aligning the paragraph in the document
        paragraphTitle.setAlignment(Paragraph.ALIGN_CENTER);
        // Adding the created paragraph in the document
        document.add(paragraphTitle);

        // Adding travel details
        document.add(new Paragraph("Travel ID: " + potovanje.getId()));
        document.add(new Paragraph("Ime: " + potovanje.getIme()));
        document.add(new Paragraph("Opis: " + potovanje.getOpis()));
        document.add(new Paragraph("Start Date: " + potovanje.getDatumZacetka()));
        document.add(new Paragraph("End Date: " + potovanje.getDatumKonca()));
        document.add(new Paragraph("število Poti: " + potovanje.getSteviloPoti()));
        document.add(new Paragraph("Država: " + potovanje.getDrzava()));

        // Creating a table of 4 columns for paths
        PdfPTable table = new PdfPTable(4);
        // Setting width of the table, its columns, and spacing
        table.setWidthPercentage(100f);
        table.setWidths(new int[] {3, 3, 3, 3});
        table.setSpacingBefore(10);

        // Create Table Cells for the table header
        PdfPCell cell = new PdfPCell();
        // Setting the background color and padding of the table cell
        cell.setBackgroundColor(new BaseColor(173, 216, 230)); // LightBlue color
        cell.setPadding(5);

        // Creating font for header
        Font fontHeader = FontFactory.getFont(FontFactory.TIMES_ROMAN);
        fontHeader.setColor(BaseColor.WHITE);

        // Adding headings in the created table cell or header
        cell.setPhrase(new Phrase("ID", fontHeader));
        table.addCell(cell);
        cell.setPhrase(new Phrase("Pot", fontHeader));
        table.addCell(cell);
        cell.setPhrase(new Phrase("Opis", fontHeader));
        table.addCell(cell);
        cell.setPhrase(new Phrase("Razdalja", fontHeader));
        table.addCell(cell);

        int totalDistance = 0; // Dodajte to za izračun skupne razdalje

        // Iterating the list of paths
        for (Pot pot : potovanje.getPoti()) {
            // Adding path id
            table.addCell(String.valueOf(pot.getId()));
            // Adding path name
            table.addCell(pot.getIme());
            // Adding path description
            table.addCell(pot.getOpis());
            // Adding path distance
            table.addCell(String.valueOf(pot.getRazdalja()));

            // Dodajanje razdalje k skupni razdalji
            totalDistance += pot.getRazdalja();
        }

        // Adding the created table to the document
        document.add(table);

        // Dodajanje skupne razdalje kot zadnji odstavek
        document.add(new Paragraph("Skupna razdalja: " + totalDistance + "km"));

        // Closing the document
        document.close();
    }
}