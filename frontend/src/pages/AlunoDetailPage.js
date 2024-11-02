import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import './AlunoDetailPage.css';

const AlunoDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
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

  const handleDelete = async () => {
    try {
      const response = await fetch(`http://localhost:3000/api/alunos/${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        alert('Aluno deletado com sucesso!');
        navigate('/'); // Redireciona para a página inicial após a exclusão
      } else {
        throw new Error('Erro ao deletar aluno');
      }
    } catch (error) {
      console.error('Erro:', error);
    }
  };

  const handleBack = () => {
    navigate('/'); // Navega de volta para a página principal
  };

  if (!aluno) {
    return <div>Carregando...</div>;
  }

  return (
    <div className="aluno-detail-page">
      <header className="header">
        <ArrowBackIcon onClick={handleBack} style={{ cursor: 'pointer', marginRight: '8px' }} />
        <h1>Gerenciador de alunos | {`${aluno.nome} ${aluno.sobrenome}`}</h1>
        <DeleteIcon onClick={handleDelete} style={{ cursor: 'pointer', marginLeft: 'auto' }} />
      </header>
      <div style={{ paddingTop: '50px' }}>
        <form className="form">
        <section className="section personal-info">
            <h3>Informações Pessoais</h3>
            <div className="field-group">
              <label>
                Nome
                <input type="text" value={aluno.nome} readOnly className="input-field" />
              </label>
              <label>
                Sobrenome
                <input type="text" value={aluno.sobrenome} readOnly className="input-field" />
              </label>
            </div>
            <div className="field-group">
              <label>
                Data de nascimento
                <input type="text" value={aluno.dataNascimento} readOnly className="input-field" />
              </label>
              <label>
                CPF
                <input type="text" value={aluno.cpf} readOnly className="input-field" />
              </label>
            </div>
            <label>
              Gênero
              <input type="text" value={aluno.genero} readOnly className="input-field" />
            </label>
            <label>
              Email
              <input type="text" value={aluno.email} readOnly className="input-field" />
            </label>
          </section>
          <section className="section location">
            <h3>Localização</h3>
            <div className="field-group">
              <label>
                CEP
                <input type="text" value={aluno.cep} readOnly className="input-field" />
              </label>
              <label>
                País
                <input type="text" value={aluno.pais} readOnly className="input-field" />
              </label>
            </div>
            <label>
              Rua
              <input type="text" value={aluno.rua} readOnly className="input-field" />
            </label>
            <label>
              Bairro
              <input type="text" value={aluno.bairro} readOnly className="input-field" />
            </label>
            <div className="field-group">
              <label>
                Número
                <input type="text" value={aluno.numero} readOnly className="input-field" />
              </label>
              <label>
                Complemento
                <input type="text" value={aluno.complemento} readOnly className="input-field" />
              </label>
            </div>
            <div className="field-group">
              <label>
                Cidade
                <input type="text" value={aluno.cidade} readOnly className="input-field" />
              </label>
              <label>
                Estado
                <input type="text" value={aluno.estado} readOnly className="input-field" />
              </label>
            </div>
          </section>
          <section className="section courses">
            <h3>Cursos</h3>
            {(aluno.cursos || []).map((curso, index) => (
              <div className="course-item" key={index}>
                <label>
                  Nome do curso
                  <input type="text" value={curso.nome} readOnly className="input-field" />
                </label>
                <label>
                  Data de conclusão
                  <input type="text" value={curso.dataConclusao} readOnly className="input-field" />
                </label>
              </div>
            ))}
          </section>
        </form>
      </div>
    </div>
  );
};

export default AlunoDetailPage;
