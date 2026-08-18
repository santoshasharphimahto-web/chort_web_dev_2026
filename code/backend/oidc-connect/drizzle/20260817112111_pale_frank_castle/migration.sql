CREATE TABLE "users_table" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
	"first_name" varchar(25) NOT NULL,
	"last_name" varchar(25) NOT NULL,
	"profile_picture" text,
	"email" varchar(322) NOT NULL UNIQUE,
	"email_verified" boolean DEFAULT false NOT NULL,
	"password" varchar(66) NOT NULL,
	"salt" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp
);
