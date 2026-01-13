# Heroku 배포 가이드

## 환경 변수 설정

### 현재 설정 확인

현재 코드는 환경 변수 `VITE_API_BASE_URL`을 사용합니다:
- **로컬 개발**: `.env` 파일에서 읽음
- **Heroku 배포**: Heroku Config Vars에서 읽음

### Heroku에서 환경 변수 설정 방법

1. **Heroku Dashboard에서 설정**:
   - Heroku Dashboard → Your App → Settings → Config Vars
   - `VITE_API_BASE_URL` = `https://vibe-todo-backends-eaa7d6f19e23.herokuapp.com`

2. **Heroku CLI로 설정**:
   ```bash
   heroku config:set VITE_API_BASE_URL=https://vibe-todo-backends-eaa7d6f19e23.herokuapp.com
   ```

### 중요 사항

⚠️ **Vite 환경 변수는 빌드 시점에 번들에 포함됩니다**

- Heroku에서 빌드할 때 Config Vars에 설정된 값이 사용됩니다
- `.env` 파일은 로컬 개발용이며, Heroku에는 업로드되지 않습니다
- 환경 변수를 변경한 후에는 **다시 빌드**해야 합니다

### 빌드 및 배포

```bash
# Heroku에 배포
git push heroku main

# 또는 빌드만 실행 (로컬에서)
npm run build
```

빌드 후 `dist` 폴더의 파일들을 확인하면 환경 변수가 포함되어 있습니다.
