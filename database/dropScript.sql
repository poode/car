ALTER TABLE `contactUs` DROP FOREIGN KEY `contactUs_fk0`;

ALTER TABLE `contactUs` DROP FOREIGN KEY `contactUs_fk1`;

ALTER TABLE `orders` DROP FOREIGN KEY `orders_fk0`;

ALTER TABLE `orders` DROP FOREIGN KEY `orders_fk1`;

ALTER TABLE `orders` DROP FOREIGN KEY `orders_fk2`;

ALTER TABLE `orders` DROP FOREIGN KEY `orders_fk3`;

ALTER TABLE `orders` DROP FOREIGN KEY `orders_fk4`;

ALTER TABLE `employeeAttendance` DROP FOREIGN KEY `employeeAttendance_fk0`;

ALTER TABLE `evaluations` DROP FOREIGN KEY `evaluations_fk0`;

ALTER TABLE `userRoles` DROP FOREIGN KEY `userRoles_fk0`;

ALTER TABLE `userRoles` DROP FOREIGN KEY `userRoles_fk1`;

ALTER TABLE `rolePermissions` DROP FOREIGN KEY `rolePermissions_fk0`;

ALTER TABLE `rolePermissions` DROP FOREIGN KEY `rolePermissions_fk1`;

DROP TABLE IF EXISTS `users`;

DROP TABLE IF EXISTS `LT_carTypes`;

DROP TABLE IF EXISTS `LT_serviceTypes`;

DROP TABLE IF EXISTS `contactUs`;

DROP TABLE IF EXISTS `LT_contactUsReasonTypes`;

DROP TABLE IF EXISTS `orders`;

DROP TABLE IF EXISTS `LT_endOrderReasonTypes`;

DROP TABLE IF EXISTS `employeeAttendance`;

DROP TABLE IF EXISTS `evaluations`;

DROP TABLE IF EXISTS `LT_permissionTypes`;

DROP TABLE IF EXISTS `userRoles`;

DROP TABLE IF EXISTS `LT_roleTypes`;

DROP TABLE IF EXISTS `rolePermissions`;

DROP TABLE IF EXISTS `wrokingTime`;
