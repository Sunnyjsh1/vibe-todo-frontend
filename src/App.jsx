import { useState, useEffect } from 'react';
import './App.css';
import TodoForm from './components/TodoForm';
import TodoItem from './components/TodoItem';
import { getTodos, createTodo, updateTodo, deleteTodo } from './services/api';
import { getCurrentApiUrl, HEROKU_API_URL } from './config/api';

function App() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 할일 목록 불러오기
  const fetchTodos = async () => {
    try {
      setLoading(true);
      setError(null);
      const todosData = await getTodos();
      setTodos(todosData);
    } catch (err) {
      setError(err.message);
      console.error('할일 목록 불러오기 실패:', err);
    } finally {
      setLoading(false);
    }
  };

  // 컴포넌트 마운트 시 할일 목록 불러오기
  useEffect(() => {
    fetchTodos();
  }, []);

  // 할일 추가
  const handleCreateTodo = async (title, description) => {
    try {
      const newTodo = await createTodo(title, description);
      setTodos([newTodo, ...todos]);
    } catch (err) {
      throw err;
    }
  };

  // 할일 수정
  const handleUpdateTodo = async (id, title, description) => {
    try {
      const updatedTodo = await updateTodo(id, title, description);
      setTodos(todos.map(todo => todo._id === id ? updatedTodo : todo));
    } catch (err) {
      throw err;
    }
  };

  // 할일 삭제
  const handleDeleteTodo = async (id) => {
    if (!window.confirm('정말 삭제하시겠습니까?')) {
      return;
    }

    try {
      await deleteTodo(id);
      setTodos(todos.filter(todo => todo._id !== id));
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="app">
      <div className="container">
        <header className="app-header">
          <h1>할일 관리 앱</h1>
          <p>할일을 추가, 수정, 삭제할 수 있습니다.</p>
          <p style={{ fontSize: '12px', opacity: 0.8, marginTop: '8px' }}>
            현재 API: {getCurrentApiUrl()}
          </p>
        </header>

        <TodoForm onSubmit={handleCreateTodo} />

        <div className="todos-section">
          <h2>할일 목록 ({todos.length})</h2>
          
          {loading && (
            <div className="loading">할일 목록을 불러오는 중...</div>
          )}

          {error && (
            <div className="error">
              <p>오류: {error}</p>
              <div className="error-help">
                <p><strong>문제 해결 방법:</strong></p>
                <ul>
                  <li>현재 Heroku 백엔드를 사용 중입니다: <code>{HEROKU_API_URL}</code></li>
                  <li>로컬 백엔드를 사용하려면 <code>.env</code> 파일에 <code>VITE_API_BASE_URL=http://localhost:5000</code>을 설정하세요</li>
                  <li>프론트엔드 앱은 Vite 개발 서버를 통해 접근해야 합니다 (<code>npm run dev</code>)</li>
                </ul>
              </div>
              <button onClick={fetchTodos} className="btn-retry">
                다시 시도
              </button>
            </div>
          )}

          {!loading && !error && todos.length === 0 && (
            <div className="empty-state">
              <p>할일이 없습니다. 새로운 할일을 추가해보세요!</p>
            </div>
          )}

          {!loading && !error && todos.length > 0 && (
            <div className="todos-list">
              {todos.map(todo => (
                <TodoItem
                  key={todo._id}
                  todo={todo}
                  onUpdate={handleUpdateTodo}
                  onDelete={handleDeleteTodo}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
