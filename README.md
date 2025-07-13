# Hướng dẫn chạy dự án với Docker

Dự án **AIVideoCreator** sử dụng Docker để quản lý các dịch vụ bao gồm:

- **Frontend**: Ứng dụng Next.js, chạy trên cổng `3000`.
- **Backend**: Ứng dụng Spring Boot, chạy trên cổng `8080`.
- **Database**: MySQL, chạy trên cổng `3307` (ánh xạ từ cổng `3306` trong container).
- **Server Rendering**: Chạy generate ra video từ assets ở port `3100`
- **Server Video-Editor**: Vào trình duyệt video editor ở port `5173`

Hướng dẫn này giúp bạn chạy dự án trong **môi trường phát triển** (với hot-reload để hỗ trợ chỉnh sửa mã nguồn) và **môi trường production** (không có hot-reload, tối ưu cho triển khai).

## Yêu cầu

- **Docker**: Đã cài đặt Docker và Docker Compose. Tải tại https://www.docker.com/get-started.
- **Git**: Đã cài đặt để pull mã nguồn từ GitHub.
- **Node.js** và **Maven**: Không bắt buộc trên máy cục bộ (vì chạy trong container), nhưng cần nếu bạn muốn kiểm tra dependencies cục bộ.

## Chuẩn bị

1. **Clone dự án từ GitHub**:

  ```bash
  git clone https://github.com/NBVTien/ai-video-creator
  cd aivideocreator
  ```

2. **Kiểm tra tệp môi trường**:

- Copy tệp `.env.example` thành `.env` trong thư mục chính và chỉnh sửa thông tin kết nối tùy thích.
  ```
    MYSQL_DB=aivideocreator
    MYSQL_USER=
    MYSQL_PASS=
    MYSQL_ROOT_PASS=
    IMAGE_URL=https://pub-647c59c8fa3c4daaae41ac0c0be27bf1.r2.dev
    NEXTAUTH_SECRET=your-secret-key-here
 
  ```
- Copy tệp `.env.local.example` thành `.env.local` trong thư mục `frontend` và chỉnh sửa thông tin kết nối tùy thích.
  ```
    NEXT_PUBLIC_API_URL=http://localhost:8080
    NEXT_BACKEND_API_URL=http://127.0.0.1:8080
    GOOGLE_CLIENT_ID=
    GOOGLE_CLIENT_SECRET=
    NEXTAUTH_URL=http://localhost:3000
    NEXTAUTH_SECRET=your-secret-key-here
    IMAGE_URL=
  
  ```
-  Copy tệp `.env.example` thành `.env` trong thư mục `backend` và chỉnh sửa thông tin kết nối tùy thích.
```
CLIENT_URL=http://localhost:3000
# MySQL database connection
DB_URL=jdbc:mysql://mysql:3306/aivideocreator?useSSL=false&serverTimezone=UTC
DB_USERNAME=root
DB_PASSWORD=
# MySQL service configuration
MYSQL_ROOT_PASSWORD=
MYSQL_DATABASE=aivideocreator

# cloudflare R2 storage configuration
R2_ACCESS_KEY=
R2_SECRET_KEY=
R2_BUCKET=ai-videos
R2_REGION=auto
R2_TOKEN_VALUE=
R2_ACCOUNT_ID=
R2_ENDPOINT=

GEMINI_API_KEY=

CLOUDFLARE_AI_KEY=

wiki_key=
wiki_Client_ID=
wiki_Client_secret=

GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
```
- Đảm bảo các biến môi trường trong `.env` đã được thiết lập đúng.
- Tạo file `backend/.env` và `frontend/.env` rỗng, vì không tạo sẽ chạy lỗi, và tạo thêm để có thể thêm một số biến môi trường cần thiết trong quá trình làm.

### Build và chạy dự án

1. **Build image**:

  ```bash
  docker compose --build
  ```

- Dùng `-d` để chạy ở chế độ background:

  ```bash
  docker compose up -d
  ```
2. **Chạy Server Rendering & Server Video Editor**:
   2.1 **Server Rendering**
    ```
    cd frontend-renderer
    npm install
    node server.js
    ```
   4.2 **Server Video Editor**
    ```
    cd frontend-editor
    npm install
    npm run dev
    ```

3. **Kiểm tra trạng thái**:

- Xem log:

  ```bash
  docker compose logs
  docker compose logs aivideocreator-<service>
  ```

- Kiểm tra container:

  ```bash
  docker ps
  ```

3. **Truy cập ứng dụng**:

- **Frontend**: `http://localhost:3000`.
- **Backend**: Test API, thông qua việc đăng nhập vào ứng dụng frontend hoặc dùng curl, Postman, hoặc Thunder Client (Extension của VS Code).
- **MySQL**: Kết nối qua cổng `3307`.
- **Server Rendering**: Backend gọi thông qua port `3100`
- **Server Video Editor**: Kết nối qua cổng `5173`

### Cập nhật mã nguồn mới

- Trong production, không có hot-reload. Để áp dụng mã nguồn mới (ví dụ: sau khi pull từ GitHub):

  1. Pull code:

  ```bash
  git pull origin <branch>
  ```

  2. Build lại image và chạy:

  ```bash
  docker compose down
  docker compose up --build
  ```

### Dừng (remove) container

```bash
docker compose down
```

### Dừng container

```bash
docker compose stop
```

### start container

```bash
docker compose start
```


## Lưu ý

- **Dependencies**:

  - Kiểm tra `package.json` (frontend) và `pom.xml` (backend) sau khi pull code. Cài đặt dependencies trong container nếu cần.

- **MySQL**:

  - Dữ liệu được lưu trong volume `mysql_data`, không bị mất khi dừng container.

  - Để xóa dữ liệu (nếu cần), dùng:

    ```bash
    docker compose down --volumes
    ```


- **Dọn dẹp**:

  - Xóa container, image, hoặc volume không dùng:

    ```bash
    docker system prune
    docker volume prune
    ```

## Xử lý lỗi thường gặp

- **Frontend không reload khi thay đổi code**:

  - Đảm bảo dùng `docker-compose.yml` và container chạy `npm run dev`.
  - Kiểm tra quyền truy cập thư mục `frontend` trên máy chủ.

- **Backend API không cập nhật**:

  - Đảm bảo dùng `docker-compose.yml` và container chạy `mvn spring-boot:run`.
  - Kiểm tra `spring-boot-devtools` trong `pom.xml`.

- **Kết nối MySQL thất bại**:

  - Kiểm tra `backend/.env` có đúng `mysql:3306` và thông tin đăng nhập.
  - Đảm bảo dịch vụ `mysql` khởi động trước `backend` (được đảm bảo bởi `depends_on`).

- **Lỗi build image**:

  - Kiểm tra `package.json`, `pom.xml`, hoặc Dockerfile có lỗi cú pháp.

  - Xóa image cũ và build lại:

    ```bash
    docker compose down --rmi all
    docker compose up --build
    ```

## Liên hệ

Nếu gặp vấn đề hoặc cần hỗ trợ, mở issue trên GitHub.