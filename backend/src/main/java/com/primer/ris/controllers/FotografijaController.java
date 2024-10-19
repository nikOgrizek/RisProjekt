package com.primer.ris.controllers;
import com.primer.ris.dao.FotografijaRepository;
import com.primer.ris.models.Fotografija;
import com.primer.ris.models.Potovanje;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Optional;

@RestController
@RequestMapping("/fotografija")
@CrossOrigin(origins = "http://localhost:3000/")
public class FotografijaController {
    @Autowired
    private FotografijaRepository fotografijaRepository;

    @PostMapping("/dodajFotografijo/{potovanjeId}")
    public ResponseEntity<String> dodajFotografijo(
            @PathVariable Long potovanjeId,
            @RequestParam("naslov") String naslov,
            @RequestParam("opis") String opis,
            @RequestParam("slika") MultipartFile file
    ) {
        try {
            Fotografija fotografija = new Fotografija();
            fotografija.setNaslov(naslov);
            fotografija.setOpis(opis);
            fotografija.setSlika(file.getBytes()); // Pretvori MultipartFile v byte array

            Potovanje potovanje = new Potovanje();
            potovanje.setId(potovanjeId);
            fotografija.setPotovanje(potovanje);

            fotografijaRepository.save(fotografija);
            return ResponseEntity.ok("Fotografija uspešno shranjena.");
        } catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Napaka pri shranjevanju fotografije.");
        }
    }

    @GetMapping("pridobiSliko/{id}")
    public ResponseEntity<byte[]> pridobiSliko(@PathVariable Long id) {
        Optional<Fotografija> fotografijaOptional = fotografijaRepository.findById(id);

        if (fotografijaOptional.isPresent()) {
            Fotografija fotografija = fotografijaOptional.get();

            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.IMAGE_JPEG); // Prilagodite glede na vrsto slike

            return new ResponseEntity<>(fotografija.getSlika(), headers, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/izbrisiSliko/{id}")
    public ResponseEntity<String> izbrisiFotografijo(@PathVariable Long id) {
        Optional<Fotografija> fotografijaOptional = fotografijaRepository.findById(id);

        if (fotografijaOptional.isPresent()) {
            Fotografija fotografija = fotografijaOptional.get();
            fotografijaRepository.delete(fotografija);
            return new ResponseEntity<>("Fotografija uspešno izbrisana.", HttpStatus.OK);
        } else {
            return new ResponseEntity<>("Fotografija s podanim ID-jem ni bila najdena.", HttpStatus.NOT_FOUND);
        }
    }

}
