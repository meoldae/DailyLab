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
-- Table structure for table `taste`
--

DROP TABLE IF EXISTS `taste`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `taste` (
  `id` bigint NOT NULL,
  `taste_name` varchar(45) NOT NULL,
  `description` varchar(500) NOT NULL,
  `img_src` varchar(45) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `taste`
--

LOCK TABLES `taste` WRITE;
/*!40000 ALTER TABLE `taste` DISABLE KEYS */;
INSERT INTO `taste` VALUES (1,'딸기 파르페 맛','파르페는 프랑스어로 완전한이라는 의미를 가졌어요. 다양한 과자와 견과류, 과일과 생크림이 조화를 이루는 간식이에요. 오늘 하루도 조화롭게 보내길 바라요!','sweet_01'),(2,'탕후루 맛','중국어로 단단하게 굳은 설탕 표주박이라는 의미로 과일에 설탕시럽을 발라 굳혀먹는 간식이에요. 13세기 문헌에 고급 간식으로 등장할 정도로 오래된 간식이랍니다.','sweet_03'),(3,'마카롱 맛','프랑스를 대표하는 디저트에요. 프랑스의 국왕이었던 루이 14세의 결혼식에서도 제공되었을 정도로 고급 간식이랍니다. 과거에는 간식이 아니라 하나의 요리로 여겨졌다고 해요.','sweet_02'),(4,'레몬 소르베 맛','소르베는 과즙과 과일 퓌레, 과실주등을 얼려서 만든 간식이에요. 프랑스에서는 유제품이 조금이라도 들어가면 소르베로 인정되지 않을정도로 엄격한 간식이랍니다. 주로 입맛을 새롭게 하기 위한 목적으로 내놓는 요리에요. 산뜻하게 새 하루를 시작해보세요!','sour_01'),(5,'유자차 맛','유자청을 물에 희석해서 먹는 우리나라의 전통 차에요. 유자의 상큼한 향과 새콤한 맛이 내일을 톡톡 튀게 만들어 줄 거에요!','sour_03'),(6,'정전기 맛','오늘은 정전기처럼 따끔한 하루를 보내셨네요.하지만 정전기도 종종 예기치 못한 놀라움을 안겨주듯, 당신의 내일은 예측할 수 없는 놀라움이 기다리고 있을거에요!','sour_02'),(7,'감자튀김 맛','감자튀김은 남녀노소 좋아하는 음식이에요. 슈스트링, 웨지, 크링클, 해쉬브라운 등 다양한 형태가 있답니다. 어떤 종류의 감자튀김을 선택하든, 그 바삭함과 포슬포슬함은 입맛을 사로잡을거에요. 당신의 하루처럼요!','salty_01'),(8,'프레첼 맛','프레첼은 매듭 모양으로 만든 독일식 빵이에요. 그 독특한 모양과 바삭한 표면은 누구나 한 번 먹어보면 중독될 만큼 매력적이에요. 콕콕 박혀있는 소금 알갱이처럼 일상에 작은 즐거움을 더해줄 거예요!','salty_03'),(9,'히말라야 핑크소금 맛','2억 년 전 히말라야 산맥이 바다였을 때의 바닷물이 증발해 광물로 남았어요. 풍부한 미네랄을 지니고 있는 히말라야 핑크 소금은 당신의 하루를 맛있게, 또 건강하게 만들어줄 거에요!','salty_02'),(10,'진지 떡볶이 맛','떡볶이는 어묵, 채소, 떡, 고추장 등의 양념을 넣어 볶은 우리나라의 대표적인 길거리 음식이에요! 떡볶이의 매콤한 맛과 떡의 쫄깃한 식감이 하루의 피로와 스트레스를 모두 날려줄거에요!','spicy_01'),(11,'마라탕 맛','쓰촨 러산에서 유래한 중국의 음식으로, 쓰촨 지역의 음식답게 향이 강하고 매운 맛이 특징이죠. 마라(麻辣)라는 얼얼한 맛을 내는 중국 향신료를 이용해 만들어져요! 마라탕을 먹으면 내일의 일상을 한층 화끈하게 만들어 줄 거예요!','spicy_02'),(12,'청양고추 맛','청양고추는 우리나라에서 재배되는 고추 중 가장 매운 고추 품종 중의 하나에요. 그 매운맛과 알싸함은 당신의 내일을 매콤하게 만들어 줄 거에요!','spicy_03'),(13,'짝사랑 맛','오늘은 짝사랑하듯 씁쓸한 하루를 보내셨네요. 하지만 내일은 새로운 시작과 기회가 기다리고 있을 거에요. 더 밝고 긍정적으로 새로운 일들을 마주한다면 좋은 하루를 보낼 수 있을거에요!','bitter_02'),(14,'홍삼 맛','인삼을 푹 찌고 말리면 색이 붉게 변하는데 이것을 홍삼이라고 해요.  매우 쓴 맛을 가지고 있지만 사포닌이 풍부해요. 씁쓸한 하루를 보냈더라도, 알고보면 당신의 하루를 건강하게 만들었을지도 모른답니다!','bitter_01'),(15,'에스프레소 맛','곱게 갈린 원두에 물을 투과시켜 추출한 커피에요! 처음 마시는 사람에게는 엄청 쓰다고 느껴지겠지만, 이를 즐기는 사람에게는 쓴 맛 속에서도 그 풍부한 커피 향을 느낄 수 있죠. 당신의 하루를 음미하면 풍요로운 향을 느낄 수 있을거에요.','bitter_03');
/*!40000 ALTER TABLE `taste` ENABLE KEYS */;
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
