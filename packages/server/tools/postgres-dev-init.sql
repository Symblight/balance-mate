CREATE USER balance with encrypted password 'balance';
ALTER role balance superuser;

CREATE DATABASE db_balance;

GRANT ALL PRIVILEGES ON DATABASE db_balance TO balance;
