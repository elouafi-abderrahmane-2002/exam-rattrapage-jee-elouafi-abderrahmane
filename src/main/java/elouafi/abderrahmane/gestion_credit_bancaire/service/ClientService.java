package elouafi.abderrahmane.gestion_credit_bancaire.service;

import elouafi.abderrahmane.gestion_credit_bancaire.domain.Client;
import elouafi.abderrahmane.gestion_credit_bancaire.domain.Credit;
import elouafi.abderrahmane.gestion_credit_bancaire.model.ClientDTO;
import elouafi.abderrahmane.gestion_credit_bancaire.repos.ClientRepository;
import elouafi.abderrahmane.gestion_credit_bancaire.repos.CreditRepository;
import elouafi.abderrahmane.gestion_credit_bancaire.util.NotFoundException;
import elouafi.abderrahmane.gestion_credit_bancaire.util.ReferencedWarning;
import java.util.List;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;


@Service
public class ClientService {

    private final ClientRepository clientRepository;
    private final CreditRepository creditRepository;

    public ClientService(final ClientRepository clientRepository,
            final CreditRepository creditRepository) {
        this.clientRepository = clientRepository;
        this.creditRepository = creditRepository;
    }

    public List<ClientDTO> findAll() {
        final List<Client> clients = clientRepository.findAll(Sort.by("id"));
        return clients.stream()
                .map(client -> mapToDTO(client, new ClientDTO()))
                .toList();
    }

    public ClientDTO get(final Long id) {
        return clientRepository.findById(id)
                .map(client -> mapToDTO(client, new ClientDTO()))
                .orElseThrow(NotFoundException::new);
    }

    public Long create(final ClientDTO clientDTO) {
        final Client client = new Client();
        mapToEntity(clientDTO, client);
        return clientRepository.save(client).getId();
    }

    public void update(final Long id, final ClientDTO clientDTO) {
        final Client client = clientRepository.findById(id)
                .orElseThrow(NotFoundException::new);
        mapToEntity(clientDTO, client);
        clientRepository.save(client);
    }

    public void delete(final Long id) {
        clientRepository.deleteById(id);
    }

    private ClientDTO mapToDTO(final Client client, final ClientDTO clientDTO) {
        clientDTO.setId(client.getId());
        clientDTO.setNom(client.getNom());
        clientDTO.setEmail(client.getEmail());
        return clientDTO;
    }

    private Client mapToEntity(final ClientDTO clientDTO, final Client client) {
        client.setNom(clientDTO.getNom());
        client.setEmail(clientDTO.getEmail());
        return client;
    }

    public ReferencedWarning getReferencedWarning(final Long id) {
        final ReferencedWarning referencedWarning = new ReferencedWarning();
        final Client client = clientRepository.findById(id)
                .orElseThrow(NotFoundException::new);
        final Credit clientCredit = creditRepository.findFirstByClient(client);
        if (clientCredit != null) {
            referencedWarning.setKey("client.credit.client.referenced");
            referencedWarning.addParam(clientCredit.getId());
            return referencedWarning;
        }
        return null;
    }

}
