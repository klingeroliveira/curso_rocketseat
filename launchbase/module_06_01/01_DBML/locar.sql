CREATE TABLE "customer" (
  "id" SERIAL PRIMARY KEY,
  "name" text,
  "tipo" boolean,
  "cpf_cnpj" integer,
  "endereco" text,
  "telefone" text
);

CREATE TABLE "agencies" (
  "id" SERIAL PRIMARY KEY,
  "name" text,
  "telefone" text,
  "url_logo" text
);

CREATE TABLE "addresses" (
  "id" SERIAL PRIMARY KEY,
  "id_agencies" integer,
  "logradouro" text,
  "numero" text,
  "bairro" text,
  "id_cidade" integer
);

CREATE TABLE "cars" (
  "id" SERIAL PRIMARY KEY,
  "id_modelo" integer,
  "cor" text,
  "placa" text,
  "num_documento" text
);

CREATE TABLE "models" (
  "id" SERIAL PRIMARY KEY,
  "marca" text,
  "modelo" text,
  "ano_fabricacao" integer,
  "ano_modelo" integer
);

CREATE TABLE "orders" (
  "id" SERIAL PRIMARY KEY,
  "id_customer" integer,
  "id_agencies" integer,
  "data_locacao" timestamp,
  "data_devolucao" timestamp,
  "valor" integer
);

CREATE TABLE "orders_cars" (
  "id_order" integer,
  "id_car" integer,
  PRIMARY KEY ("id_order", "id_car")
);

ALTER TABLE "addresses" ADD FOREIGN KEY ("id_agencies") REFERENCES "agencies" ("id");

ALTER TABLE "cars" ADD FOREIGN KEY ("id_modelo") REFERENCES "models" ("id");

ALTER TABLE "orders" ADD FOREIGN KEY ("id_customer") REFERENCES "customer" ("id");

ALTER TABLE "orders" ADD FOREIGN KEY ("id_agencies") REFERENCES "agencies" ("id");

ALTER TABLE "orders_cars" ADD FOREIGN KEY ("id_order") REFERENCES "orders" ("id");

ALTER TABLE "orders_cars" ADD FOREIGN KEY ("id_car") REFERENCES "cars" ("id");

