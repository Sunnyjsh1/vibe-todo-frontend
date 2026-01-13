import { useState } from 'react';
import './TodoForm.css';

function TodoForm({ onSubmit }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (title.trim() === '') {
      alert('제목을 입력해주세요.');
      return;
    }

    try {
      await onSubmit(title.trim(), description.trim());
      setTitle('');
      setDescription('');
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <form className="todo-form" onSubmit={handleSubmit}>
      <h2>새 할일 추가</h2>
      <div className="form-group">
        <label htmlFor="title">제목 *</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="할일 제목을 입력하세요"
          className="form-input"
        />
      </div>
      <div className="form-group">
        <label htmlFor="description">설명</label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="설명을 입력하세요 (선택사항)"
          className="form-textarea"
        />
      </div>
      <button type="submit" className="btn-submit">
        추가하기
      </button>
    </form>
  );
}

export default TodoForm;
