CREATE TYPE "public"."order_status" AS ENUM('processing', 'shipped', 'out_for_delivery', 'delivered', 'cancelled');--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "password" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "orders" ADD COLUMN "status" "order_status" DEFAULT 'processing' NOT NULL;