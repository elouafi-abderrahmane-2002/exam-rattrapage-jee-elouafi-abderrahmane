package elouafi.abderrahmane.gestion_credit_bancaire.model;

import com.fasterxml.jackson.annotation.JsonFormat;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.Digits;
import jakarta.validation.constraints.NotNull;
import java.math.BigDecimal;
import java.time.LocalDate;
import lombok.Getter;
import lombok.Setter;


@Getter
@Setter
public class CreditDTO {

    private Long id;

    @NotNull
    private LocalDate dateDemande;

    private Statut statut;

    private LocalDate dateAcceptation;

    @NotNull
    @Digits(integer = 17, fraction = 2)
    @JsonFormat(shape = JsonFormat.Shape.STRING)
    @Schema(type = "string", example = "95.08")
    private BigDecimal montant;

    @NotNull
    private Integer dureeRemboursement;

    @NotNull
    @Digits(integer = 7, fraction = 2)
    @JsonFormat(shape = JsonFormat.Shape.STRING)
    @Schema(type = "string", example = "73.08")
    private BigDecimal tauxInteret;

    @NotNull
    private TypeCredit typeCredit;

    @NotNull
    private Long client;

}
