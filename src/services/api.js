// API 설정에서 API 주소 가져오기
import { API_BASE_URL } from '../config/api';

// API 호출 헬퍼 함수
const apiCall = async (endpoint, options = {}) => {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, options);
    
    // 응답이 없는 경우
    if (!response.ok && response.status === 404) {
      throw new Error(`API 경로를 찾을 수 없습니다: ${endpoint}. 백엔드 서버의 라우터 설정을 확인해주세요.`);
    }
    
    let data;
    try {
      data = await response.json();
    } catch (e) {
      throw new Error(`서버 응답을 파싱할 수 없습니다. (상태 코드: ${response.status})`);
    }
    
    if (response.ok) {
      return data;
    } else {
      throw new Error(data.error || `서버 오류: ${response.status}`);
    }
  } catch (error) {
    // 네트워크 오류인 경우
    if (error.message.includes('Failed to fetch') || 
        error.message.includes('NetworkError') ||
        error.message.includes('fetch') ||
        error.name === 'TypeError') {
      const serverInfo = API_BASE_URL || '백엔드 서버';
      throw new Error(`백엔드 서버에 연결할 수 없습니다. 서버 주소를 확인해주세요: ${serverInfo}`);
    }
    // 이미 처리된 에러는 그대로 전달
    throw error;
  }
};

// 할일 목록 조회
export const getTodos = async () => {
  try {
    // 일반적으로 Express 라우터는 /api에 마운트되므로 /api/todos를 시도
    // 만약 루트에 마운트되어 있다면 /todos로 변경하세요
    const data = await apiCall('/api/todos');
    return data.todos;
  } catch (error) {
    // /api/todos가 실패하면 /todos 시도
    if (error.message.includes('API 경로를 찾을 수 없습니다')) {
      try {
        const data = await apiCall('/todos');
        return data.todos;
      } catch (retryError) {
        console.error('할일 목록 조회 오류:', retryError);
        throw retryError;
      }
    }
    console.error('할일 목록 조회 오류:', error);
    throw error;
  }
};

// 할일 생성
export const createTodo = async (title, description = '') => {
  try {
    const data = await apiCall('/api/todos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title, description }),
    });
    return data.todo;
  } catch (error) {
    if (error.message.includes('API 경로를 찾을 수 없습니다')) {
      try {
        const data = await apiCall('/todos', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ title, description }),
        });
        return data.todo;
      } catch (retryError) {
        console.error('할일 생성 오류:', retryError);
        throw retryError;
      }
    }
    console.error('할일 생성 오류:', error);
    throw error;
  }
};

// 할일 수정
export const updateTodo = async (id, title, description = '') => {
  try {
    const data = await apiCall(`/api/todos/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title, description }),
    });
    return data.todo;
  } catch (error) {
    if (error.message.includes('API 경로를 찾을 수 없습니다')) {
      try {
        const data = await apiCall(`/todos/${id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ title, description }),
        });
        return data.todo;
      } catch (retryError) {
        console.error('할일 수정 오류:', retryError);
        throw retryError;
      }
    }
    console.error('할일 수정 오류:', error);
    throw error;
  }
};

// 할일 삭제
export const deleteTodo = async (id) => {
  try {
    const data = await apiCall(`/api/todos/${id}`, {
      method: 'DELETE',
    });
    return data.todo;
  } catch (error) {
    if (error.message.includes('API 경로를 찾을 수 없습니다')) {
      try {
        const data = await apiCall(`/todos/${id}`, {
          method: 'DELETE',
        });
        return data.todo;
      } catch (retryError) {
        console.error('할일 삭제 오류:', retryError);
        throw retryError;
      }
    }
    console.error('할일 삭제 오류:', error);
    throw error;
  }
};
