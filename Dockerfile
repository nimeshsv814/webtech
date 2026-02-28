FROM nginx
WORKDIR /usr/share/nginx/html
COPY . /usr/share/nginx/html
EXPOSE 84
ENTRYPOINT ["nginx","-g","daemon off;"]