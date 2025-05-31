ALTER TABLE "users_table" RENAME COLUMN "created_at" TO "createdAt";--> statement-breakpoint
ALTER TABLE "users_table" RENAME COLUMN "updated_at" TO "updatedAt";--> statement-breakpoint
ALTER TABLE "posts_table" RENAME COLUMN "user_id" TO "userId";--> statement-breakpoint
ALTER TABLE "posts_table" RENAME COLUMN "created_at" TO "createdAt";--> statement-breakpoint
ALTER TABLE "posts_table" RENAME COLUMN "updated_at" TO "updatedAt";--> statement-breakpoint
ALTER TABLE "posts_table" DROP CONSTRAINT "posts_table_user_id_users_table_id_fk";
--> statement-breakpoint
ALTER TABLE "posts_table" ADD CONSTRAINT "posts_table_userId_users_table_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."users_table"("id") ON DELETE cascade ON UPDATE no action;