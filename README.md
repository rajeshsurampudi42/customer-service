# customer-service

prerequisite

1) postgres.
you can download from https://www.postgresql.org/download/windows/

  port should be 5432
  
  connect to db using "psql -h localhost -d customers -U postgres -p 5432"
 
2) npm run all
npm i npm-run-all -g




Usage
1) run npm install
2) npm start
3) to add new migrations run "npm run db:migrate:create -- <<your migration patch name>> --sql-file"
