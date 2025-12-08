package com.primer.ris.controllers;

import com.primer.ris.dao.PotovanjeRepository;
import com.primer.ris.models.Potovanje;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.web.servlet.MockMvc;

import java.util.Optional;

import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(controllers = PdfController.class)
public class PdfControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private PotovanjeRepository potovanjeRepository;

    @Test
    public void generatePdf_WhenPotovanjeNotFound_Returns200WithErrorMessage() throws Exception {
        when(potovanjeRepository.findById(999L)).thenReturn(Optional.empty());

        mockMvc.perform(get("/pdf/generatePdf/999"))
                .andExpect(status().isOk());
    }

    @Test
    public void generatePdf_WhenPotovanjeFound_Returns200() throws Exception {
        Potovanje potovanje = new Potovanje();
        potovanje.setId(1L);
        potovanje.setIme("Test Potovanje");
        potovanje.setOpis("Opis");

        when(potovanjeRepository.findById(1L)).thenReturn(Optional.of(potovanje));

        mockMvc.perform(get("/pdf/generatePdf/1"))
                .andExpect(status().isOk());
    }
}
