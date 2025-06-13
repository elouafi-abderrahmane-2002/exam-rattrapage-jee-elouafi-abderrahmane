package elouafi.abderrahmane.gestion_credit_bancaire.model;

import lombok.Getter;
import lombok.Setter;


@Getter
@Setter
public class CreditImmobilierDTO {

    private Integer id;
    private TypeDuBien type;
    private Long credit;

}
