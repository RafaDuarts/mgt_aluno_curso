import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './AlunoDetailPage.css';

const AlunoDetailPage = () => {
  const { id } = useParams();
  const [aluno, setAluno] = useState(null);

  useEffect(() => {
    const fetchAlunoDetails = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/alunos/${id}`);
        if (!response.ok) {
          throw new Error('Erro ao buscar detalhes do aluno');
        }
        const alunoData = await response.json();
        setAluno(alunoData);
      } catch (error) {
        console.error('Erro:', error);
      }
    };

    fetchAlunoDetails();
  }, [id]);

  if (!aluno) {
    return <div>Carregando...</div>;
  }

  return (
    <div className="aluno-detail-page">
      <header className="header">
        <h1>Gerenciador de alunos | {`${aluno.nome} ${aluno.sobrenome}`}</h1>
      </header>
      <form className="form">
        <section className="personal-info" style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <h3>Informações Pessoais</h3>
          <label>
            <span>Nome</span>
            <input
              type="text"
              value={aluno.nome}
              readOnly
              style={{
                fontSize: '16px',
                padding: '8px',
                width: '100%',
                maxWidth: '300px',
                borderRadius: '5px',
                border: '1px solid #ccc',
              }}
            />
          </label>
          <label>
            <span>Sobrenome</span>
            <input
              type="text"
              value={aluno.sobrenome}
              readOnly
              style={{
                fontSize: '16px',
                padding: '8px',
                width: '100%',
                maxWidth: '300px',
                borderRadius: '5px',
                border: '1px solid #ccc',
              }}
            />
          </label>
          <label>
            <span>Data de nascimento</span>
            <input
              type="text"
              value={aluno.dataNascimento}
              readOnly
              style={{
                fontSize: '16px',
                padding: '8px',
                width: '100%',
                maxWidth: '300px',
                borderRadius: '5px',
                border: '1px solid #ccc',
              }}
            />
          </label>
          <label>
            <span>CPF</span>
            <input
              type="text"
              value={aluno.cpf}
              readOnly
              style={{
                fontSize: '16px',
                padding: '8px',
                width: '100%',
                maxWidth: '300px',
                borderRadius: '5px',
                border: '1px solid #ccc',
              }}
            />
          </label>
          <label>
            <span>Gênero</span>
            <input
              type="text"
              value={aluno.genero}
              readOnly
              style={{
                fontSize: '16px',
                padding: '8px',
                width: '100%',
                maxWidth: '300px',
                borderRadius: '5px',
                border: '1px solid #ccc',
              }}
            />
          </label>
          <label>
            <span>Email</span>
            <input
              type="text"
              value={aluno.email}
              readOnly
              style={{
                fontSize: '16px',
                padding: '8px',
                width: '100%',
                maxWidth: '300px',
                borderRadius: '5px',
                border: '1px solid #ccc',
              }}
            />
          </label>
        </section>
        <section className="location" style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <h3>Localização</h3>
          <label>
            CEP
            <input type="text" value={aluno.cep} readOnly className="custom-input" />
          </label>
          <label>
            País
            <input type="text" value={aluno.pais} readOnly className="custom-input" />
          </label>
          <label>
            Rua
            <input type="text" value={aluno.rua} readOnly className="custom-input" />
          </label>
          <label>
            Bairro
            <input type="text" value={aluno.bairro} readOnly className="custom-input" />
          </label>
          <label>
            Número
            <input type="text" value={aluno.numero} readOnly className="custom-input" />
          </label>
          <label>
            Complemento
            <input type="text" value={aluno.complemento} readOnly className="custom-input" />
          </label>
          <label>
            Cidade
            <input type="text" value={aluno.cidade} readOnly className="custom-input" />
          </label>
          <label>
            Estado
            <input type="text" value={aluno.estado} readOnly className="custom-input" />
          </label>
        </section>
        <section className="courses" style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <h3>Cursos</h3>
          {(aluno.cursos || []).map((curso, index) => (
            <div className="course" key={index}>
              <label>
                Nome do curso
                <input type="text" value={curso.nome} readOnly />
              </label>
              <label>
                Data de conclusão
                <input type="text" value={curso.dataConclusao} readOnly />
              </label>
            </div>
          ))}
        </section>
      </form>
    </div>
  );
};

export default AlunoDetailPage;
