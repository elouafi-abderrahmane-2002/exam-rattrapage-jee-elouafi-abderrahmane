package elouafi.abderrahmane.gestion_credit_bancaire.rest;

import elouafi.abderrahmane.gestion_credit_bancaire.domain.Credit;
import elouafi.abderrahmane.gestion_credit_bancaire.model.CreditProfessionnelDTO;
import elouafi.abderrahmane.gestion_credit_bancaire.repos.CreditRepository;
import elouafi.abderrahmane.gestion_credit_bancaire.service.CreditProfessionnelService;
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
@RequestMapping(value = "/api/creditProfessionnels", produces = MediaType.APPLICATION_JSON_VALUE)
public class CreditProfessionnelResource {

    private final CreditProfessionnelService creditProfessionnelService;
    private final CreditRepository creditRepository;

    public CreditProfessionnelResource(final CreditProfessionnelService creditProfessionnelService,
            final CreditRepository creditRepository) {
        this.creditProfessionnelService = creditProfessionnelService;
        this.creditRepository = creditRepository;
    }

    @GetMapping
    public ResponseEntity<List<CreditProfessionnelDTO>> getAllCreditProfessionnels() {
        return ResponseEntity.ok(creditProfessionnelService.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<CreditProfessionnelDTO> getCreditProfessionnel(
            @PathVariable(name = "id") final Integer id) {
        return ResponseEntity.ok(creditProfessionnelService.get(id));
    }

    @PostMapping
    @ApiResponse(responseCode = "201")
    public ResponseEntity<Integer> createCreditProfessionnel(
            @RequestBody @Valid final CreditProfessionnelDTO creditProfessionnelDTO) {
        final Integer createdId = creditProfessionnelService.create(creditProfessionnelDTO);
        return new ResponseEntity<>(createdId, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Integer> updateCreditProfessionnel(
            @PathVariable(name = "id") final Integer id,
            @RequestBody @Valid final CreditProfessionnelDTO creditProfessionnelDTO) {
        creditProfessionnelService.update(id, creditProfessionnelDTO);
        return ResponseEntity.ok(id);
    }

    @DeleteMapping("/{id}")
    @ApiResponse(responseCode = "204")
    public ResponseEntity<Void> deleteCreditProfessionnel(
            @PathVariable(name = "id") final Integer id) {
        creditProfessionnelService.delete(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/creditValues")
    public ResponseEntity<Map<Long, Long>> getCreditValues() {
        return ResponseEntity.ok(creditRepository.findAll(Sort.by("id"))
                .stream()
                .collect(CustomCollectors.toSortedMap(Credit::getId, Credit::getId)));
    }

}
