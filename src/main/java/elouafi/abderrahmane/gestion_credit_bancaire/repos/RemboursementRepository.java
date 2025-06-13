package elouafi.abderrahmane.gestion_credit_bancaire.repos;

import elouafi.abderrahmane.gestion_credit_bancaire.domain.Credit;
import elouafi.abderrahmane.gestion_credit_bancaire.domain.Remboursement;
import org.springframework.data.jpa.repository.JpaRepository;


public interface RemboursementRepository extends JpaRepository<Remboursement, Long> {

    Remboursement findFirstByCredit(Credit credit);

}
