# Sử dụng một image node chính thức cho môi trường build
FROM node:18 AS build

# Thiết lập thư mục làm việc trong container
WORKDIR /app

# Sao chép file package.json và package-lock.json vào container
COPY package*.json ./

# Cài đặt các dependency cần thiết
RUN npm install

# Sao chép mã nguồn của dự án vào container
COPY . .

# Build ứng dụng bằng Vite
RUN npm run build

# Sử dụng một image nginx để chạy ứng dụng frontend trong môi trường production
FROM nginx:alpine AS production

# Copy file build từ bước trước vào thư mục mặc định của NGINX
COPY --from=build /app/dist /usr/share/nginx/html

# Copy cấu hình NGINX vào container (tùy chọn)
# COPY nginx.conf /etc/nginx/nginx.conf

# Expose port 80 để truy cập từ bên ngoài
EXPOSE 80

# Khởi động NGINX
CMD ["nginx", "-g", "daemon off;"]
