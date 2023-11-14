/*
  Warnings:

  - You are about to drop the column `dateStart` on the `task` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `task` DROP COLUMN `dateStart`,
    MODIFY `dateWishEnd` DATE NOT NULL,
    MODIFY `dateEnd` DATE NULL;
