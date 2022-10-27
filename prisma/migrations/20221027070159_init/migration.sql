/*
  Warnings:

  - A unique constraint covering the columns `[email,phone]` on the table `customer` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX `Customer_email_key` ON `customer`;

-- DropIndex
DROP INDEX `Customer_phone_key` ON `customer`;

-- CreateIndex
CREATE UNIQUE INDEX `customer_email_phone_key` ON `customer`(`email`, `phone`);
