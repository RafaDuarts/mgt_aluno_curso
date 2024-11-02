import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AlunoDetailPage from './pages/AlunoDetailPage';
import AlunoEditPage from './pages/AlunoEditPage';
import AlunoAddPage from './pages/AlunoAddPage';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<HomePage/>} />
                <Route path="/alunos/:id" element={<AlunoDetailPage/>} />
                <Route path="/alunos/:id/editar" element={<AlunoEditPage/>} />
                <Route path="/alunos/add" element={<AlunoAddPage/>} />
            </Routes>
        </Router>
    );
};

export default App;

