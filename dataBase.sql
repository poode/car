CREATE TABLE `users` (
	`id` INT NOT NULL AUTO_INCREMENT,
	`username` VARCHAR(255) NOT NULL,
	`email` VARCHAR(255),
	`password` VARCHAR(255) NOT NULL,
	`mobile` VARCHAR(255) NOT NULL UNIQUE,
	`verified` BOOLEAN NOT NULL DEFAULT false,
	`createdAt` DATETIME,
	`updatedAt` DATETIME,
	PRIMARY KEY (`id`,`mobile`)
);

CREATE TABLE `LT_carTypes` (
	`id` INT NOT NULL AUTO_INCREMENT,
	`carType` VARCHAR(255) NOT NULL UNIQUE,
	`createdAt` BINARY,
	`updatedAt` BINARY,
	PRIMARY KEY (`id`)
);

CREATE TABLE `LT_serviceTypes` (
	`id` INT NOT NULL AUTO_INCREMENT,
	`serviceType` VARCHAR(255) NOT NULL UNIQUE,
	`servicePrice` INT NOT NULL,
	`estimatedTime` DATETIME NOT NULL,
	`createdAt` DATETIME,
	`updatedAt` DATETIME,
	PRIMARY KEY (`id`)
);

CREATE TABLE `contactUs` (
	`id` INT NOT NULL AUTO_INCREMENT,
	`contactUsReasonType_id` INT NOT NULL,
	`body` TEXT NOT NULL,
	`imageOrVideo` VARCHAR(255),
	`user_id` INT NOT NULL,
	`createdAt` DATETIME,
	`updatedAt` DATETIME,
	PRIMARY KEY (`id`)
);

CREATE TABLE `LT_contactUsReasonTypes` (
	`id` INT NOT NULL AUTO_INCREMENT,
	`reasonType` VARCHAR(255) NOT NULL UNIQUE,
	`createdAt` DATETIME,
	`updatedAt` DATETIME,
	PRIMARY KEY (`id`)
);

CREATE TABLE `orders` (
	`id` INT NOT NULL AUTO_INCREMENT,
	`user_id` INT NOT NULL,
	`carType_id` INT NOT NULL,
	`serviceType_id` INT NOT NULL,
	`startTime` DATETIME,
	`arrivingTime` DATETIME,
	`endTime` DATETIME,
	`employee_id` INT,
	`endOrderReasonType_id` INT,
	`createdAt` DATETIME,
	`updatedAt` DATETIME,
	PRIMARY KEY (`id`)
);

CREATE TABLE `LT_endOrderReasonTypes` (
	`id` INT NOT NULL AUTO_INCREMENT,
	`endOrderReason` VARCHAR(255) NOT NULL,
	`createdAt` DATETIME,
	`updatedAt` DATETIME,
	PRIMARY KEY (`id`)
);

CREATE TABLE `employeeAttendance` (
	`id` INT NOT NULL AUTO_INCREMENT,
	`employee_id` INT NOT NULL,
	`attendanceTime` DATETIME NOT NULL,
	`LeavingTime` DATETIME NOT NULL,
	`createdAt` DATETIME,
	`updatedAt` DATETIME,
	PRIMARY KEY (`id`)
);

CREATE TABLE `evaluations` (
	`id` INT NOT NULL AUTO_INCREMENT,
	`order_id` INT NOT NULL,
	`stars` INT NOT NULL DEFAULT '1',
	`createdAt` DATETIME,
	`updatedAt` DATETIME,
	PRIMARY KEY (`id`)
);

CREATE TABLE `LT_permissionTypes` (
	`id` INT NOT NULL AUTO_INCREMENT,
	`permissionType` VARCHAR(255) NOT NULL UNIQUE,
	`createdAt` DATETIME,
	`updatedAt` DATETIME,
	PRIMARY KEY (`id`)
);

CREATE TABLE `userRoles` (
	`id` INT NOT NULL AUTO_INCREMENT,
	`user_id` INT NOT NULL,
	`roleType_id` INT NOT NULL,
	`createdAt` DATETIME,
	`updatedAt` DATETIME,
	PRIMARY KEY (`id`)
);

CREATE TABLE `LT_roleTypes` (
	`id` INT NOT NULL AUTO_INCREMENT,
	`roleType` VARCHAR(255) NOT NULL UNIQUE,
	`createdAt` DATETIME,
	`updatedAt` DATETIME,
	PRIMARY KEY (`id`)
);

CREATE TABLE `rolePermissions` (
	`id` INT NOT NULL AUTO_INCREMENT,
	`roleType_id` INT NOT NULL,
	`permission_id` INT NOT NULL,
	`createdAt` DATETIME,
	`updatedAt` DATETIME,
	PRIMARY KEY (`id`)
);

ALTER TABLE `contactUs` ADD CONSTRAINT `contactUs_fk0` FOREIGN KEY (`contactUsReasonType_id`) REFERENCES `LT_contactUsReasonTypes`(`id`);

ALTER TABLE `contactUs` ADD CONSTRAINT `contactUs_fk1` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`);

ALTER TABLE `orders` ADD CONSTRAINT `orders_fk0` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`);

ALTER TABLE `orders` ADD CONSTRAINT `orders_fk1` FOREIGN KEY (`carType_id`) REFERENCES `LT_carTypes`(`id`);

ALTER TABLE `orders` ADD CONSTRAINT `orders_fk2` FOREIGN KEY (`serviceType_id`) REFERENCES `LT_serviceTypes`(`id`);

ALTER TABLE `orders` ADD CONSTRAINT `orders_fk3` FOREIGN KEY (`employee_id`) REFERENCES `users`(`id`);

ALTER TABLE `orders` ADD CONSTRAINT `orders_fk4` FOREIGN KEY (`endOrderReasonType_id`) REFERENCES `LT_endOrderReasonTypes`(`id`);

ALTER TABLE `employeeAttendance` ADD CONSTRAINT `employeeAttendance_fk0` FOREIGN KEY (`employee_id`) REFERENCES `users`(`id`);

ALTER TABLE `evaluations` ADD CONSTRAINT `evaluations_fk0` FOREIGN KEY (`order_id`) REFERENCES `orders`(`id`);

ALTER TABLE `userRoles` ADD CONSTRAINT `userRoles_fk0` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`);

ALTER TABLE `userRoles` ADD CONSTRAINT `userRoles_fk1` FOREIGN KEY (`roleType_id`) REFERENCES `LT_roleTypes`(`id`);

ALTER TABLE `rolePermissions` ADD CONSTRAINT `rolePermissions_fk0` FOREIGN KEY (`roleType_id`) REFERENCES `LT_roleTypes`(`id`);

ALTER TABLE `rolePermissions` ADD CONSTRAINT `rolePermissions_fk1` FOREIGN KEY (`permission_id`) REFERENCES `LT_permissionTypes`(`id`);
