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
-- Table structure for table `member_hobby`
--

DROP TABLE IF EXISTS `member_hobby`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `member_hobby` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `hobby_id` bigint DEFAULT NULL,
  `member_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKqgt6l199wnvg2940e80wvy1pg` (`hobby_id`),
  KEY `FKdjol3mjn0mynlhesrgl3onnng` (`member_id`),
  CONSTRAINT `FKdjol3mjn0mynlhesrgl3onnng` FOREIGN KEY (`member_id`) REFERENCES `member` (`member_id`),
  CONSTRAINT `FKqgt6l199wnvg2940e80wvy1pg` FOREIGN KEY (`hobby_id`) REFERENCES `hobby` (`hobby_id`)
) ENGINE=InnoDB AUTO_INCREMENT=130 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `member_hobby`
--

LOCK TABLES `member_hobby` WRITE;
/*!40000 ALTER TABLE `member_hobby` DISABLE KEYS */;
INSERT INTO `member_hobby` VALUES (48,6,14),(52,13,14),(53,17,14),(54,12,10),(55,13,10),(56,10,10),(57,32,10),(59,24,10),(60,29,10),(62,12,5),(63,13,5),(68,12,2),(69,13,2),(70,16,2),(71,12,4),(72,13,4),(73,18,4),(74,10,4),(75,27,4),(76,32,4),(77,33,4),(78,10,2),(79,11,2),(80,15,2),(81,17,2),(82,18,2),(83,28,2),(84,29,2),(85,31,2),(86,33,2),(87,10,52),(88,11,52),(89,12,52),(90,13,52),(91,14,52),(92,15,52),(93,16,52),(94,17,52),(95,18,52),(96,19,52),(97,20,52),(98,21,52),(99,22,52),(100,23,52),(101,24,52),(102,27,52),(103,28,52),(104,29,52),(105,26,52),(106,30,52),(108,1,53),(109,10,53),(110,12,53),(111,13,53),(112,14,53),(113,19,53),(114,18,53),(115,21,53),(116,26,53),(117,27,53),(118,28,53),(119,30,53),(120,32,53),(121,10,57),(122,11,57),(123,32,57),(124,26,57),(125,27,57),(126,14,40),(127,23,40),(128,24,40),(129,28,40);
/*!40000 ALTER TABLE `member_hobby` ENABLE KEYS */;
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

-- Dump completed on 2023-10-04 17:49:03
