CREATE TABLE `users` (
	`id` INT NOT NULL AUTO_INCREMENT,
	`username` VARCHAR(255) NOT NULL,
	`email` VARCHAR(255),
	`password` VARCHAR(255) NOT NULL,
	`mobile` VARCHAR(255) NOT NULL UNIQUE,
	`verified` BOOLEAN NOT NULL DEFAULT false,
	`resetPassword` BOOLEAN NOT NULL DEFAULT false,
	`verification` INT NOT NULL DEFAULT '0',
	`createdAt` DATETIME,
	`updatedAt` DATETIME,
	PRIMARY KEY (`id`,`mobile`)
);

CREATE TABLE `LTCarTypes` (
	`id` INT NOT NULL AUTO_INCREMENT,
	`carType` VARCHAR(255) NOT NULL UNIQUE,
	`createdAt` BINARY,
	`updatedAt` BINARY,
	PRIMARY KEY (`id`)
);

CREATE TABLE `LTServiceTypes` (
	`id` INT NOT NULL AUTO_INCREMENT,
	`serviceType` VARCHAR(255) NOT NULL UNIQUE,
	`servicePrice` INT NOT NULL,
	`estimatedTime` Time NOT NULL,
	`createdAt` DATETIME,
	`updatedAt` DATETIME,
	PRIMARY KEY (`id`)
);

CREATE TABLE `contactUs` (
	`id` INT NOT NULL AUTO_INCREMENT,
	`contactUsReasonTypeId` INT NOT NULL,
	`body` TEXT NOT NULL,
	`imageOrVideoPath` VARCHAR(255),
	`userId` INT NOT NULL,
	`status` BOOLEAN NOT NULL DEFAULT false,
	`createdAt` DATETIME,
	`updatedAt` DATETIME,
	PRIMARY KEY (`id`)
);

CREATE TABLE `LTContactUsReasonTypes` (
	`id` INT NOT NULL AUTO_INCREMENT,
	`reasonType` VARCHAR(255) NOT NULL UNIQUE,
	`createdAt` DATETIME,
	`updatedAt` DATETIME,
	PRIMARY KEY (`id`)
);

CREATE TABLE `orders` (
	`id` INT NOT NULL AUTO_INCREMENT,
	`userId` INT NOT NULL,
	`carTypeId` INT NOT NULL,
	`serviceTypeId` INT NOT NULL,
	`location` VARCHAR(255) NOT NULL,
	`startTime` DATETIME,
	`arrivingTime` DATETIME,
	`endTime` DATETIME,
	`employeeId` INT,
	`endOrderReasonTypeId` INT,
	`createdAt` DATETIME,
	`updatedAt` DATETIME,
	PRIMARY KEY (`id`)
);

CREATE TABLE `LTEndOrderReasonTypes` (
	`id` INT NOT NULL AUTO_INCREMENT,
	`endOrderReason` VARCHAR(255) NOT NULL,
	`createdAt` DATETIME,
	`updatedAt` DATETIME,
	PRIMARY KEY (`id`)
);

CREATE TABLE `employeeAttendance` (
	`id` INT NOT NULL AUTO_INCREMENT,
	`employeeId` INT NOT NULL,
	`attendanceTime` DATETIME NOT NULL,
	`LeavingTime` DATETIME NOT NULL,
	`createdAt` DATETIME,
	`updatedAt` DATETIME,
	PRIMARY KEY (`id`)
);

CREATE TABLE `evaluations` (
	`id` INT NOT NULL AUTO_INCREMENT,
	`orderId` INT NOT NULL,
	`stars` INT NOT NULL DEFAULT '1',
	`createdAt` DATETIME,
	`updatedAt` DATETIME,
	PRIMARY KEY (`id`)
);

CREATE TABLE `LTPermissionTypes` (
	`id` INT NOT NULL AUTO_INCREMENT,
	`permissionType` VARCHAR(255) NOT NULL UNIQUE,
	`createdAt` DATETIME,
	`updatedAt` DATETIME,
	PRIMARY KEY (`id`)
);

CREATE TABLE `userRoles` (
	`id` INT NOT NULL AUTO_INCREMENT,
	`userId` INT NOT NULL,
	`roleTypeId` INT NOT NULL,
	`createdAt` DATETIME,
	`updatedAt` DATETIME,
	PRIMARY KEY (`id`)
);

CREATE TABLE `LTRoleTypes` (
	`id` INT NOT NULL AUTO_INCREMENT,
	`roleType` VARCHAR(255) NOT NULL UNIQUE,
	`createdAt` DATETIME,
	`updatedAt` DATETIME,
	PRIMARY KEY (`id`)
);

CREATE TABLE `rolePermissions` (
	`id` INT NOT NULL AUTO_INCREMENT,
	`roleTypeId` INT NOT NULL,
	`permissionId` INT NOT NULL,
	`createdAt` DATETIME,
	`updatedAt` DATETIME,
	PRIMARY KEY (`id`)
);

ALTER TABLE `contactUs` ADD CONSTRAINT `contactUs_fk0` FOREIGN KEY (`contactUsReasonTypeId`) REFERENCES `LTContactUsReasonTypes`(`id`);

ALTER TABLE `contactUs` ADD CONSTRAINT `contactUs_fk1` FOREIGN KEY (`userId`) REFERENCES `users`(`id`);

ALTER TABLE `orders` ADD CONSTRAINT `orders_fk0` FOREIGN KEY (`userId`) REFERENCES `users`(`id`);

ALTER TABLE `orders` ADD CONSTRAINT `orders_fk1` FOREIGN KEY (`carTypeId`) REFERENCES `LTCarTypes`(`id`);

ALTER TABLE `orders` ADD CONSTRAINT `orders_fk2` FOREIGN KEY (`serviceTypeId`) REFERENCES `LTServiceTypes`(`id`);

ALTER TABLE `orders` ADD CONSTRAINT `orders_fk3` FOREIGN KEY (`employeeId`) REFERENCES `users`(`id`);

ALTER TABLE `orders` ADD CONSTRAINT `orders_fk4` FOREIGN KEY (`endOrderReasonTypeId`) REFERENCES `LTEndOrderReasonTypes`(`id`);

ALTER TABLE `employeeAttendance` ADD CONSTRAINT `employeeAttendance_fk0` FOREIGN KEY (`employeeId`) REFERENCES `users`(`id`);

ALTER TABLE `evaluations` ADD CONSTRAINT `evaluations_fk0` FOREIGN KEY (`orderId`) REFERENCES `orders`(`id`);

ALTER TABLE `userRoles` ADD CONSTRAINT `userRoles_fk0` FOREIGN KEY (`userId`) REFERENCES `users`(`id`);

ALTER TABLE `userRoles` ADD CONSTRAINT `userRoles_fk1` FOREIGN KEY (`roleTypeId`) REFERENCES `LTRoleTypes`(`id`);

ALTER TABLE `rolePermissions` ADD CONSTRAINT `rolePermissions_fk0` FOREIGN KEY (`roleTypeId`) REFERENCES `LTRoleTypes`(`id`);

ALTER TABLE `rolePermissions` ADD CONSTRAINT `rolePermissions_fk1` FOREIGN KEY (`permissionId`) REFERENCES `LTPermissionTypes`(`id`);
