import React, { useState, useEffect } from 'react';
import { getCepData } from '../services/cepService'; // API de CEP

const AlunoForm = ({ aluno, onSave }) => {
    const [formData, setFormData] = useState({ ...aluno });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleCepBlur = async (e) => {
        const cep = e.target.value;
        const data = await getCepData(cep);
        setFormData({ ...formData, ...data });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(formData);
    };

    return (
        <form onSubmit={handleSubmit}>
            <input name="nome" value={formData.nome} onChange={handleChange} placeholder="Nome" />
            <input name="sobrenome" value={formData.sobrenome} onChange={handleChange} placeholder="Sobrenome" />
            {/* Campos adicionais... */}
            <input name="cep" onBlur={handleCepBlur} placeholder="CEP" />
            <button type="submit">Salvar</button>
        </form>
    );
};

export default AlunoForm;
