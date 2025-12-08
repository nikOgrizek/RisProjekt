package com.primer.ris.controllers;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.primer.ris.dao.UporabnikRepository;
import com.primer.ris.models.Uporabnik;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import java.util.HashMap;
import java.util.Map;

import static org.hamcrest.Matchers.is;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(controllers = UporabnikController.class)
public class UporabnikControllerTest {


    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private UporabnikRepository uporabnikRepository;

    @Autowired
    private ObjectMapper objectMapper;

    @Test
    public void registracija_ReturnsSuccessMessage() throws Exception {
        Uporabnik u = new Uporabnik();
        u.setId(11L);
        u.setUsername("testuser");
        u.setPassword("pass");
        u.setName("Test User");

        when(uporabnikRepository.save(any(Uporabnik.class))).thenReturn(u);

        mockMvc.perform(post("/uporabnik/registracija")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(u)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", is("Registracija uspešna!")));
    }

    @Test
    public void login_Success_ReturnsUserInfo() throws Exception {
        Uporabnik stored = new Uporabnik();
        stored.setId(99L);
        stored.setUsername("nick");
        stored.setPassword("pwd");
        stored.setName("Nick Name");

        Uporabnik request = new Uporabnik();
        request.setUsername("nick");
        request.setPassword("pwd");

        when(uporabnikRepository.findByUsernameAndPassword("nick", "pwd")).thenReturn(stored);

        mockMvc.perform(post("/uporabnik/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.message").value("Prijava uspešna."))
                .andExpect(jsonPath("$.user_id").value(String.valueOf(99L)))
                .andExpect(jsonPath("$.name").value("Nick Name"));
    }

    @Test
    public void login_Failure_ReturnsErrorMessage() throws Exception {
        Uporabnik request = new Uporabnik();
        request.setUsername("bad");
        request.setPassword("badpwd");

        when(uporabnikRepository.findByUsernameAndPassword("bad", "badpwd")).thenReturn(null);

        mockMvc.perform(post("/uporabnik/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.message").value("Napačen username ali geslo."));
    }
}
