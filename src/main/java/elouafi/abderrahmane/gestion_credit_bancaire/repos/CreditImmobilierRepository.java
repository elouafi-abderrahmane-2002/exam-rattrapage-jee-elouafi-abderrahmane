package elouafi.abderrahmane.gestion_credit_bancaire.repos;

import elouafi.abderrahmane.gestion_credit_bancaire.domain.Credit;
import elouafi.abderrahmane.gestion_credit_bancaire.domain.CreditImmobilier;
import org.springframework.data.jpa.repository.JpaRepository;


public interface CreditImmobilierRepository extends JpaRepository<CreditImmobilier, Integer> {

    CreditImmobilier findFirstByCredit(Credit credit);

}
