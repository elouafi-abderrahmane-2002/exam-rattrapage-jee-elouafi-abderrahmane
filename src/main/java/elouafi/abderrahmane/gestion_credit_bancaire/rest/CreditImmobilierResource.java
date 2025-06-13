package elouafi.abderrahmane.gestion_credit_bancaire.rest;

import elouafi.abderrahmane.gestion_credit_bancaire.domain.Credit;
import elouafi.abderrahmane.gestion_credit_bancaire.model.CreditImmobilierDTO;
import elouafi.abderrahmane.gestion_credit_bancaire.repos.CreditRepository;
import elouafi.abderrahmane.gestion_credit_bancaire.service.CreditImmobilierService;
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
@RequestMapping(value = "/api/creditImmobiliers", produces = MediaType.APPLICATION_JSON_VALUE)
public class CreditImmobilierResource {

    private final CreditImmobilierService creditImmobilierService;
    private final CreditRepository creditRepository;

    public CreditImmobilierResource(final CreditImmobilierService creditImmobilierService,
            final CreditRepository creditRepository) {
        this.creditImmobilierService = creditImmobilierService;
        this.creditRepository = creditRepository;
    }

    @GetMapping
    public ResponseEntity<List<CreditImmobilierDTO>> getAllCreditImmobiliers() {
        return ResponseEntity.ok(creditImmobilierService.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<CreditImmobilierDTO> getCreditImmobilier(
            @PathVariable(name = "id") final Integer id) {
        return ResponseEntity.ok(creditImmobilierService.get(id));
    }

    @PostMapping
    @ApiResponse(responseCode = "201")
    public ResponseEntity<Integer> createCreditImmobilier(
            @RequestBody @Valid final CreditImmobilierDTO creditImmobilierDTO) {
        final Integer createdId = creditImmobilierService.create(creditImmobilierDTO);
        return new ResponseEntity<>(createdId, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Integer> updateCreditImmobilier(
            @PathVariable(name = "id") final Integer id,
            @RequestBody @Valid final CreditImmobilierDTO creditImmobilierDTO) {
        creditImmobilierService.update(id, creditImmobilierDTO);
        return ResponseEntity.ok(id);
    }

    @DeleteMapping("/{id}")
    @ApiResponse(responseCode = "204")
    public ResponseEntity<Void> deleteCreditImmobilier(
            @PathVariable(name = "id") final Integer id) {
        creditImmobilierService.delete(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/creditValues")
    public ResponseEntity<Map<Long, Long>> getCreditValues() {
        return ResponseEntity.ok(creditRepository.findAll(Sort.by("id"))
                .stream()
                .collect(CustomCollectors.toSortedMap(Credit::getId, Credit::getId)));
    }

}
