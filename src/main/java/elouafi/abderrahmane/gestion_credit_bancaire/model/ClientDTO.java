package elouafi.abderrahmane.gestion_credit_bancaire.model;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;


@Getter
@Setter
public class ClientDTO {

    private Long id;

    @NotNull
    @Size(max = 100)
    private String nom;

    @NotNull
    @Size(max = 100)
    private String email;

}
