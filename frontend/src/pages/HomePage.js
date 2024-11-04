import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Table, Input, Button, Tag } from 'antd';
import { SearchOutlined, UserAddOutlined } from '@ant-design/icons';
import './HomePage.css';

const HomePage = () => {
  const [searchText, setSearchText] = useState('');
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    const fetchAlunos = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/alunos');
        if (!response.ok) {
          throw new Error('Erro ao buscar alunos');
        }
        const alunos = await response.json();
    
        const alunosAssociados = alunos.map(aluno => ({
          id: String(aluno.id),
          registrationDate: new Date(aluno.createdAt).toISOString().split('T')[0],
          name: `${aluno.nome} ${aluno.sobrenome}`,
          state: aluno.estado,
          courses: aluno.cursos ? aluno.cursos.map(curso => curso.nome) : [] // Adiciona esta linha
        }));
    
        setData(alunosAssociados);
        setFilteredData(alunosAssociados);
      } catch (error) {
        console.error('Erro:', error);
      }
    };
    

    fetchAlunos();
  }, []);

  useEffect(() => {
    const filtered = data.filter(aluno =>
      aluno.name.toLowerCase().includes(searchText.toLowerCase())
    );
    setFilteredData(filtered);
  }, [searchText, data]);

  const handleDelete = async (id) => {
    // Lógica para deletar aluno
    try {
      const response = await fetch(`http://localhost:3000/api/alunos/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Erro ao deletar aluno');
      }
      // Atualiza os dados após a exclusão
      const updatedData = filteredData.filter(aluno => aluno.id !== id);
      setFilteredData(updatedData);
    } catch (error) {
      console.error('Erro:', error);
    }
  };

  const columns = [
    {
      title: 'Data de cadastro',
      dataIndex: 'registrationDate',
      key: 'registrationDate',
    },
    {
      title: 'Nome',
      dataIndex: 'name',
      key: 'name',
      render: (text, aluno) => (
        <Link to={`/alunos/${String(aluno.id)}`}>{text}</Link>
      ),
    },
    {
      title: 'Estado',
      dataIndex: 'state',
      key: 'state',
    },
    {
      title: 'Cursos',
      dataIndex: 'courses',
      key: 'courses',
      render: courses => (
        <>
          {courses.map(course => (
            <Tag color="blue" key={course}>
              {course}
            </Tag>
          ))}
        </>
      ),
    },
    {
      title: 'Ações',
      key: 'actions',
      render: (text, aluno) => (
        <div>
          <Link to={`/alunos/${aluno.id}/editar`}>
            <Button type="primary" style={{ marginRight: 10 }}>Editar</Button>
          </Link>
          <Button type="danger" onClick={() => handleDelete(aluno.id)}>Deletar</Button>
        </div>
      ),
    },
  ];

  const handleSearch = (e) => {
    setSearchText(e.target.value);
  };

  return (
    <div className="home-page">
      <header className="header">
        <h1>Gerenciador de alunos</h1>
      </header>
      <div style={{ paddingTop: '50px' }} className="search-container">
        <Input
          placeholder="Buscar por aluno"
          prefix={<SearchOutlined />}
          value={searchText}
          onChange={handleSearch}
          style={{ width: 1000, marginRight: 10, marginLeft: 150, marginTop: 50 }}
        />
        <Button
          className="custom-button"
          type="dashed"
          icon={<UserAddOutlined />}
        >
          <Link to="/alunos/add" style={{ color: 'inherit', textDecoration: 'none' }}>
            Adicionar
          </Link>
        </Button>
      </div>
      <Table
        columns={columns}
        dataSource={filteredData}
        pagination={{ pageSize: 5 }}
        style={{ width: 1000, marginRight: 150, marginLeft: 150, marginTop: 50 }}
        rowKey= "Key"
      />
    </div>
  );
};

export default HomePage;
