CREATE TABLE `lab`.`person` (
  `personId` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  `lastName` VARCHAR(45) NOT NULL,
  `birthDate` TIMESTAMP NULL,
  `email` VARCHAR(95) NOT NULL,
  `studentId` INT NOT NULL,
  `grade` INT NOT NULL,
  `salary` INT NULL,
  PRIMARY KEY (`personId`),
  UNIQUE INDEX `email_UNIQUE` (`email` ASC) VISIBLE,
  UNIQUE INDEX `studentId_UNIQUE` (`studentId` ASC) VISIBLE);
