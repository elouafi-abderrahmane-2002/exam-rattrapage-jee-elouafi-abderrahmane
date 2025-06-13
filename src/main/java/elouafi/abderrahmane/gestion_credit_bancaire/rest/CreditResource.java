package elouafi.abderrahmane.gestion_credit_bancaire.rest;

import elouafi.abderrahmane.gestion_credit_bancaire.domain.Client;
import elouafi.abderrahmane.gestion_credit_bancaire.model.CreditDTO;
import elouafi.abderrahmane.gestion_credit_bancaire.repos.ClientRepository;
import elouafi.abderrahmane.gestion_credit_bancaire.service.CreditService;
import elouafi.abderrahmane.gestion_credit_bancaire.util.CustomCollectors;
import elouafi.abderrahmane.gestion_credit_bancaire.util.ReferencedException;
import elouafi.abderrahmane.gestion_credit_bancaire.util.ReferencedWarning;
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
@RequestMapping(value = "/api/credits", produces = MediaType.APPLICATION_JSON_VALUE)
public class CreditResource {

    private final CreditService creditService;
    private final ClientRepository clientRepository;

    public CreditResource(final CreditService creditService,
            final ClientRepository clientRepository) {
        this.creditService = creditService;
        this.clientRepository = clientRepository;
    }

    @GetMapping
    public ResponseEntity<List<CreditDTO>> getAllCredits() {
        return ResponseEntity.ok(creditService.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<CreditDTO> getCredit(@PathVariable(name = "id") final Long id) {
        return ResponseEntity.ok(creditService.get(id));
    }

    @PostMapping
    @ApiResponse(responseCode = "201")
    public ResponseEntity<Long> createCredit(@RequestBody @Valid final CreditDTO creditDTO) {
        final Long createdId = creditService.create(creditDTO);
        return new ResponseEntity<>(createdId, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Long> updateCredit(@PathVariable(name = "id") final Long id,
            @RequestBody @Valid final CreditDTO creditDTO) {
        creditService.update(id, creditDTO);
        return ResponseEntity.ok(id);
    }

    @DeleteMapping("/{id}")
    @ApiResponse(responseCode = "204")
    public ResponseEntity<Void> deleteCredit(@PathVariable(name = "id") final Long id) {
        final ReferencedWarning referencedWarning = creditService.getReferencedWarning(id);
        if (referencedWarning != null) {
            throw new ReferencedException(referencedWarning);
        }
        creditService.delete(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/clientValues")
    public ResponseEntity<Map<Long, String>> getClientValues() {
        return ResponseEntity.ok(clientRepository.findAll(Sort.by("id"))
                .stream()
                .collect(CustomCollectors.toSortedMap(Client::getId, Client::getNom)));
    }

}
