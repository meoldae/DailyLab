-- MySQL dump 10.13  Distrib 8.0.33, for Win64 (x86_64)
--
-- Host: dailylab-db.cuvkk1xkflwb.ap-northeast-2.rds.amazonaws.com    Database: dailylab
-- ------------------------------------------------------
-- Server version	8.0.33

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
SET @MYSQLDUMP_TEMP_LOG_BIN = @@SESSION.SQL_LOG_BIN;
SET @@SESSION.SQL_LOG_BIN= 0;

--
-- GTID state at the beginning of the backup 
--

SET @@GLOBAL.GTID_PURGED=/*!80000 '+'*/ '';

--
-- Table structure for table `member_status`
--

DROP TABLE IF EXISTS `member_status`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `member_status` (
  `member_status_id` bigint NOT NULL AUTO_INCREMENT,
  `date` date DEFAULT NULL,
  `member_id` bigint DEFAULT NULL,
  `status` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`member_status_id`)
) ENGINE=InnoDB AUTO_INCREMENT=158 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `member_status`
--

LOCK TABLES `member_status` WRITE;
/*!40000 ALTER TABLE `member_status` DISABLE KEYS */;
INSERT INTO `member_status` VALUES (1,'2023-09-21',2,'finish'),(6,'2023-09-22',2,'finish'),(11,'2023-09-21',10,'finish'),(12,'2023-09-22',10,'finish'),(13,'2023-09-22',14,'proceed'),(14,'2023-09-24',17,'proceed'),(15,'2023-09-25',10,'complete'),(17,'2023-09-25',3,'finish'),(18,'2023-09-26',3,'proceed'),(20,'2023-09-26',2,'finish'),(21,'2023-09-26',17,'finish'),(22,'2023-09-26',14,'complete'),(23,'2023-09-26',10,'wait'),(24,'2023-09-25',17,'complete'),(25,'2023-09-26',12,'proceed'),(26,'2023-09-26',38,'finish'),(27,'2023-09-26',39,'finish'),(28,'2023-09-26',40,'complete'),(29,'2023-09-26',4,'complete'),(30,'2023-09-27',14,'complete'),(31,'2023-09-27',2,'complete'),(32,'2023-09-27',41,'complete'),(33,'2023-09-27',3,'complete'),(34,'2023-09-27',10,'complete'),(35,'2023-09-27',12,'complete'),(36,'2023-09-27',4,'complete'),(37,'2023-09-27',40,'finish'),(38,'2023-09-27',17,'complete'),(39,'2023-09-28',14,'complete'),(43,'2023-09-28',3,'proceed'),(44,'2023-09-28',40,'complete'),(45,'2023-09-28',2,'finish'),(46,'2023-09-28',5,'complete'),(48,'2023-09-29',14,'finish'),(49,'2023-09-29',40,'finish'),(50,'2023-09-29',15,'proceed'),(53,'2023-09-29',10,'finish'),(55,'2023-09-29',2,'complete'),(56,'2023-09-29',3,'proceed'),(57,'2023-09-29',5,'finish'),(58,'2023-09-29',4,'finish'),(59,'2023-09-29',42,'complete'),(60,'2023-09-30',2,'finish'),(61,'2023-09-30',14,'finish'),(62,'2023-09-30',15,'proceed'),(63,'2023-09-30',42,'finish'),(64,'2023-09-30',40,'finish'),(65,'2023-09-30',10,'finish'),(66,'2023-10-01',42,'finish'),(67,'2023-10-01',2,'finish'),(68,'2023-10-01',3,'finish'),(69,'2023-10-01',10,'finish'),(70,'2023-10-01',14,'finish'),(71,'2023-10-01',43,'complete'),(72,'2023-10-01',40,'finish'),(73,'2023-10-01',4,'wait'),(74,'2023-10-01',5,'complete'),(76,'2023-10-01',46,'finish'),(77,'2023-10-01',47,'complete'),(79,'2023-10-01',49,'finish'),(82,'2023-10-02',5,'finish'),(83,'2023-10-02',4,'finish'),(98,'2023-10-02',10,'finish'),(111,'2023-10-02',47,'wait'),(114,'2023-10-02',42,'complete'),(115,'2023-10-02',3,'finish'),(123,'2023-10-02',2,'finish'),(125,'2023-10-02',40,'finish'),(126,'2023-10-02',17,'finish'),(127,'2023-10-02',14,'complete'),(129,'2023-10-03',5,'finish'),(132,'2023-10-03',10,'finish'),(133,'2023-10-03',4,'complete'),(136,'2023-10-03',40,'finish'),(137,'2023-10-02',49,'complete'),(139,'2023-10-03',42,'finish'),(140,'2023-10-03',2,'finish'),(142,'2023-10-03',51,'complete'),(143,'2023-10-04',42,'proceed'),(144,'2023-10-04',2,'proceed'),(145,'2023-10-04',3,'proceed'),(146,'2023-10-04',14,'proceed'),(150,'2023-10-04',54,'proceed'),(151,'2023-10-04',55,'proceed'),(152,'2023-10-04',53,'finish'),(153,'2023-10-04',50,'finish'),(154,'2023-10-04',56,'finish'),(155,'2023-10-04',57,'finish'),(156,'2023-10-04',40,'proceed'),(157,'2023-10-04',49,'proceed');
/*!40000 ALTER TABLE `member_status` ENABLE KEYS */;
UNLOCK TABLES;
SET @@SESSION.SQL_LOG_BIN = @MYSQLDUMP_TEMP_LOG_BIN;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-10-04 17:49:12
