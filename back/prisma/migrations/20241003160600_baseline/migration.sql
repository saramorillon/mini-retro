-- CreateTable
CREATE TABLE `ticket` (
    `id` CHAR(36) NOT NULL,
    `boardId` VARCHAR(191) NOT NULL,
    `author` VARCHAR(191) NOT NULL,
    `content` LONGTEXT NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
