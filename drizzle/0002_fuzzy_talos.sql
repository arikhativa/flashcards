CREATE TABLE `card_table` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`side_a` text DEFAULT '',
	`side_b` text DEFAULT '',
	`comment` text DEFAULT '',
	`knowledge_level` text DEFAULT 'Learning' NOT NULL,
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE `card_tag` (
	`card_id` integer NOT NULL,
	`tag_id` integer NOT NULL,
	FOREIGN KEY (`card_id`) REFERENCES `card_table`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`tag_id`) REFERENCES `tag_table`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `config` (
	`id` integer DEFAULT 1,
	`side_a` text DEFAULT 'A',
	`side_b` text DEFAULT 'B',
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL,
	CONSTRAINT "id_check" CHECK("config"."id" = 1)
);
--> statement-breakpoint
CREATE TABLE `tag_table` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text DEFAULT '',
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL
);
