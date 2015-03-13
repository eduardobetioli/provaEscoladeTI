package br.unicesumar.restserver.Disciplina;

import java.util.List;
import javax.persistence.EntityManager;
import javax.persistence.Query;
import javax.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value = "/disciplinas")
@Transactional
public class DisciplinaController {
    
    @Autowired
    private EntityManager em;
    
    @RequestMapping(method = RequestMethod.GET)
    public List<Disciplina> getDisciplina(){
        Query disci = em.createQuery("from Disciplina");
        return disci.getResultList();
    }
    
    @RequestMapping(method = RequestMethod.POST)
    public void criarDisciplina(@RequestBody Disciplina disciplina){
        em.persist(disciplina);
    }
    
    @RequestMapping(method = RequestMethod.PUT)
    public void alterarDisciplina(@RequestBody Disciplina disciplina){
        Disciplina disci = em.merge(disciplina);
        em.persist(disci);
    }
    
    @RequestMapping(value = "/{id}" ,method = RequestMethod.DELETE)
    public void excluirDisciplina(@PathVariable Long id){
        Disciplina disci = em.find(Disciplina.class, id);
        em.remove(disci);
    }
}