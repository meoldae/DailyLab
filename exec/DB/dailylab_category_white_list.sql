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
-- Table structure for table `category_white_list`
--

DROP TABLE IF EXISTS `category_white_list`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `category_white_list` (
  `category_id` bigint NOT NULL,
  `member_id` bigint NOT NULL,
  PRIMARY KEY (`category_id`,`member_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `category_white_list`
--

LOCK TABLES `category_white_list` WRITE;
/*!40000 ALTER TABLE `category_white_list` DISABLE KEYS */;
INSERT INTO `category_white_list` VALUES (18,14),(18,40),(26,2),(26,51),(27,14),(28,4),(28,57),(45,14),(47,4),(47,14),(47,40),(70,4),(71,14),(81,4),(87,14),(87,40),(96,40),(101,40),(108,14),(119,4),(124,14),(124,40),(125,14),(131,4),(141,14),(144,2),(144,4),(144,14),(145,2),(145,14),(146,4),(156,14),(156,15),(157,14),(157,40),(167,14),(167,40),(167,51),(170,43),(174,2),(174,14),(174,49),(208,14),(217,3),(217,4),(217,10),(217,12),(217,17),(219,4),(243,2),(243,3),(243,10),(243,12),(243,17),(246,14),(265,2),(265,14),(266,14),(272,52),(288,40),(288,49);
/*!40000 ALTER TABLE `category_white_list` ENABLE KEYS */;
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

-- Dump completed on 2023-10-04 17:49:09
