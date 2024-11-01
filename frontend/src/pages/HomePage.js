import React, { useEffect, useState } from 'react';
import AlunoTable from '../components/AlunoTable';
import AlunoFilter from '../components/AlunoFilter';
import { getAlunos, deleteAluno } from '../services/alunoService';

const HomePage = () => {
    const [alunos, setAlunos] = useState([]);
    const [filteredAlunos, setFilteredAlunos] = useState([]);

    useEffect(() => {
        const fetchAlunos = async () => {
            const data = await getAlunos();
            setAlunos(data);
            setFilteredAlunos(data);
        };
        fetchAlunos();
    }, []);

    const handleFilter = (search) => {
        const filtered = alunos.filter((aluno) =>
            aluno.nome.toLowerCase().includes(search.toLowerCase())
        );
        setFilteredAlunos(filtered);
    };

    const handleDelete = async (id) => {
        await deleteAluno(id);
        setFilteredAlunos(filteredAlunos.filter((aluno) => aluno.id !== id));
    };

    return (
        <div>
            <AlunoFilter onFilter={handleFilter} />
            <AlunoTable alunos={filteredAlunos} onDelete={handleDelete} />
        </div>
    );
};

export default HomePage;
