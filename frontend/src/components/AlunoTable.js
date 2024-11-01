import React from 'react';

const AlunoTable = ({ alunos, onEdit, onDelete }) => {
    return (
        <table>
            <thead>
                <tr>
                    <th>Nome</th>
                    <th>Ações</th>
                </tr>
            </thead>
            <tbody>
                {alunos.map((aluno) => (
                    <tr key={aluno.id}>
                        <td>{aluno.nome}</td>
                        <td>
                            <button onClick={() => onEdit(aluno)}>Editar</button>
                            <button onClick={() => onDelete(aluno.id)}>Deletar</button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default AlunoTable;
