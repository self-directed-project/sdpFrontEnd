# sdp-frontend rules

## Using git-flow

### '1. feature branch 생성'

$ git flow feature start 브랜치명

### '2. feature branch에서 stage로 올리기'

$ git add .
$ git commit -m 'message'

### `3. feature branch를 remote로 원격저장소에 저장`

$ git flow feature publish 브랜치명

### `4. feature branch에서 develop브랜치로 merge하고 feature branch 삭제`

$ git flow feature finish 브랜치명

### `5. merge된 develop branch에서 원격 저장소에 저장`

$ git push origin develop

## Commit Convention

```
  ✨feat: 새로운 기능
  🐛fix: 버그
  ♻️refactor: 코드 리팩토링
  💅style: 코드 의미에 영향을 주지 않는 변경사항 (형식 지정, 세미콜론 누락 등)
  📝docs: 문서의 추가, 수정, 삭제
  🧪test: 테스트 추가, 수정, 삭제 (비즈니스 로직에 변경 없음)
  🧹chore: 기타 변경사항 (빌드 부분 혹은 패키지 매니저 수정사항)
```
