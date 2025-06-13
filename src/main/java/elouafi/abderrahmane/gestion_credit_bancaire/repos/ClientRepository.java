package elouafi.abderrahmane.gestion_credit_bancaire.repos;

import elouafi.abderrahmane.gestion_credit_bancaire.domain.Client;
import org.springframework.data.jpa.repository.JpaRepository;


public interface ClientRepository extends JpaRepository<Client, Long> {
}
