package elouafi.abderrahmane.gestion_credit_bancaire.rest;

import elouafi.abderrahmane.gestion_credit_bancaire.domain.Credit;
import elouafi.abderrahmane.gestion_credit_bancaire.model.CreditPersonnelDTO;
import elouafi.abderrahmane.gestion_credit_bancaire.repos.CreditRepository;
import elouafi.abderrahmane.gestion_credit_bancaire.service.CreditPersonnelService;
import elouafi.abderrahmane.gestion_credit_bancaire.util.CustomCollectors;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import jakarta.validation.Valid;
import java.util.List;
import java.util.Map;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequestMapping(value = "/api/creditPersonnels", produces = MediaType.APPLICATION_JSON_VALUE)
public class CreditPersonnelResource {

    private final CreditPersonnelService creditPersonnelService;
    private final CreditRepository creditRepository;

    public CreditPersonnelResource(final CreditPersonnelService creditPersonnelService,
            final CreditRepository creditRepository) {
        this.creditPersonnelService = creditPersonnelService;
        this.creditRepository = creditRepository;
    }

    @GetMapping
    public ResponseEntity<List<CreditPersonnelDTO>> getAllCreditPersonnels() {
        return ResponseEntity.ok(creditPersonnelService.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<CreditPersonnelDTO> getCreditPersonnel(
            @PathVariable(name = "id") final Integer id) {
        return ResponseEntity.ok(creditPersonnelService.get(id));
    }

    @PostMapping
    @ApiResponse(responseCode = "201")
    public ResponseEntity<Integer> createCreditPersonnel(
            @RequestBody @Valid final CreditPersonnelDTO creditPersonnelDTO) {
        final Integer createdId = creditPersonnelService.create(creditPersonnelDTO);
        return new ResponseEntity<>(createdId, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Integer> updateCreditPersonnel(
            @PathVariable(name = "id") final Integer id,
            @RequestBody @Valid final CreditPersonnelDTO creditPersonnelDTO) {
        creditPersonnelService.update(id, creditPersonnelDTO);
        return ResponseEntity.ok(id);
    }

    @DeleteMapping("/{id}")
    @ApiResponse(responseCode = "204")
    public ResponseEntity<Void> deleteCreditPersonnel(@PathVariable(name = "id") final Integer id) {
        creditPersonnelService.delete(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/creditValues")
    public ResponseEntity<Map<Long, Long>> getCreditValues() {
        return ResponseEntity.ok(creditRepository.findAll(Sort.by("id"))
                .stream()
                .collect(CustomCollectors.toSortedMap(Credit::getId, Credit::getId)));
    }

}
