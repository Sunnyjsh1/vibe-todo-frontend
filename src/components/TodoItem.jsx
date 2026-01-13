import { useState } from 'react';
import './TodoItem.css';

function TodoItem({ todo, onUpdate, onDelete }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(todo.title);
  const [editDescription, setEditDescription] = useState(todo.description || '');

  const handleUpdate = async () => {
    if (editTitle.trim() === '') {
      alert('제목을 입력해주세요.');
      return;
    }

    try {
      await onUpdate(todo._id, editTitle.trim(), editDescription.trim());
      setIsEditing(false);
    } catch (error) {
      alert(error.message);
    }
  };

  const handleCancel = () => {
    setEditTitle(todo.title);
    setEditDescription(todo.description || '');
    setIsEditing(false);
  };

  return (
    <div className="todo-item">
      {isEditing ? (
        <div className="todo-edit">
          <input
            type="text"
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            placeholder="제목"
            className="todo-edit-title"
          />
          <textarea
            value={editDescription}
            onChange={(e) => setEditDescription(e.target.value)}
            placeholder="설명 (선택사항)"
            className="todo-edit-description"
          />
          <div className="todo-edit-actions">
            <button onClick={handleUpdate} className="btn-save">저장</button>
            <button onClick={handleCancel} className="btn-cancel">취소</button>
          </div>
        </div>
      ) : (
        <div className="todo-content">
          <div className="todo-info">
            <h3 className="todo-title">{todo.title}</h3>
            {todo.description && (
              <p className="todo-description">{todo.description}</p>
            )}
            <span className="todo-date">
              {new Date(todo.createdAt).toLocaleString('ko-KR')}
            </span>
          </div>
          <div className="todo-actions">
            <button
              onClick={() => setIsEditing(true)}
              className="btn-edit"
            >
              수정
            </button>
            <button
              onClick={() => onDelete(todo._id)}
              className="btn-delete"
            >
              삭제
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default TodoItem;
