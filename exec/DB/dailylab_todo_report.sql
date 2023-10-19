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
-- Table structure for table `todo_report`
--

DROP TABLE IF EXISTS `todo_report`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `todo_report` (
  `todo_report_id` bigint NOT NULL AUTO_INCREMENT,
  `category_id` bigint DEFAULT NULL,
  `fail_count` bigint DEFAULT NULL,
  `first_recommend_date` date DEFAULT NULL,
  `last_recommend_date` date DEFAULT NULL,
  `success_count` bigint DEFAULT NULL,
  `member_id` bigint DEFAULT NULL,
  PRIMARY KEY (`todo_report_id`),
  KEY `FKp0hia6nrsp9ioi3geiy44m2om` (`member_id`),
  CONSTRAINT `FKp0hia6nrsp9ioi3geiy44m2om` FOREIGN KEY (`member_id`) REFERENCES `member` (`member_id`)
) ENGINE=InnoDB AUTO_INCREMENT=432 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `todo_report`
--

LOCK TABLES `todo_report` WRITE;
/*!40000 ALTER TABLE `todo_report` DISABLE KEYS */;
INSERT INTO `todo_report` VALUES (1,168,2,'2023-09-20','2023-10-02',3,2),(2,204,0,'2023-09-20','2023-09-20',1,2),(3,70,0,'2023-09-20','2023-09-20',1,2),(4,26,0,'2023-09-20','2023-10-03',4,2),(5,235,1,'2023-09-20','2023-09-20',0,2),(6,7,0,'2023-09-16','2023-09-16',1,4),(7,204,0,'2023-09-18','2023-09-18',1,4),(8,235,0,'2023-09-19','2023-09-19',2,4),(9,168,0,'2023-09-17','2023-09-17',1,4),(10,147,0,'2023-09-20','2023-09-20',1,4),(11,1,1,'2023-09-21','2023-09-30',1,2),(12,94,2,'2023-09-21','2023-09-28',0,2),(13,167,0,'2023-09-21','2023-09-21',1,2),(14,125,0,'2023-09-21','2023-09-21',1,2),(15,128,1,'2023-09-21','2023-09-21',0,2),(16,285,10,'2023-09-21','2023-09-21',0,4),(17,7,0,'2023-09-20','2023-09-20',1,14),(18,168,0,'2023-09-20','2023-09-20',1,14),(19,179,0,'2023-09-20','2023-09-20',1,14),(20,75,1,'2023-09-21','2023-09-26',2,14),(21,143,0,'2023-09-21','2023-09-21',2,14),(22,181,0,'2023-09-21','2023-09-21',2,14),(31,47,14,'2023-09-24','2023-09-24',0,4),(32,31,18,'2023-09-24','2023-09-29',0,4),(33,28,14,'2023-09-24','2023-09-24',0,4),(34,275,56,'2023-09-24','2023-10-01',1,4),(35,276,64,'2023-09-24','2023-10-03',0,4),(36,136,44,'2023-09-24','2023-10-02',1,4),(37,239,43,'2023-09-24','2023-09-25',0,4),(38,30,60,'2023-09-24','2023-09-29',0,4),(39,29,56,'2023-09-24','2023-10-01',1,4),(40,30,0,'2023-09-25','2023-09-25',1,2),(41,54,1,'2023-09-25','2023-09-25',0,2),(42,224,0,'2023-09-25','2023-09-25',1,2),(88,222,1,'2023-09-25','2023-09-25',0,17),(89,31,1,'2023-09-25','2023-09-25',0,17),(90,244,1,'2023-09-25','2023-09-25',0,17),(91,79,1,'2023-09-25','2023-10-02',1,17),(92,276,1,'2023-09-25','2023-09-25',0,17),(93,75,1,'2023-09-25','2023-09-25',0,17),(94,78,1,'2023-09-25','2023-10-02',1,17),(95,85,1,'2023-09-25','2023-09-25',0,17),(121,146,1,'2023-09-25','2023-09-25',0,4),(122,10,14,'2023-09-25','2023-09-25',0,4),(123,281,3,'2023-09-25','2023-09-25',0,4),(124,244,5,'2023-09-25','2023-10-03',0,4),(125,217,10,'2023-09-25','2023-09-25',0,4),(126,219,10,'2023-09-25','2023-09-25',0,4),(127,235,2,'2023-09-26','2023-09-26',0,14),(128,204,1,'2023-09-26','2023-09-26',1,14),(129,153,1,'2023-09-26','2023-09-26',0,14),(130,88,1,'2023-09-26','2023-09-26',0,14),(131,75,1,'2023-09-26','2023-09-26',0,4),(132,131,1,'2023-09-26','2023-09-26',0,4),(133,119,1,'2023-09-26','2023-09-26',0,4),(134,144,1,'2023-09-26','2023-09-26',0,4),(135,277,6,'2023-09-26','2023-10-02',1,4),(136,218,6,'2023-09-26','2023-10-02',1,4),(137,220,3,'2023-09-26','2023-10-03',1,4),(138,11,5,'2023-09-26','2023-09-29',0,4),(139,277,1,'2023-09-26','2023-10-02',23,3),(140,217,0,'2023-09-26','2023-09-26',1,3),(141,276,21,'2023-09-26','2023-10-02',2,3),(142,244,1,'2023-09-26','2023-10-02',23,3),(143,31,1,'2023-09-26','2023-09-26',0,3),(144,243,1,'2023-09-26','2023-09-26',0,3),(145,222,2,'2023-09-26','2023-10-02',22,3),(146,221,0,'2023-09-26','2023-09-26',1,3),(159,199,1,'2023-09-27','2023-09-27',0,14),(161,169,1,'2023-09-27','2023-09-27',0,14),(164,1,1,'2023-09-27','2023-09-27',0,14),(165,11,1,'2023-09-27','2023-09-27',0,14),(166,12,1,'2023-09-27','2023-09-27',0,14),(167,250,1,'2023-09-27','2023-09-27',0,14),(168,263,1,'2023-09-27','2023-09-27',0,14),(169,218,3,'2023-09-27','2023-10-01',1,14),(170,145,2,'2023-09-27','2023-09-29',0,14),(171,13,4,'2023-09-27','2023-09-29',0,4),(172,223,5,'2023-09-27','2023-10-02',1,4),(173,278,1,'2023-09-27','2023-09-27',0,3),(174,218,23,'2023-09-27','2023-10-02',0,3),(175,245,0,'2023-09-27','2023-10-02',2,3),(176,32,1,'2023-09-27','2023-09-27',0,3),(177,223,0,'2023-09-27','2023-09-27',1,3),(178,128,22,'2023-09-28','2023-10-02',0,3),(179,1,1,'2023-09-28','2023-09-28',20,3),(180,11,1,'2023-09-28','2023-09-28',0,3),(181,122,3,'2023-09-28','2023-10-02',2,2),(182,169,3,'2023-09-28','2023-10-03',8,2),(183,245,3,'2023-09-28','2023-10-02',1,2),(184,99,1,'2023-09-28','2023-09-28',0,2),(185,218,2,'2023-09-28','2023-09-29',0,2),(186,276,1,'2023-09-28','2023-09-29',1,2),(187,93,2,'2023-09-28','2023-09-30',0,2),(188,278,0,'2023-09-29','2023-09-29',1,15),(189,218,0,'2023-09-29','2023-09-29',1,15),(190,277,1,'2023-09-29','2023-09-29',0,15),(191,32,0,'2023-09-29','2023-09-29',1,15),(192,244,1,'2023-09-29','2023-09-29',0,15),(193,223,0,'2023-09-29','2023-09-29',1,15),(194,156,0,'2023-09-29','2023-09-29',1,15),(203,243,2,'2023-09-29','2023-10-02',4,2),(204,182,0,'2023-09-29','2023-09-29',2,2),(205,278,2,'2023-09-29','2023-10-02',4,40),(206,218,2,'2023-09-29','2023-10-02',4,40),(207,277,2,'2023-09-29','2023-10-02',4,40),(208,245,2,'2023-09-29','2023-10-02',4,40),(209,32,1,'2023-09-29','2023-09-29',0,40),(210,244,2,'2023-09-29','2023-10-02',4,40),(211,223,1,'2023-09-29','2023-10-03',1,40),(212,222,1,'2023-09-29','2023-10-02',4,40),(213,278,2,'2023-09-29','2023-10-02',2,10),(214,218,2,'2023-09-29','2023-10-02',1,10),(215,277,2,'2023-09-29','2023-10-02',1,10),(216,245,2,'2023-09-29','2023-10-02',2,10),(217,32,1,'2023-09-29','2023-09-29',0,10),(218,244,2,'2023-09-29','2023-10-02',2,10),(219,223,1,'2023-09-29','2023-09-29',0,10),(220,222,1,'2023-09-29','2023-10-03',1,10),(221,220,5,'2023-09-29','2023-10-01',1,14),(222,95,1,'2023-09-29','2023-10-02',1,14),(223,99,2,'2023-09-29','2023-10-02',0,14),(224,276,0,'2023-09-29','2023-09-30',2,14),(225,273,0,'2023-09-29','2023-09-29',1,14),(226,282,1,'2023-09-29','2023-10-01',2,14),(227,280,1,'2023-09-29','2023-09-29',0,14),(228,94,2,'2023-09-29','2023-10-02',0,14),(264,12,1,'2023-09-29','2023-09-29',0,5),(265,13,1,'2023-09-29','2023-09-29',0,5),(284,278,1,'2023-09-29','2023-10-02',2,42),(285,218,1,'2023-09-29','2023-09-29',0,42),(287,277,1,'2023-09-29','2023-10-02',2,42),(290,245,1,'2023-09-29','2023-10-02',2,42),(292,32,1,'2023-09-29','2023-09-29',0,42),(294,244,1,'2023-09-29','2023-10-02',2,42),(297,223,1,'2023-09-29','2023-10-04',9,42),(299,222,1,'2023-09-29','2023-10-03',9,42),(302,83,1,'2023-09-30','2023-09-30',0,2),(303,84,2,'2023-09-30','2023-10-02',0,2),(304,85,2,'2023-09-30','2023-10-02',1,2),(305,145,2,'2023-09-30','2023-09-30',0,2),(307,156,1,'2023-09-30','2023-09-30',0,14),(308,151,2,'2023-09-30','2023-10-01',1,14),(309,276,0,'2023-09-30','2023-10-02',3,10),(310,128,2,'2023-09-30','2023-10-01',1,14),(311,244,2,'2023-09-30','2023-10-01',1,14),(312,139,0,'2023-09-30','2023-09-30',1,10),(313,32,3,'2023-10-01','2023-10-03',0,4),(314,128,1,'2023-10-01','2023-10-03',1,4),(315,245,0,'2023-10-01','2023-10-01',1,4),(316,17,0,'2023-10-01','2023-10-01',1,4),(317,279,1,'2023-10-01','2023-10-03',1,4),(318,122,0,'2023-10-01','2023-10-01',1,4),(319,190,0,'2023-10-01','2023-10-02',7,2),(320,82,1,'2023-10-02','2023-10-02',0,2),(321,3,1,'2023-10-02','2023-10-02',0,2),(322,82,1,'2023-10-01','2023-10-01',0,49),(323,10,1,'2023-10-01','2023-10-01',0,43),(324,209,0,'2023-10-01','2023-10-01',1,49),(325,30,1,'2023-10-01','2023-10-01',0,43),(326,56,0,'2023-10-01','2023-10-01',1,49),(327,117,1,'2023-10-01','2023-10-01',0,43),(328,93,1,'2023-10-01','2023-10-01',0,5),(329,161,0,'2023-10-01','2023-10-01',1,49),(330,95,1,'2023-10-01','2023-10-01',0,43),(331,80,1,'2023-10-01','2023-10-03',1,5),(332,109,0,'2023-10-01','2023-10-01',1,49),(333,42,1,'2023-10-01','2023-10-01',0,43),(334,43,1,'2023-10-01','2023-10-01',0,5),(335,111,1,'2023-10-01','2023-10-01',0,43),(336,228,0,'2023-10-01','2023-10-01',1,49),(337,82,2,'2023-10-01','2023-10-03',0,5),(338,4,1,'2023-10-01','2023-10-01',0,43),(339,13,1,'2023-10-01','2023-10-01',0,49),(340,107,1,'2023-10-01','2023-10-01',0,5),(341,170,0,'2023-10-01','2023-10-01',1,43),(342,99,2,'2023-10-01','2023-10-03',0,5),(343,76,2,'2023-10-01','2023-10-03',0,5),(344,4,0,'2023-10-01','2023-10-01',1,40),(352,128,1,'2023-10-02','2023-10-03',4,40),(353,100,0,'2023-10-02','2023-10-02',1,47),(354,78,0,'2023-10-02','2023-10-02',1,47),(355,191,1,'2023-10-02','2023-10-02',0,47),(356,53,0,'2023-10-02','2023-10-02',1,47),(357,30,0,'2023-10-02','2023-10-02',1,47),(358,41,0,'2023-10-02','2023-10-02',1,47),(359,79,1,'2023-10-02','2023-10-02',0,47),(360,41,0,'2023-10-02','2023-10-02',1,17),(361,99,0,'2023-10-02','2023-10-02',1,17),(362,86,0,'2023-10-02','2023-10-02',1,17),(363,76,0,'2023-10-02','2023-10-02',1,17),(364,80,0,'2023-10-02','2023-10-02',1,17),(365,281,0,'2023-10-02','2023-10-02',1,17),(366,128,0,'2023-10-02','2023-10-02',1,10),(372,151,0,'2023-10-02','2023-10-02',1,5),(373,276,0,'2023-10-02','2023-10-02',2,42),(374,139,4,'2023-10-02','2023-10-03',7,42),(375,31,2,'2023-10-02','2023-10-02',0,42),(376,128,11,'2023-10-03','2023-10-04',7,42),(377,220,10,'2023-10-03','2023-10-04',8,42),(378,282,0,'2023-10-03','2023-10-03',8,42),(379,281,0,'2023-10-03','2023-10-03',9,42),(380,129,9,'2023-10-03','2023-10-04',5,42),(381,41,1,'2023-10-02','2023-10-02',0,49),(382,105,1,'2023-10-02','2023-10-02',0,49),(383,174,1,'2023-10-02','2023-10-02',0,49),(384,107,1,'2023-10-02','2023-10-02',0,14),(385,123,1,'2023-10-02','2023-10-02',0,14),(386,122,1,'2023-10-02','2023-10-02',0,14),(387,25,1,'2023-10-02','2023-10-02',0,14),(388,5,0,'2023-10-03','2023-10-03',1,2),(389,86,0,'2023-10-03','2023-10-03',1,5),(390,79,1,'2023-10-03','2023-10-03',0,5),(391,78,0,'2023-10-03','2023-10-03',1,5),(392,275,0,'2023-10-04','2023-10-04',9,42),(393,279,0,'2023-10-04','2023-10-04',9,42),(394,202,2,'2023-10-03','2023-10-03',0,2),(395,167,0,'2023-10-03','2023-10-03',1,51),(396,26,0,'2023-10-03','2023-10-03',1,51),(397,220,0,'2023-10-03','2023-10-03',1,10),(398,100,1,'2023-10-03','2023-10-03',0,4),(399,282,0,'2023-10-03','2023-10-03',1,10),(400,281,1,'2023-10-03','2023-10-03',0,10),(401,139,0,'2023-10-03','2023-10-03',1,40),(402,129,1,'2023-10-03','2023-10-03',0,10),(403,220,0,'2023-10-03','2023-10-03',1,40),(404,282,0,'2023-10-03','2023-10-03',1,40),(405,281,0,'2023-10-03','2023-10-03',1,40),(406,129,1,'2023-10-03','2023-10-03',0,40),(407,47,1,'2023-10-03','2023-10-03',0,40),(408,69,1,'2023-10-03','2023-10-03',0,40),(409,63,1,'2023-10-03','2023-10-03',0,40),(410,272,2,'2023-10-04','2023-10-04',0,52),(411,48,1,'2023-10-04','2023-10-04',0,50),(412,235,0,'2023-10-04','2023-10-04',1,50),(413,280,1,'2023-10-04','2023-10-04',0,50),(414,187,1,'2023-10-04','2023-10-04',0,50),(415,263,1,'2023-10-04','2023-10-04',0,50),(416,35,1,'2023-10-04','2023-10-04',0,50),(417,245,1,'2023-10-04','2023-10-04',0,53),(418,192,0,'2023-10-04','2023-10-04',1,53),(419,123,1,'2023-10-04','2023-10-04',0,53),(420,179,0,'2023-10-04','2023-10-04',1,53),(421,61,1,'2023-10-04','2023-10-04',0,53),(422,110,1,'2023-10-04','2023-10-04',0,53),(423,222,0,'2023-10-04','2023-10-04',1,57),(424,28,0,'2023-10-04','2023-10-04',1,57),(425,196,0,'2023-10-04','2023-10-04',1,56),(426,5,1,'2023-10-04','2023-10-04',0,49),(427,55,1,'2023-10-04','2023-10-04',1,49),(428,188,1,'2023-10-04','2023-10-04',3,49),(429,123,0,'2023-10-04','2023-10-04',4,49),(430,281,0,'2023-10-04','2023-10-04',2,49),(431,169,0,'2023-10-04','2023-10-04',2,49);
/*!40000 ALTER TABLE `todo_report` ENABLE KEYS */;
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
