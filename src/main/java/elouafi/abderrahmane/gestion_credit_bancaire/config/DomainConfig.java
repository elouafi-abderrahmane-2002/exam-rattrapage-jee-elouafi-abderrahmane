package elouafi.abderrahmane.gestion_credit_bancaire.config;

import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.transaction.annotation.EnableTransactionManagement;


@Configuration
@EntityScan("elouafi.abderrahmane.gestion_credit_bancaire.domain")
@EnableJpaRepositories("elouafi.abderrahmane.gestion_credit_bancaire.repos")
@EnableTransactionManagement
public class DomainConfig {
}
