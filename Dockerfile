FROM sebp/lighttpd

# Create app directory
RUN mkdir -p /var/www/localhost/htdocs
WORKDIR /var/www/localhost

# Copy app configurations
COPY lighttpd.conf /etc/lighttpd/lighttpd.conf

# Bundle app source
COPY storybook-static /var/www/localhost/htdocs/
COPY health.html /var/www/localhost/htdocs/health.html

EXPOSE 8100
ENTRYPOINT ["/usr/local/bin/start.sh"]
