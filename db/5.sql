ALTER TABLE `lab`.`person` 
ADD COLUMN `classId` INT NULL AFTER `salary`,
ADD COLUMN `companyId` INT NULL AFTER `classId`,
ADD INDEX `person_class_idx` (`classId` ASC) VISIBLE,
ADD INDEX `person_company_idx` (`companyId` ASC) VISIBLE;
;
ALTER TABLE `lab`.`person` 
ADD CONSTRAINT `person_class`
  FOREIGN KEY (`classId`)
  REFERENCES `lab`.`class` (`classId`)
  ON DELETE NO ACTION
  ON UPDATE NO ACTION,
ADD CONSTRAINT `person_company`
  FOREIGN KEY (`companyId`)
  REFERENCES `lab`.`company` (`companyId`)
  ON DELETE NO ACTION
  ON UPDATE NO ACTION;
