package elouafi.abderrahmane.gestion_credit_bancaire.service;

import elouafi.abderrahmane.gestion_credit_bancaire.domain.Credit;
import elouafi.abderrahmane.gestion_credit_bancaire.domain.CreditProfessionnel;
import elouafi.abderrahmane.gestion_credit_bancaire.model.CreditProfessionnelDTO;
import elouafi.abderrahmane.gestion_credit_bancaire.repos.CreditProfessionnelRepository;
import elouafi.abderrahmane.gestion_credit_bancaire.repos.CreditRepository;
import elouafi.abderrahmane.gestion_credit_bancaire.util.NotFoundException;
import java.util.List;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;


@Service
public class CreditProfessionnelService {

    private final CreditProfessionnelRepository creditProfessionnelRepository;
    private final CreditRepository creditRepository;

    public CreditProfessionnelService(
            final CreditProfessionnelRepository creditProfessionnelRepository,
            final CreditRepository creditRepository) {
        this.creditProfessionnelRepository = creditProfessionnelRepository;
        this.creditRepository = creditRepository;
    }

    public List<CreditProfessionnelDTO> findAll() {
        final List<CreditProfessionnel> creditProfessionnels = creditProfessionnelRepository.findAll(Sort.by("id"));
        return creditProfessionnels.stream()
                .map(creditProfessionnel -> mapToDTO(creditProfessionnel, new CreditProfessionnelDTO()))
                .toList();
    }

    public CreditProfessionnelDTO get(final Integer id) {
        return creditProfessionnelRepository.findById(id)
                .map(creditProfessionnel -> mapToDTO(creditProfessionnel, new CreditProfessionnelDTO()))
                .orElseThrow(NotFoundException::new);
    }

    public Integer create(final CreditProfessionnelDTO creditProfessionnelDTO) {
        final CreditProfessionnel creditProfessionnel = new CreditProfessionnel();
        mapToEntity(creditProfessionnelDTO, creditProfessionnel);
        return creditProfessionnelRepository.save(creditProfessionnel).getId();
    }

    public void update(final Integer id, final CreditProfessionnelDTO creditProfessionnelDTO) {
        final CreditProfessionnel creditProfessionnel = creditProfessionnelRepository.findById(id)
                .orElseThrow(NotFoundException::new);
        mapToEntity(creditProfessionnelDTO, creditProfessionnel);
        creditProfessionnelRepository.save(creditProfessionnel);
    }

    public void delete(final Integer id) {
        creditProfessionnelRepository.deleteById(id);
    }

    private CreditProfessionnelDTO mapToDTO(final CreditProfessionnel creditProfessionnel,
            final CreditProfessionnelDTO creditProfessionnelDTO) {
        creditProfessionnelDTO.setId(creditProfessionnel.getId());
        creditProfessionnelDTO.setRaisonSociale(creditProfessionnel.getRaisonSociale());
        creditProfessionnelDTO.setMotif(creditProfessionnel.getMotif());
        creditProfessionnelDTO.setCredit(creditProfessionnel.getCredit() == null ? null : creditProfessionnel.getCredit().getId());
        return creditProfessionnelDTO;
    }

    private CreditProfessionnel mapToEntity(final CreditProfessionnelDTO creditProfessionnelDTO,
            final CreditProfessionnel creditProfessionnel) {
        creditProfessionnel.setRaisonSociale(creditProfessionnelDTO.getRaisonSociale());
        creditProfessionnel.setMotif(creditProfessionnelDTO.getMotif());
        final Credit credit = creditProfessionnelDTO.getCredit() == null ? null : creditRepository.findById(creditProfessionnelDTO.getCredit())
                .orElseThrow(() -> new NotFoundException("credit not found"));
        creditProfessionnel.setCredit(credit);
        return creditProfessionnel;
    }

}
