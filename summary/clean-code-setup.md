# Clean Code Setup Summary

## Dự án đã được cấu hình cho Clean Code với @/ aliases

### Những thay đổi đã thực hiện:

## 1. Cập nhật tsconfig.json
- Thêm path aliases cho tất cả các thư mục trong src:
  - `@/*` → `*`
  - `@/config/*` → `config/*`
  - `@/controllers/*` → `controllers/*`
  - `@/routes/*` → `routes/*`
  - `@/models/*` → `models/*`
  - `@/services/*` → `services/*`
  - `@/types/*` → `types/*`
  - `@/helpers/*` → `helpers/*`
  - `@/constant/*` → `constant/*`
  - `@/migrations/*` → `migrations/*`
- Thêm cấu hình `ts-node` với `tsconfig-paths/register`

## 2. Cập nhật import statements
Đã thay thế tất cả relative imports (`../`, `./`) bằng absolute imports (`@/`):

### Files được cập nhật:
- `src/index.ts`: `./app` → `@/app`, `./config/database` → `@/config/database`
- `src/app.ts`: `./config/database` → `@/config/database`, `./routes/healthRoutes` → `@/routes/healthRoutes`
- `src/routes/healthRoutes.ts`: `../controllers/healthController` → `@/controllers/healthController`
- `src/controllers/healthController.ts`: `../config/database` → `@/config/database`
- `src/models/User.ts`: `../config/database` → `@/config/database`, `types` → `@/types`
- `src/services/userService.ts`: `helpers` → `@/helpers`, `models/User` → `@/models/User`
- `src/helpers/security.ts`: `types` → `@/types`

## 3. Cập nhật package.json scripts
Thêm các scripts mới để hỗ trợ development workflow:
- `build`: Compile TypeScript
- `clean`: Xóa thư mục dist
- `dev`: Chạy development server với tsx watch
- `start`: Build và chạy production
- `test`: Chạy Jest tests
- `start:prod`: Chạy production với path resolution

## 4. Lợi ích của việc sử dụng @/ aliases:

### Trước khi thay đổi:
```typescript
import { sequelize } from '../config/database';
import { getHealth } from '../../controllers/healthController';
import { User } from '../../../models/User';
```

### Sau khi thay đổi:
```typescript
import { sequelize } from '@/config/database';
import { getHealth } from '@/controllers/healthController';
import { User } from '@/models/User';
```

### Advantages:
1. **Cleaner imports**: Không cần tính toán relative path
2. **Easier refactoring**: Di chuyển file không ảnh hưởng imports
3. **Better readability**: Rõ ràng hơn về structure của project
4. **IDE support**: IntelliSense và auto-completion tốt hơn
5. **Maintainability**: Dễ maintain và debug hơn

## 5. Cấu trúc project hiện tại:
```
src/
├── config/
│   └── database.ts
├── controllers/
│   └── healthController.ts
├── routes/
│   └── healthRoutes.ts
├── models/
│   ├── User.ts
│   └── index.ts
├── services/
│   ├── userService.ts
│   └── index.ts
├── types/
│   ├── user.ts
│   ├── helper.ts
│   └── index.ts
├── helpers/
│   ├── security.ts
│   └── index.ts
├── constant/
├── migrations/
├── app.ts
└── index.ts
```

## 6. Commands để sử dụng:
```bash
# Development
npm run dev

# Build
npm run build

# Production
npm run start

# Clean build artifacts
npm run clean
```

## 7. Environment Variables cần thiết:
Để chạy server, cần set các environment variables sau:
- `DB_NAME`: Tên database
- `DB_USER`: Username database
- `DB_PASSWORD`: Password database
- `DB_HOST`: Host database
- `PORT`: Port server (optional, default: 3000)

## Status: ✅ COMPLETED
Dự án đã được setup thành công với clean code standards sử dụng @/ aliases thay vì relative imports. 