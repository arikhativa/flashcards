PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_config` (
	`id` integer DEFAULT 1 NOT NULL,
	`side_a` text DEFAULT 'A' NOT NULL,
	`side_b` text DEFAULT 'B' NOT NULL,
	`card_list_filter` text DEFAULT '{}' NOT NULL,
	`theme` text DEFAULT 'system' NOT NULL,
	`screen_height_without_keyboard` real,
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL,
	CONSTRAINT "id_check" CHECK("__new_config"."id" = 1)
);
--> statement-breakpoint
INSERT INTO `__new_config`("id", "side_a", "side_b", "card_list_filter", "theme", "screen_height_without_keyboard", "created_at", "updated_at") SELECT "id", "side_a", "side_b", "card_list_filter", "theme", "screen_height_without_keyboard", "created_at", "updated_at" FROM `config`;--> statement-breakpoint
DROP TABLE `config`;--> statement-breakpoint
ALTER TABLE `__new_config` RENAME TO `config`;--> statement-breakpoint
PRAGMA foreign_keys=ON;