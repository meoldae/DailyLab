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
-- Table structure for table `category_black_list`
--

DROP TABLE IF EXISTS `category_black_list`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `category_black_list` (
  `category_id` bigint NOT NULL,
  `member_id` bigint NOT NULL,
  `is_remove` bit(1) NOT NULL,
  PRIMARY KEY (`category_id`,`member_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `category_black_list`
--

LOCK TABLES `category_black_list` WRITE;
/*!40000 ALTER TABLE `category_black_list` DISABLE KEYS */;
INSERT INTO `category_black_list` VALUES (4,57,_binary '\0'),(5,2,_binary '\0'),(7,14,_binary '\0'),(11,3,_binary '\0'),(18,40,_binary '\0'),(33,14,_binary ''),(47,14,_binary '\0'),(51,56,_binary '\0'),(54,56,_binary '\0'),(62,56,_binary '\0'),(65,57,_binary '\0'),(76,2,_binary '\0'),(78,2,_binary '\0'),(79,2,_binary '\0'),(83,2,_binary '\0'),(84,2,_binary '\0'),(84,56,_binary '\0'),(86,2,_binary '\0'),(93,2,_binary '\0'),(99,2,_binary '\0'),(100,2,_binary '\0'),(108,14,_binary '\0'),(113,56,_binary '\0'),(114,2,_binary ''),(128,10,_binary '\0'),(141,14,_binary '\0'),(152,2,_binary '\0'),(153,2,_binary '\0'),(185,53,_binary '\0'),(190,2,_binary ''),(205,56,_binary '\0'),(218,42,_binary '\0'),(223,10,_binary '\0'),(245,15,_binary '\0'),(276,2,_binary '\0'),(276,14,_binary '\0'),(276,40,_binary '\0'),(277,2,_binary '\0'),(282,2,_binary '\0'),(282,42,_binary '\0'),(288,40,_binary '\0');
/*!40000 ALTER TABLE `category_black_list` ENABLE KEYS */;
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

-- Dump completed on 2023-10-04 17:49:02
