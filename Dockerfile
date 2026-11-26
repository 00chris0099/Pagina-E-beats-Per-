FROM nginx:alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY index.html config.js robots.txt sitemap.xml llms.txt favicon.ico google0fba4ef6d49804d8.html /usr/share/nginx/html/
COPY assets/ /usr/share/nginx/html/assets/
COPY pages/ /usr/share/nginx/html/pages/
EXPOSE 80
