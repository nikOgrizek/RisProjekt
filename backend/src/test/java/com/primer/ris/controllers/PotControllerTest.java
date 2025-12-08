package com.primer.ris.controllers;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.primer.ris.dao.PotRepository;
import com.primer.ris.dao.PotovanjeRepository;
import com.primer.ris.models.Pot;
import com.primer.ris.models.Potovanje;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import java.util.Arrays;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(controllers = PotController.class)
public class PotControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private PotRepository potDao;

    @MockBean
    private PotovanjeRepository potovanjeRepository;

    @MockBean
    private EmailService emailService;

    @Autowired
    private ObjectMapper objectMapper;

    @Test
    public void hello_ReturnsHello() throws Exception {
        mockMvc.perform(get("/pot/hello"))
                .andExpect(status().isOk())
                .andExpect(content().string("Hello"));
    }

    @Test
    public void index_ReturnsWelcome() throws Exception {
        mockMvc.perform(get("/pot/"))
                .andExpect(status().isOk())
                .andExpect(content().string("Dobrodošli v aplikaciji Potovanje!"));
    }

    @Test
    public void vrniPoti_ReturnsFormattedList() throws Exception {
        Potovanje p = new Potovanje();
        p.setId(42L);

        Pot pot = new Pot();
        pot.setId(1L);
        pot.setIme("TestPot");
        pot.setOpis("Opis");
        pot.setRazdalja(12.5);
        pot.setPotovanje(p);

        when(potDao.findAll()).thenReturn(Arrays.asList(pot));

        mockMvc.perform(get("/pot/vrniPoti"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].id").value(1))
                .andExpect(jsonPath("$[0].ime").value("TestPot"))
                .andExpect(jsonPath("$[0].potovanje_id").value(42));
    }

    @Test
    public void dodajPot_SavesAndReturnsPot() throws Exception {
        Potovanje p = new Potovanje();
        p.setId(5L);

        Pot pot = new Pot();
        pot.setId(7L);
        pot.setIme("NovaPot");
        pot.setOpis("Opis nove poti");
        pot.setRazdalja(3.14);
        pot.setPotovanje(p);

        when(potDao.save(any(Pot.class))).thenReturn(pot);

        mockMvc.perform(post("/pot/dodajPot")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(pot)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("id").value(7))
                .andExpect(jsonPath("ime").value("NovaPot"));
    }

    @Test
    public void sendEmail_ReturnsSuccessMessage() throws Exception {
        // just ensure endpoint returns the success string; EmailService is mocked
        mockMvc.perform(get("/pot/sendEmail"))
                .andExpect(status().isOk())
                .andExpect(content().string("Email sent successfully!"));

        verify(emailService).sendEmail(any(), any(), any());
    }
}
