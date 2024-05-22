CREATE TABLE IF NOT EXISTS "industries" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	CONSTRAINT "industries_name_unique" UNIQUE("name")
);
