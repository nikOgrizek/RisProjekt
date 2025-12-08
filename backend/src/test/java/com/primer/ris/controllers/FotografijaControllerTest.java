package com.primer.ris.controllers;

import com.primer.ris.dao.FotografijaRepository;
import com.primer.ris.models.Fotografija;
import com.primer.ris.models.Potovanje;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import java.util.Optional;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(controllers = FotografijaController.class)
public class FotografijaControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private FotografijaRepository fotografijaRepository;

    @Test
    public void pridobiSliko_WhenFound_ReturnsImageBytes() throws Exception {
        Fotografija f = new Fotografija();
        f.setId(33L);
        f.setNaslov("Naslov");
        f.setOpis("Opis");
        f.setSlika(new byte[]{1,2,3,4});

        when(fotografijaRepository.findById(33L)).thenReturn(Optional.of(f));

        mockMvc.perform(get("/fotografija/pridobiSliko/33"))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.IMAGE_JPEG))
                .andExpect(content().bytes(new byte[]{1,2,3,4}));
    }

    @Test
    public void izbrisiFotografijo_WhenExists_DeletesAndReturnsOk() throws Exception {
        Fotografija f = new Fotografija();
        f.setId(55L);

        when(fotografijaRepository.findById(55L)).thenReturn(Optional.of(f));

        mockMvc.perform(delete("/fotografija/izbrisiSliko/55"))
                .andExpect(status().isOk())
                .andExpect(content().string("Fotografija uspešno izbrisana."));

        verify(fotografijaRepository).delete(f);
    }
}
