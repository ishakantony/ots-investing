CREATE TABLE IF NOT EXISTS "sectors" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	CONSTRAINT "sectors_name_unique" UNIQUE("name")
);
