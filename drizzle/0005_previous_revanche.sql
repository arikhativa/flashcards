PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_card_table` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`side_a` text DEFAULT '',
	`side_b` text DEFAULT '',
	`comment` text DEFAULT '',
	`knowledge_level` text DEFAULT 'Learning' NOT NULL,
	`created_at1` integer DEFAULT ( (strftime('%s', 'now')) ) NOT NULL,
	`updated_at` integer NOT NULL
);
--> statement-breakpoint
INSERT INTO `__new_card_table`("id", "side_a", "side_b", "comment", "knowledge_level", "created_at1", "updated_at") SELECT "id", "side_a", "side_b", "comment", "knowledge_level", "created_at1", "updated_at" FROM `card_table`;--> statement-breakpoint
DROP TABLE `card_table`;--> statement-breakpoint
ALTER TABLE `__new_card_table` RENAME TO `card_table`;--> statement-breakpoint
PRAGMA foreign_keys=ON;