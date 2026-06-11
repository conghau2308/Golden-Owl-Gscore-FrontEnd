# G-Scores — Frontend

> Client app cho hệ thống tra cứu điểm thi THPT 2024.

🔗 **Demo**: https://golden-owl-gscore-front-end.vercel.app/

📦 **Backend repo & tài liệu đầy đủ**: [golden-owl-backend](https://github.com/YOUR_USERNAME/golden-owl-backend)

---

## 🎬 Demo

[![Demo Video](https://img.youtube.com/vi/mVM86bKW_xc/maxresdefault.jpg)](https://youtu.be/mVM86bKW_xc)

---

## Tech Stack

- **Next.js** — React framework
- **shadcn/ui** — Component library
- **TanStack Query** — Data fetching & client-side caching

---

## Chạy local

### Yêu cầu
- Node.js 18+

### Các bước

```bash
# 1. Clone
git clone https://github.com/YOUR_USERNAME/golden-owl-frontend.git
cd golden-owl-frontend

# 2. Cài dependencies
npm install

# 3. Cấu hình env
cp .env.example .env.local
```

Sửa `.env.local`:

```env
NEXT_PUBLIC_API_URL=http://localhost:8080
```

> Để trỏ vào production API, dùng:
> `NEXT_PUBLIC_API_URL=https://golden-owl-backend-test-production.up.railway.app`

```bash
# 4. Khởi động
npm run dev
```

App chạy tại: `http://localhost:3000`

---

## Cấu trúc thư mục

```
src/
├── app/              # Next.js app router
├── components/       # UI components (shadcn + custom)
├── hooks/            # TanStack Query hooks
├── lib/              # API client, utils
└── types/            # TypeScript types
```