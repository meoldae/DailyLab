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
-- Table structure for table `emotion_aggregate`
--

DROP TABLE IF EXISTS `emotion_aggregate`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `emotion_aggregate` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `date` date NOT NULL,
  `age_id` int NOT NULL,
  `gender` varchar(255) NOT NULL,
  `moved_count` bigint NOT NULL DEFAULT '0',
  `anger_count` bigint NOT NULL DEFAULT '0',
  `absurd_count` bigint NOT NULL DEFAULT '0',
  `joy_count` bigint NOT NULL DEFAULT '0',
  `happy_count` bigint NOT NULL DEFAULT '0',
  `proud_count` bigint NOT NULL DEFAULT '0',
  `excited_count` bigint NOT NULL DEFAULT '0',
  `thankful_count` bigint NOT NULL DEFAULT '0',
  `comfort_count` bigint NOT NULL DEFAULT '0',
  `stuffy_count` bigint NOT NULL DEFAULT '0',
  `depression_count` bigint NOT NULL DEFAULT '0',
  `sad_count` bigint NOT NULL DEFAULT '0',
  `panic_count` bigint NOT NULL DEFAULT '0',
  `annoy_count` bigint NOT NULL DEFAULT '0',
  `tired_count` bigint NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=53 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `emotion_aggregate`
--

LOCK TABLES `emotion_aggregate` WRITE;
/*!40000 ALTER TABLE `emotion_aggregate` DISABLE KEYS */;
INSERT INTO `emotion_aggregate` VALUES (7,'2023-09-26',2,'M',123,49,93,42,62,54,29,34,25,51,168,28,27,58,96),(8,'2023-09-26',4,'M',18,6,1,2,1,5,14,7,1,0,0,11,0,4,10),(9,'2023-09-26',2,'F',30,22,296,132,73,15,36,21,131,63,26,24,42,26,22),(10,'2023-09-25',2,'F',0,0,7,0,0,1,3,2,2,3,4,2,2,3,3),(11,'2023-09-27',2,'M',15,25,5,38,13,9,4,9,29,47,13,2,77,26,6),(12,'2023-09-27',2,'F',0,0,17,6,9,0,0,0,1,4,0,0,0,0,1),(13,'2023-09-27',0,'M',0,0,4,5,2,0,0,2,0,1,0,0,4,13,2),(14,'2023-09-28',2,'M',1,11,17,3,2,1,3,12,14,30,1,0,4,4,34),(15,'2023-09-28',2,'F',0,2,8,3,0,2,2,0,5,4,6,0,3,0,3),(16,'2023-08-22',2,'M',84,5,20,0,44,0,6,7,1,2,136,0,0,2,80),(17,'2023-08-16',2,'M',0,2,10,2,2,0,0,8,13,30,0,0,2,4,34),(18,'2023-08-28',2,'M',84,5,20,0,44,0,6,7,1,2,136,0,0,2,80),(19,'2023-08-10',2,'M',12,6,21,20,15,10,15,14,20,8,12,10,17,15,14),(20,'2023-08-02',2,'M',0,2,10,2,2,0,0,8,13,30,0,0,2,4,34),(21,'2023-08-20',2,'M',12,1,0,0,0,14,12,5,4,1,0,0,0,0,0),(25,'2023-09-22',2,'M',3,0,0,0,0,0,0,0,0,0,0,19,5,1,0),(32,'2023-09-20',2,'M',12,1,0,0,0,14,12,5,4,1,0,0,0,0,0),(33,'2023-09-20',2,'F',12,6,21,20,15,10,15,14,20,8,12,10,17,15,14),(34,'2023-09-21',2,'M',5,37,16,6,12,8,11,7,10,4,1,2,3,4,8),(35,'2023-09-21',4,'M',18,6,1,2,1,5,14,7,1,0,0,11,0,4,10),(36,'2023-09-21',2,'F',24,25,276,114,61,5,21,14,113,59,14,17,28,14,8),(37,'2023-09-22',2,'M',3,0,0,0,0,0,0,0,0,0,0,19,5,1,0),(38,'2023-09-23',2,'F',0,0,7,0,0,1,3,2,2,3,4,2,2,3,3),(39,'2023-09-29',2,'M',2,3,2,7,2,2,3,10,3,3,1,3,5,8,0),(40,'2023-09-29',2,'F',1,3,6,14,14,1,3,2,5,2,0,15,0,1,0),(41,'2023-09-29',0,'M',32,68,20,33,26,42,92,57,79,25,16,24,19,29,32),(42,'2023-09-30',2,'M',21,2,2,23,15,20,15,20,16,4,3,0,0,2,22),(43,'2023-09-30',2,'F',8,19,15,11,11,9,7,11,20,5,5,3,21,2,3),(44,'2023-09-30',0,'M',6,6,5,1,2,1,3,0,1,1,2,1,0,1,0),(45,'2023-10-01',2,'M',15,9,28,28,19,11,15,36,22,7,5,7,9,6,12),(46,'2023-10-01',2,'F',0,15,27,23,13,3,8,3,1,29,0,0,0,0,5),(47,'2023-10-01',0,'M',13,6,1,1,0,3,6,8,14,0,0,0,0,0,0),(48,'2023-10-02',2,'M',52,14,7,12,12,16,17,25,22,21,2,3,11,9,5),(49,'2023-10-02',2,'F',24,2,15,23,35,2,3,0,2,11,1,1,0,2,1),(50,'2023-10-03',2,'M',24,5,5,8,49,36,26,15,12,14,11,6,11,14,6),(51,'2023-10-03',2,'F',22,6,30,23,12,10,4,16,6,45,0,0,2,0,17),(52,'2023-10-03',0,'M',1,0,1,5,6,1,3,0,1,6,1,1,0,1,1);
/*!40000 ALTER TABLE `emotion_aggregate` ENABLE KEYS */;
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

-- Dump completed on 2023-10-04 17:48:59
