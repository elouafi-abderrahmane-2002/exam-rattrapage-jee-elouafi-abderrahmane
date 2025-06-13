package elouafi.abderrahmane.gestion_credit_bancaire.repos;

import elouafi.abderrahmane.gestion_credit_bancaire.domain.Credit;
import elouafi.abderrahmane.gestion_credit_bancaire.domain.CreditPersonnel;
import org.springframework.data.jpa.repository.JpaRepository;


public interface CreditPersonnelRepository extends JpaRepository<CreditPersonnel, Integer> {

    CreditPersonnel findFirstByCredit(Credit credit);

}
