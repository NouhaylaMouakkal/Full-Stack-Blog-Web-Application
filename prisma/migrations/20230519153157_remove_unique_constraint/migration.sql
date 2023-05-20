-- DropForeignKey
ALTER TABLE `comment` DROP FOREIGN KEY `Comment_articleId_fkey`;

-- DropIndex
DROP INDEX `Category_nom_key` ON `category`;

-- AddForeignKey
ALTER TABLE `Comment` ADD CONSTRAINT `Comment_articleId_fkey` FOREIGN KEY (`articleId`) REFERENCES `Article`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
