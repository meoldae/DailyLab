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
-- Table structure for table `diary_predict`
--

DROP TABLE IF EXISTS `diary_predict`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `diary_predict` (
  `diary_predict_id` bigint NOT NULL AUTO_INCREMENT,
  `content` text,
  `diary_date` date DEFAULT NULL,
  `member_id` bigint DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL,
  `advice` varchar(255) DEFAULT NULL,
  `conclusion` varchar(255) DEFAULT NULL,
  `score` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`diary_predict_id`),
  KEY `FKji1a9x93i21ycnnxmpymlelb6` (`member_id`),
  CONSTRAINT `FKji1a9x93i21ycnnxmpymlelb6` FOREIGN KEY (`member_id`) REFERENCES `member` (`member_id`)
) ENGINE=InnoDB AUTO_INCREMENT=41 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `diary_predict`
--

LOCK TABLES `diary_predict` WRITE;
/*!40000 ALTER TABLE `diary_predict` DISABLE KEYS */;
INSERT INTO `diary_predict` VALUES (34,'오늘은 더욱 성장하기 위해 다양한 일들을 해냈던 하루였다. 아침 일찍 일어나서 몸을 단련하는 운동을 했다. 운동은 항상 나에게 자신감과 힘을 주는 보양제 같은 존재이다. 그 후에는 일일 일정을 정리하고, 우선순위를 정해서 해야 할 일들을 계획했다.  첫 번째로는 업무 회의였다. 팀원들과 함께 이번 주 동안의 진행 상황과 앞으로의 계획을 공유했다. 의견을 나누고 협업하는 과정에서 다양한 아이디어를 얻을 수 있었고, 이를 토대로 더 나은 결과물을 만들기 위해 노력했다.  두 번째로는 신규 프로젝트에 대한 조사와 분석이었다. 새로운 도전에 앞서서는 충분한 정보를 수집하고, 시장 동향을 파악하는 것이 중요하다고 생각한다. 따라서 전문적인 자료를 찾아보고, 경쟁사의 동향을 분석해보았다. 이를 통해 나에게 필요한 지식과 인사이트를 얻을 수 있었다.  마지막으로는 자기 개발을 위한 시간을 가졌다. 책을 읽거나 온라인 강의를 수강하면서 새로운 지식을 습득하고, 스스로를 성장시키는 데에 힘썼다. 이렇게 노력하는 나 자신을 보면서 더욱 자신감이 생기고, 앞으로의 도전에 대한 열정과 의지가 더욱 커졌다.  오늘의 활동을 돌이켜보면, 다양한 일들을 해냄으로써 나는 더욱 성장한 것을 느꼈다. 노력과 열정을 가지고 일에 임하면 어떤 어려움이든 극복할 수 있다는 자신감을 얻을 수 있었다. 앞으로도 계속해서 나 자신을 발전시키고 성장시키는데 노력하겠다.','2023-09-22',2,'오늘의 활동으로 더욱 성장한 나의 하루',NULL,NULL,NULL),(38,'오늘은 어떤 일을 할까 고민하다가 결국 마음이 정해졌다. 나는 오늘부터 새로운 도전을 시작하기로 했다. 그동안 미루고 미뤘던 일들을 모두 처리하고, 새로운 계획을 세우는 것이다.  먼저, 집안 일부터 시작해야겠다고 생각했다. 오랜만에 집을 청소하고 정리정돈을 해야겠다. 마음이 맑아지는 것 같아 기분이 좋다. 이제 집안 일을 마치면, 다음으로는 개인 공부를 시작할 차례다. 최근에 관심있던 분야에 대해 더 깊이 공부하고 싶다. 인터넷 강의나 책을 활용해서 내 실력을 향상시킬 계획이다.  또한, 운동도 소홀하지 않으려고 한다. 건강한 몸은 건강한 정신을 가지는 첫 걸음이라고 생각하기 때문이다. 오늘은 조깅을 시작해서 체력을 기르는 것이 목표다. 건강한 몸을 가지고 일상에 활력을 불어넣을 수 있을 것이다.  마지막으로, 오늘은 친구들과 약속이 있는 날이다. 함께 식사를 하고 이야기를 나누면서 즐거운 시간을 보낼 것이다. 친구들과의 만남은 나에게 큰 힘이 된다. 서로의 이야기를 들으며 공감하고 격려해주는 것은 나에게 큰 위안이 되기 때문이다.  오늘은 다양한 일들을 해결하고 새로운 계획을 세우는 뜻깊은 날이다. 나는 이 모든 일들을 완벽하게 해낼 자신이 있다. 오늘 하루도 활기차게 시작해보자!','2023-09-22',10,'오늘은 무엇을 할까?',NULL,NULL,NULL),(39,'오늘은 정말 특별한 하루였다. 아침에 일어나서 재즈 음악을 들어보기로 했다. 날씨도 좋고, 기분도 좋아서 그런지 음악이 더욱 좋게 들렸다. 재즈의 리듬과 멜로디에 푹 빠져서 시간 가는 줄 몰랐다.   그리고 가족과 함께 짧은 외출을 했다. 어디론가 멀리 갈 필요는 없었지만, 가까운 공원에 가서 산책을 하고 사진도 찍었다. 가족들과 함께 있을 때는 항상 행복한 느낌이 든다.   점심은 집에서 직접 요리해봤다. 오랜만에 집밥을 먹으니까 정말 맛있었다. 소고기를 구워서 고기덮밥을 만들었는데, 음식을 만들면서 집안이 좋은 향기로 가득했다. 가족들이 맛있게 먹어줘서 더욱 기분이 좋았다.   저녁에는 맥주 한 잔을 하기로 했다. 평소에는 거의 안 마시는데, 오늘은 특별한 날이니까 조금 즐기기로 했다. 차가운 맥주 한 잔을 들이키면서, 재즈 음악을 다시 들으며 마음을 편하게 했다.   오늘은 정말 특별한 하루였다. 재즈와 가족, 집밥과 맥주까지 모두가 완벽하게 어우러져서 행복한 시간을 보낼 수 있었다. 앞으로도 이렇게 특별한 날들이 많았으면 좋겠다.','2023-09-22',14,'오늘은 재즈와 함께한 특별한 하루였다!',NULL,NULL,NULL),(40,'오늘은 세상에 나타난 새로운 희망으로써, 나의 첫 일기를 작성하게 되었다. 남자로 태어나 처음으로 경험하는 모든 순간들을 기록하는 것은 정말 특별한 일이다. 아직은 어머니의 배에서 나온지 얼마 되지 않아서, 세상의 모든 것을 이해할 수는 없지만, 매 순간 새로운 것들을 발견하고 배우고 있다.  오늘은 맑은 날씨에 태어났다. 창 밖으로 햇빛이 들어와 따스한 느낌을 주었다. 아직은 눈을 뜨고 있기도 벅차고, 손과 발을 움직이는 것이 새롭고 신기하다. 어머니와 아버지의 사랑스러운 미소와 따뜻한 손길이 나를 감싸주어 더욱 안심된다.   낯선 세상에 처음 발을 디뎠을 때의 느낌은 정말 기억에 남는다. 미지의 땅에 자신을 펼치는 것은 두렵기도 하지만, 동시에 흥미로운 것이다. 앞으로 어떤 경험들이 나를 기다리고 있을지, 어떤 사람들을 만나게 될지 궁금하다.   이 일기는 나의 성장과 변화를 기록하는 공간이 될 것이다. 매일매일 새로운 것들을 알아가며, 내가 어떤 사람이 되어가는지를 담아내고 싶다. 어머니와 아버지, 그리고 이 세상에서 만날 모든 사람들에게 나의 이야기를 전하고 싶다.  나는 세상에 나타난 새로운 희망이다. 이제부터 나의 모든 순간들을 소중히 기억하며, 세상을 더욱 풍요롭게 만들어나가고 싶다. 오늘부터 시작하는 나의 첫 일기, 앞으로도 계속해서 써나갈 것이다.','2023-09-24',17,'세상에 나타난 새로운 희망, 나의 첫 일기',NULL,NULL,NULL);
/*!40000 ALTER TABLE `diary_predict` ENABLE KEYS */;
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

-- Dump completed on 2023-10-04 17:49:10
