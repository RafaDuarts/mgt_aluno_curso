import React, { useState } from 'react';

const AlunoFilter = ({ onFilter }) => {
    const [search, setSearch] = useState('');

    const handleChange = (e) => {
        setSearch(e.target.value);
        onFilter(e.target.value);
    };

    return (
        <input
            type="text"
            placeholder="Buscar aluno"
            value={search}
            onChange={handleChange}
        />
    );
};

export default AlunoFilter;
