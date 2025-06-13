package elouafi.abderrahmane.gestion_credit_bancaire.repos;

import elouafi.abderrahmane.gestion_credit_bancaire.domain.Client;
import elouafi.abderrahmane.gestion_credit_bancaire.domain.Credit;
import org.springframework.data.jpa.repository.JpaRepository;


public interface CreditRepository extends JpaRepository<Credit, Long> {

    Credit findFirstByClient(Client client);

}
