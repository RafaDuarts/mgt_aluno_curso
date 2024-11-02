import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AlunoDetailPage from './pages/AlunoDetailPage';
import AlunoEditPage from './pages/AlunoEditPage';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<HomePage/>} />
                <Route path="/alunos/:id" element={<AlunoDetailPage/>} />
                <Route path="/alunos/:id/editar" element={<AlunoEditPage/>} />
            </Routes>
        </Router>
    );
};

export default App;

