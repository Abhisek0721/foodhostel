// nginx configuration

server {
        index index.html index.htm index.nginx-debian.html;

        server_name foodhostel.com www.foodhostel.com;

        location / {
                # First attempt to serve request as file, then
                # as directory, then fall back to displaying a 404.
                # try_files $uri $uri/ =404;
                proxy_pass http://localhost:5000;
        }

}
