import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { IconButton } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import DeleteIcon from '@mui/icons-material/Delete';
import './AlunoEditPage.css';

const AlunoEditPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [aluno, setAluno] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

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

  const handleSave = async () => {
    try {
      const response = await fetch(`http://localhost:3000/api/alunos/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(aluno),
      });
      if (!response.ok) {
        throw new Error('Erro ao salvar as alterações');
      }
      setIsEditing(false);
      alert('Alterações salvas com sucesso!');
    } catch (error) {
      console.error('Erro:', error);
    }
  };

  const handleDelete = async () => {
    try {
      const response = await fetch(`http://localhost:3000/api/alunos/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Erro ao deletar o aluno');
      }
      alert('Aluno deletado com sucesso!');
      navigate('/'); // Redireciona para a página principal após a exclusão
    } catch (error) {
      console.error('Erro:', error);
    }
  };

  const handleInputChange = (field, value) => {
    setAluno((prevAluno) => ({
      ...prevAluno,
      [field]: value,
    }));
  };

  if (!aluno) {
    return <div>Carregando...</div>;
  }

  return (
    <div className="aluno-edit-page">
      <header className="header">
        <IconButton onClick={() => navigate('/')} style={{ color: '#fff' }}>
          <ArrowBackIcon />
        </IconButton>
        <h1>Gerenciador de alunos | {`${aluno.nome} ${aluno.sobrenome}`}</h1>
        <IconButton onClick={handleDelete} style={{ color: '#fff' }}>
          <DeleteIcon />
        </IconButton>
      </header>
      <form className="form">
        <section className="personal-info">
          <h3>Informações Pessoais</h3>
          <label>
            <span>Nome</span>
            <input
              type="text"
              value={aluno.nome}
              onChange={(e) => handleInputChange('nome', e.target.value)}
            />
          </label>
          <label>
            <span>Sobrenome</span>
            <input
              type="text"
              value={aluno.sobrenome}
              onChange={(e) => handleInputChange('sobrenome', e.target.value)}
            />
          </label>
          <label>
            <span>Data de nascimento</span>
            <input
              type="text"
              value={aluno.dataNascimento}
              onChange={(e) => handleInputChange('dataNascimento', e.target.value)}
            />
          </label>
          <label>
            <span>CPF</span>
            <input
              type="text"
              value={aluno.cpf}
              onChange={(e) => handleInputChange('cpf', e.target.value)}
            />
          </label>
          <label>
            <span>Gênero</span>
            <input
              type="text"
              value={aluno.genero}
              onChange={(e) => handleInputChange('genero', e.target.value)}
            />
          </label>
          <label>
            <span>Email</span>
            <input
              type="text"
              value={aluno.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
            />
          </label>
        </section>
        <section className="location">
          <h3>Localização</h3>
          <label>
            CEP
            <input
              type="text"
              value={aluno.cep}
              onChange={(e) => handleInputChange('cep', e.target.value)}
            />
          </label>
          <label>
            País
            <input
              type="text"
              value={aluno.pais}
              onChange={(e) => handleInputChange('pais', e.target.value)}
            />
          </label>
          <label>
            Rua
            <input
              type="text"
              value={aluno.rua}
              onChange={(e) => handleInputChange('rua', e.target.value)}
            />
          </label>
          <label>
            Bairro
            <input
              type="text"
              value={aluno.bairro}
              onChange={(e) => handleInputChange('bairro', e.target.value)}
            />
          </label>
          <label>
            Número
            <input
              type="text"
              value={aluno.numero}
              onChange={(e) => handleInputChange('numero', e.target.value)}
            />
          </label>
          <label>
            Complemento
            <input
              type="text"
              value={aluno.complemento}
              onChange={(e) => handleInputChange('complemento', e.target.value)}
            />
          </label>
          <label>
            Cidade
            <input
              type="text"
              value={aluno.cidade}
              onChange={(e) => handleInputChange('cidade', e.target.value)}
            />
          </label>
          <label>
            Estado
            <input
              type="text"
              value={aluno.estado}
              onChange={(e) => handleInputChange('estado', e.target.value)}
            />
          </label>
        </section>
        <section className="courses">
          <h3>Cursos</h3>
          {(aluno.cursos || []).map((curso, index) => (
            <div className="course" key={index}>
              <label>
                Nome do curso
                <input
                  type="text"
                  value={curso.nome}
                  onChange={(e) => {
                    const newCursos = [...aluno.cursos];
                    newCursos[index].nome = e.target.value;
                    setAluno((prevAluno) => ({ ...prevAluno, cursos: newCursos }));
                  }}
                />
              </label>
              <label>
                Data de conclusão
                <input
                  type="text"
                  value={curso.dataConclusao}
                  onChange={(e) => {
                    const newCursos = [...aluno.cursos];
                    newCursos[index].dataConclusao = e.target.value;
                    setAluno((prevAluno) => ({ ...prevAluno, cursos: newCursos }));
                  }}
                />
              </label>
            </div>
          ))}
        </section>
        <button type="button" onClick={handleSave} className="save-button">
          Salvar
        </button>
      </form>
    </div>
  );
};

export default AlunoEditPage;
