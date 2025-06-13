package elouafi.abderrahmane.gestion_credit_bancaire.domain;

import elouafi.abderrahmane.gestion_credit_bancaire.model.Statut;
import elouafi.abderrahmane.gestion_credit_bancaire.model.TypeCredit;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.Set;
import lombok.Getter;
import lombok.Setter;


@Entity
@Getter
@Setter
public class Credit {

    @Id
    @Column(nullable = false, updatable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private LocalDate dateDemande;

    @Column
    @Enumerated(EnumType.STRING)
    private Statut statut;

    @Column
    private LocalDate dateAcceptation;

    @Column(nullable = false, precision = 17, scale = 2)
    private BigDecimal montant;

    @Column(nullable = false)
    private Integer dureeRemboursement;

    @Column(nullable = false, precision = 7, scale = 2)
    private BigDecimal tauxInteret;

    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private TypeCredit typeCredit;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "client_id", nullable = false)
    private Client client;

    @OneToMany(mappedBy = "credit")
    private Set<CreditPersonnel> creditCreditPersonnels;

    @OneToMany(mappedBy = "credit")
    private Set<CreditProfessionnel> creditCreditProfessionnels;

    @OneToMany(mappedBy = "credit")
    private Set<Remboursement> creditRemboursements;

    @OneToMany(mappedBy = "credit")
    private Set<CreditImmobilier> creditCreditImmobiliers;

}
