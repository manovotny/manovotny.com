CREATE TABLE "bookmarks" (
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"deleted_at" timestamp with time zone,
	"description" text,
	"domain" text NOT NULL,
	"favorite" boolean DEFAULT false NOT NULL,
	"http_status" integer,
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"image" text,
	"last_checked_at" timestamp with time zone,
	"normalized_url" text NOT NULL,
	"processed_at" timestamp with time zone,
	"tags" text[] DEFAULT '{}'::text[] NOT NULL,
	"title" text,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	"url" text NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX "idx_bookmarks_normalized_url" ON "bookmarks" USING btree ("normalized_url");--> statement-breakpoint
CREATE INDEX "idx_bookmarks_tags" ON "bookmarks" USING gin ("tags");--> statement-breakpoint
CREATE INDEX "idx_bookmarks_created_at" ON "bookmarks" USING btree ("created_at" DESC NULLS LAST);