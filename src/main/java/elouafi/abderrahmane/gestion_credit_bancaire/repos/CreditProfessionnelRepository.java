package elouafi.abderrahmane.gestion_credit_bancaire.repos;

import elouafi.abderrahmane.gestion_credit_bancaire.domain.Credit;
import elouafi.abderrahmane.gestion_credit_bancaire.domain.CreditProfessionnel;
import org.springframework.data.jpa.repository.JpaRepository;


public interface CreditProfessionnelRepository extends JpaRepository<CreditProfessionnel, Integer> {

    CreditProfessionnel findFirstByCredit(Credit credit);

}
