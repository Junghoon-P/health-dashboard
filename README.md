# Health Dashboard

건강검진 결과 조회 및 대시보드 시스템
👉 [서비스 바로가기](https://health-dashboard-nsww.vercel.app/checkup/start)

## 🚀 실행 방법

### 설치 및 실행

```bash
# 의존성 설치
pnpm install

# 개발 서버 실행
pnpm dev

# 빌드
pnpm build
```

### 환경 변수 설정

`.env` 파일에 필요한 환경 변수를 설정하세요:

```
VITE_CANDIY_API_KEY=your_api_key
```

## 🛠️ 사용 기술

### 프론트엔드 스택

- **React 19** - UI 라이브러리
- **TypeScript** - 타입 안전성
- **Vite** - 빌드 도구 및 개발 서버
- **TailwindCSS** - 스타일링

### 상태 관리 및 데이터

- **Zustand** - 전역 상태 관리
- **@tanstack/react-query** - 서버 상태 관리 및 캐싱
- **React Router DOM** - 클라이언트 사이드 라우팅

### 데이터 시각화

- **Chart.js** - 차트 라이브러리
- **react-chartjs-2** - React Chart.js 통합

### HTTP 클라이언트

- **Axios** - API 통신

## 📊 주요 기능

### 1. 건강검진 결과 조회

- 간편인증을 통한 개인 건강검진 데이터 조회
- 다양한 로그인 방식 지원 (카카오톡, 네이버, 통신사 등)
- 조회 기간 설정 (시작년도~종료년도)

### 2. 다중 검진 결과 선택 시스템

- 여러 검진 결과가 있을 경우 선택 가능한 UI
- 검진 날짜별 구분 및 직관적인 선택 인터페이스
- 선택된 검진에 따른 실시간 대시보드 업데이트

### 3. 건강 대시보드
- **종합 건강점수**: 전체 건강 상태를 점수로 시각화
- **체형 정보**: BMI, 키, 체중, 허리둘레 등
- **혈압 분석**: 수축기/이완기 혈압 상태
- **혈당 분석**: 식전혈당 수치 및 당뇨 위험도
- **콜레스테롤 분석**: 총콜레스테롤, HDL, LDL, 중성지방
- **간 기능 검사**: AST, ALT, 감마지피티 수치
- **차트 시각화**: 각 지표별 직관적인 차트 제공
#### 보너스 과제
- **이전 검진결과 조회**: 여러 검진 결과가 있을 경우 선택 및 조회
- **유저 코멘트 기능**: 유저 검진 결과를 바탕으로 건강 상태에 따른 간단한 메세지

### 4. 에러 처리 시스템

- 사용자 친화적인 에러 페이지
- 상세 오류 정보 제공

### 5. 반응형 디자인

- 모바일, 태블릿, 데스크톱 최적화
- 터치 친화적인 UI/UX

## 🏗️ 프로젝트 구조

```
src/
├── components/          # 공용 컴포넌트
│   ├── CheckupLayout.tsx    # 공용 레이아웃
│   └── ErrorMessage.tsx     # 에러 메시지 컴포넌트
├── features/           # 기능별 모듈
│   └── checkup/
│       ├── components/     # 건강검진 관련 컴포넌트
│       ├── hooks/         # 커스텀 훅
│       ├── utils/         # 유틸리티 함수
│       └── type.ts        # 타입 정의
├── pages/              # 페이지 컴포넌트
│   └── checkup/
├── store/              # 전역 상태 관리
├── lib/                # 라이브러리 설정
└── constants/          # 상수 정의
```

## 📋 개발 히스토리

### 🔗 [#6 건강검진 결과 다중 선택 시스템 및 공용 레이아웃 구현](https://github.com/Junghoon-P/health-dashboard/pull/6)

- 다중 검진 결과 선택 UI 구현
- 공용 레이아웃 컴포넌트 도입
- 반응형 디자인 최적화
- 검진 결과 실시간 업데이트 시스템

### 🔗 [#5 건강검진 에러 처리 페이지 및 시스템 구현](https://github.com/Junghoon-P/health-dashboard/pull/5)

- 전용 에러 페이지 구현
- 사용자 친화적인 에러 메시지 시스템
- 자동 복구 및 재시도 기능
- 에러 상태 관리 개선

### 🔗 [#4 건강검진 다중 페이지 라우터 구조 개편](https://github.com/Junghoon-P/health-dashboard/pull/4)

- React Router 기반 SPA 구조로 전환
- 페이지별 상태 관리 개선
- 자동 네비게이션 로직 구현
- URL 기반 라우팅 시스템

### 🔗 [#3 건강검진 결과 대시보드 및 컴포넌트 리팩토링](https://github.com/Junghoon-P/health-dashboard/pull/3)

- 종합 건강 대시보드 구현
- Chart.js 기반 데이터 시각화
- 건강 지표별 상세 분석 기능
- 컴포넌트 모듈화 및 재사용성 개선

### 🔗 [#2 건강검진 조회 flow 구현](https://github.com/Junghoon-P/health-dashboard/pull/2)

- 건강검진 조회 프로세스 구현
- 폼 검증 및 사용자 입력 처리
- 간편인증 연동 시스템
- 조회 진행 상태 관리

### 🔗 [#1 Health Dashboard api 및 기본 대시보드 구축](https://github.com/Junghoon-P/health-dashboard/pull/1)

- 프로젝트 초기 구조 설정
- API 클라이언트 구현
- 기본 UI 컴포넌트 개발
- 상태 관리 시스템 구축

## 📝 라이선스

MIT License
