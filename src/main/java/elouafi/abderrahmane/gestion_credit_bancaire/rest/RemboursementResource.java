package elouafi.abderrahmane.gestion_credit_bancaire.rest;

import elouafi.abderrahmane.gestion_credit_bancaire.domain.Credit;
import elouafi.abderrahmane.gestion_credit_bancaire.model.RemboursementDTO;
import elouafi.abderrahmane.gestion_credit_bancaire.repos.CreditRepository;
import elouafi.abderrahmane.gestion_credit_bancaire.service.RemboursementService;
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
@RequestMapping(value = "/api/remboursements", produces = MediaType.APPLICATION_JSON_VALUE)
public class RemboursementResource {

    private final RemboursementService remboursementService;
    private final CreditRepository creditRepository;

    public RemboursementResource(final RemboursementService remboursementService,
            final CreditRepository creditRepository) {
        this.remboursementService = remboursementService;
        this.creditRepository = creditRepository;
    }

    @GetMapping
    public ResponseEntity<List<RemboursementDTO>> getAllRemboursements() {
        return ResponseEntity.ok(remboursementService.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<RemboursementDTO> getRemboursement(
            @PathVariable(name = "id") final Long id) {
        return ResponseEntity.ok(remboursementService.get(id));
    }

    @PostMapping
    @ApiResponse(responseCode = "201")
    public ResponseEntity<Long> createRemboursement(
            @RequestBody @Valid final RemboursementDTO remboursementDTO) {
        final Long createdId = remboursementService.create(remboursementDTO);
        return new ResponseEntity<>(createdId, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Long> updateRemboursement(@PathVariable(name = "id") final Long id,
            @RequestBody @Valid final RemboursementDTO remboursementDTO) {
        remboursementService.update(id, remboursementDTO);
        return ResponseEntity.ok(id);
    }

    @DeleteMapping("/{id}")
    @ApiResponse(responseCode = "204")
    public ResponseEntity<Void> deleteRemboursement(@PathVariable(name = "id") final Long id) {
        remboursementService.delete(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/creditValues")
    public ResponseEntity<Map<Long, Long>> getCreditValues() {
        return ResponseEntity.ok(creditRepository.findAll(Sort.by("id"))
                .stream()
                .collect(CustomCollectors.toSortedMap(Credit::getId, Credit::getId)));
    }

}
