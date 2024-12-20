import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IconButton } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import './AlunoAddPage.css';

const AlunoAddPage = () => {
  const navigate = useNavigate();
  const [aluno, setAluno] = useState({
    nome: '',
    sobrenome: '',
    dataNascimento: '',
    cpf: '',
    genero: '',
    email: '',
    cep: '',
    pais: '',
    rua: '',
    bairro: '',
    numero: '',
    complemento: '',
    cidade: '',
    estado: '',
    cursos: [],
  });

  const handleSave = async () => {
    try {
      const response = await fetch(`http://localhost:3000/api/alunos`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(aluno),
      });
      if (!response.ok) {
        throw new Error('Erro ao adicionar o aluno');
      }
      alert('Aluno adicionado com sucesso!');
      navigate('/'); // Redireciona para a página principal após a adição
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

  const handleAddCurso = () => {
    setAluno((prevAluno) => ({
      ...prevAluno,
      cursos: [...(prevAluno.cursos || []), { nome: '', dataConclusao: '' }],
    }));
  };

  const handleRemoveCurso = (index) => {
    setAluno((prevAluno) => ({
      ...prevAluno,
      cursos: prevAluno.cursos.filter((_, i) => i !== index),
    }));
  };

  const fetchAddressByCep = async (cep) => {
    if (cep.length === 8) {
      try {
        const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
        if (!response.ok) {
          throw new Error('Erro ao buscar o endereço');
        }
        const data = await response.json();
        if (data.erro) {
          alert('CEP não encontrado');
        } else {
          setAluno((prevAluno) => ({
            ...prevAluno,
            rua: data.logradouro,
            bairro: data.bairro,
            cidade: data.localidade,
            estado: data.uf,
          }));
        }
      } catch (error) {
        console.error('Erro:', error);
      }
    }
  };

  return (
    <div className="aluno-add-page">
      <header className="header">
        <IconButton onClick={() => navigate('/')} style={{ color: '#fff' }}>
          <ArrowBackIcon />
        </IconButton>
        <h1>Adicionar Aluno</h1>
      </header>
      <div style={{ paddingTop: '50px' }}>
        <form className="form">
          <section className="personal-info">
            <h3>Informações Pessoais</h3>
            <label>
              <span>Nome</span>
              <input
                type="text"
                value={aluno.nome}
                onChange={(e) => handleInputChange('nome', e.target.value)}
                className="input-field"
              />
            </label>
            <label>
              <span>Sobrenome</span>
              <input
                type="text"
                value={aluno.sobrenome}
                onChange={(e) => handleInputChange('sobrenome', e.target.value)}
                className="input-field"
              />
            </label>
            <label>
              <span>Data de nascimento</span>
              <input
                type="text"
                value={aluno.dataNascimento}
                onChange={(e) => handleInputChange('dataNascimento', e.target.value)}
                className="input-field"
              />
            </label>
            <label>
              <span>CPF</span>
              <input
                type="text"
                value={aluno.cpf}
                onChange={(e) => handleInputChange('cpf', e.target.value)}
                className="input-field"
              />
            </label>
            <label>
              <span>Gênero</span>
              <input
                type="text"
                value={aluno.genero}
                onChange={(e) => handleInputChange('genero', e.target.value)}
                className="input-field"
              />
            </label>
            <label>
              <span>Email</span>
              <input
                type="text"
                value={aluno.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                className="input-field"
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
                onChange={(e) => {
                  handleInputChange('cep', e.target.value);
                  if (e.target.value.length === 8) {
                    fetchAddressByCep(e.target.value);
                  }
                }}
                className="input-field"
              />
            </label>
            <label>
              País
              <input
                type="text"
                value={aluno.pais}
                onChange={(e) => handleInputChange('pais', e.target.value)}
                className="input-field"
              />
            </label>
            <label>
              Rua
              <input
                type="text"
                value={aluno.rua}
                onChange={(e) => handleInputChange('rua', e.target.value)}
                className="input-field"
              />
            </label>
            <label>
              Bairro
              <input
                type="text"
                value={aluno.bairro}
                onChange={(e) => handleInputChange('bairro', e.target.value)}
                className="input-field"
              />
            </label>
            <label>
              Número
              <input
                type="text"
                value={aluno.numero}
                onChange={(e) => handleInputChange('numero', e.target.value)}
                className="input-field"
              />
            </label>
            <label>
              Complemento
              <input
                type="text"
                value={aluno.complemento}
                onChange={(e) => handleInputChange('complemento', e.target.value)}
                className="input-field"
              />
            </label>
            <label>
              Cidade
              <input
                type="text"
                value={aluno.cidade}
                onChange={(e) => handleInputChange('cidade', e.target.value)}
                className="input-field"
              />
            </label>
            <label>
              Estado
              <input
                type="text"
                value={aluno.estado}
                onChange={(e) => handleInputChange('estado', e.target.value)}
                className="input-field"
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
                    className="input-field"
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
                    className="input-field"
                    onChange={(e) => {
                      const newCursos = [...aluno.cursos];
                      newCursos[index].dataConclusao = e.target.value;
                      setAluno((prevAluno) => ({ ...prevAluno, cursos: newCursos }));
                    }}
                  />
                </label>
                <IconButton onClick={() => handleRemoveCurso(index)} style={{ color: '#f00' }}>
                  <RemoveIcon />
                </IconButton>
              </div>
            ))}
            <IconButton onClick={handleAddCurso} style={{ color: '#00f' }}>
              <AddIcon />
            </IconButton>
          </section>
          <button type="button" onClick={handleSave} className="save-button">
            Salvar
          </button>
        </form>
      </div>
    </div>
  );
};

export default AlunoAddPage;
