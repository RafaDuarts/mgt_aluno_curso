import React, { useEffect, useState } from 'react';
import { Table, Input, Button, Tag } from 'antd';
import { SearchOutlined, UserAddOutlined } from '@ant-design/icons';
import './HomePage.css';

const HomePage = () => {
  const [searchText, setSearchText] = useState('');
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]); // Estado para armazenar dados filtrados

  useEffect(() => {
    const fetchAlunos = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/alunos');
        if (!response.ok) {
          throw new Error('Erro ao buscar alunos');
        }
        const alunos = await response.json();

        // Associando os dados dos alunos
        const alunosAssociados = alunos.map(aluno => ({
          id: String(aluno.id),  // '1', '2', etc.
          registrationDate: new Date(aluno.createdAt).toISOString().split('T')[0],  // Data de criação
          name: `${aluno.nome} ${aluno.sobrenome}`,  // Nome completo
          state: aluno.estado,  // Estado
          courses: []
        }));

        setData(alunosAssociados);
        setFilteredData(alunosAssociados); // Inicialmente, os dados filtrados são todos os alunos
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
        <a href={`alunos/${String(aluno.id)}`}>{text}</a>
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
          Adicionar
        </Button>
      </div>
      <Table
        columns={columns}
        dataSource={filteredData}
        pagination={{ pageSize: 5 }}
        style={{ width: 1000, marginRight: 150, marginLeft: 150, marginTop: 50 }}
        rowKey="key"
      />
      {/* <Pagination
        defaultCurrent={1}
        total={filteredData.length} // Usa o total de alunos filtrados
        style={{ textAlign: 'center', marginTop: 20 }}
      /> */}
    </div>
  );
};

export default HomePage;
