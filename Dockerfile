FROM nginx:alpine

# Copy nginx config for project
COPY default.conf /etc/nginx/conf.d/default.conf

# Mount project files directory
ADD . /usr/share/nginx/html/
