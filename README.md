# Hướng dẫn chạy dự án với Docker

Dự án **AIVideoCreator** sử dụng Docker để quản lý các dịch vụ bao gồm:

- **Frontend**: Ứng dụng Next.js, chạy trên cổng `3000`.
- **Backend**: Ứng dụng Spring Boot, chạy trên cổng `8080`.
- **Database**: MySQL, chạy trên cổng `3307` (ánh xạ từ cổng `3306` trong container).

Hướng dẫn này giúp bạn chạy dự án trong **môi trường phát triển** (với hot-reload để hỗ trợ chỉnh sửa mã nguồn) và **môi trường production** (không có hot-reload, tối ưu cho triển khai).

## Yêu cầu

- **Docker**: Đã cài đặt Docker và Docker Compose. Tải tại https://www.docker.com/get-started.

- **Git**: Đã cài đặt để pull mã nguồn từ GitHub.

- **Node.js** và **Maven**: Không bắt buộc trên máy cục bộ (vì chạy trong container), nhưng cần nếu bạn muốn kiểm tra dependencies cục bộ.

## Chuẩn bị

1. **Clone dự án từ GitHub**:

  ```bash
  git clone <repository-url>
  cd aivideocreator
  ```

2. **Pull mã nguồn mới nhất** (nếu cần):

  ```bash
  git pull origin <branch>
  ```

3. **Kiểm tra tệp môi trường**:

  - Copy tệp `.env.example` thành `.env` trong thư mục chính và chỉnh sửa thông tin kết nối tùy thích.
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

2. **Kiểm tra trạng thái**:

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

  - Đảm bảo dùng `docker-compose.dev.yml` và container chạy `npm run dev`.
  - Kiểm tra quyền truy cập thư mục `frontend` trên máy chủ.

- **Backend API không cập nhật**:

  - Đảm bảo dùng `docker-compose.dev.yml` và container chạy `mvn spring-boot:run`.
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