import axios from 'axios';

const API_URL = 'http://localhost:3000/api'; // URL do back-end

export const getAlunos = async () => {
    const response = await axios.get(`${API_URL}/alunos`);
    return response.data;
};

export const addAluno = async (aluno) => {
    const response = await axios.post(`${API_URL}/alunos`, aluno);
    return response.data;
};

export const editAluno = async (id, aluno) => {
    const response = await axios.put(`${API_URL}/alunos/${id}`, aluno);
    return response.data;
};

export const deleteAluno = async (id) => {
    await axios.delete(`${API_URL}/alunos/${id}`);
};
