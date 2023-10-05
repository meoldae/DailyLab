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
-- Table structure for table `mbti`
--

DROP TABLE IF EXISTS `mbti`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `mbti` (
  `mbti_id` bigint NOT NULL AUTO_INCREMENT,
  `typea` int DEFAULT '0',
  `typeb` int DEFAULT '0',
  `typec` int DEFAULT '0',
  `typed` int DEFAULT '0',
  PRIMARY KEY (`mbti_id`)
) ENGINE=InnoDB AUTO_INCREMENT=82 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `mbti`
--

LOCK TABLES `mbti` WRITE;
/*!40000 ALTER TABLE `mbti` DISABLE KEYS */;
INSERT INTO `mbti` VALUES (1,0,0,0,0),(2,0,0,0,1),(3,0,0,0,2),(4,0,0,1,0),(5,0,0,1,1),(6,0,0,1,2),(7,0,0,2,0),(8,0,0,2,1),(9,0,0,2,2),(10,0,1,0,0),(11,0,1,0,1),(12,0,1,0,2),(13,0,1,1,0),(14,0,1,1,1),(15,0,1,1,2),(16,0,1,2,0),(17,0,1,2,1),(18,0,1,2,2),(19,0,2,0,0),(20,0,2,0,1),(21,0,2,0,2),(22,0,2,1,0),(23,0,2,1,1),(24,0,2,1,2),(25,0,2,2,0),(26,0,2,2,1),(27,0,2,2,2),(28,1,0,0,0),(29,1,0,0,1),(30,1,0,0,2),(31,1,0,1,0),(32,1,0,1,1),(33,1,0,1,2),(34,1,0,2,0),(35,1,0,2,1),(36,1,0,2,2),(37,1,1,0,0),(38,1,1,0,1),(39,1,1,0,2),(40,1,1,1,0),(41,1,1,1,1),(42,1,1,1,2),(43,1,1,2,0),(44,1,1,2,1),(45,1,1,2,2),(46,1,2,0,0),(47,1,2,0,1),(48,1,2,0,2),(49,1,2,1,0),(50,1,2,1,1),(51,1,2,1,2),(52,1,2,2,0),(53,1,2,2,1),(54,1,2,2,2),(55,2,0,0,0),(56,2,0,0,1),(57,2,0,0,2),(58,2,0,1,0),(59,2,0,1,1),(60,2,0,1,2),(61,2,0,2,0),(62,2,0,2,1),(63,2,0,2,2),(64,2,1,0,0),(65,2,1,0,1),(66,2,1,0,2),(67,2,1,1,0),(68,2,1,1,1),(69,2,1,1,2),(70,2,1,2,0),(71,2,1,2,1),(72,2,1,2,2),(73,2,2,0,0),(74,2,2,0,1),(75,2,2,0,2),(76,2,2,1,0),(77,2,2,1,1),(78,2,2,1,2),(79,2,2,2,0),(80,2,2,2,1),(81,2,2,2,2);
/*!40000 ALTER TABLE `mbti` ENABLE KEYS */;
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

-- Dump completed on 2023-10-04 17:49:13
