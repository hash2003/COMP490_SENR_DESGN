-- MySQL dump 10.13  Distrib 8.0.38, for macos14 (x86_64)
--
-- Host: localhost    Database: matadorboard
-- ------------------------------------------------------
-- Server version	9.0.1

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

--
-- Table structure for table `boards`
--

DROP TABLE IF EXISTS `boards`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `boards` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `name` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `boards_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `boards`
--

LOCK TABLES `boards` WRITE;
/*!40000 ALTER TABLE `boards` DISABLE KEYS */;
INSERT INTO `boards` VALUES (20,1,'New Column','2025-04-08 00:55:34');
/*!40000 ALTER TABLE `boards` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `columns`
--

DROP TABLE IF EXISTS `columns`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `columns` (
  `id` int NOT NULL AUTO_INCREMENT,
  `board_id` int DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `board_id` (`board_id`),
  CONSTRAINT `columns_ibfk_1` FOREIGN KEY (`board_id`) REFERENCES `group_boards` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=37 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `columns`
--

LOCK TABLES `columns` WRITE;
/*!40000 ALTER TABLE `columns` DISABLE KEYS */;
INSERT INTO `columns` VALUES (1,2,'test'),(14,2,'New Column'),(15,2,'New Column'),(16,2,'New Column'),(17,2,'New Column'),(18,2,'New Column'),(19,2,'New Column'),(20,1,'New Column'),(21,1,'New Column'),(22,1,'New Column'),(23,1,'New Column'),(24,7,'twat'),(25,7,'test'),(26,8,'hello'),(27,8,'test'),(28,9,'test'),(29,10,'test'),(30,10,'test2'),(31,11,'tesy'),(32,11,'tesy'),(33,12,'test'),(34,12,'test1'),(35,4,'d'),(36,4,'ds');
/*!40000 ALTER TABLE `columns` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `documents`
--

DROP TABLE IF EXISTS `documents`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `documents` (
  `id` int NOT NULL AUTO_INCREMENT,
  `sender_id` int DEFAULT NULL,
  `recipient_id` int DEFAULT NULL,
  `file_path` varchar(255) DEFAULT NULL,
  `status` enum('Pending','Approved','Rejected') DEFAULT NULL,
  `upload_date` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `user_id` int NOT NULL,
  `recipient_email` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `documents`
--

LOCK TABLES `documents` WRITE;
/*!40000 ALTER TABLE `documents` DISABLE KEYS */;
INSERT INTO `documents` VALUES (21,NULL,NULL,'uploads/9465c41427ba8e9fc6b262c05958fd91','Pending','2025-04-10 01:06:25',1,'admin@csun.edu'),(22,NULL,NULL,'uploads/2b635a56a8c4a005bbf4ddbace8cb495','Pending','2025-04-10 01:43:49',1,'admin@csun.edu'),(23,NULL,NULL,'uploads/8cd1747eb3c6e3f399f2b7afab808e98','Pending','2025-04-10 02:49:43',1,'admin@csun.edu');
/*!40000 ALTER TABLE `documents` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `group_board_users`
--

DROP TABLE IF EXISTS `group_board_users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `group_board_users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `board_id` int DEFAULT NULL,
  `user_id` int DEFAULT NULL,
  `permission` enum('viewer','editor') NOT NULL,
  PRIMARY KEY (`id`),
  KEY `board_id` (`board_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `group_board_users_ibfk_1` FOREIGN KEY (`board_id`) REFERENCES `group_boards` (`id`),
  CONSTRAINT `group_board_users_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `group_board_users`
--

LOCK TABLES `group_board_users` WRITE;
/*!40000 ALTER TABLE `group_board_users` DISABLE KEYS */;
INSERT INTO `group_board_users` VALUES (1,2,1,'editor'),(2,4,1,'editor'),(3,5,1,'editor'),(4,6,1,'editor'),(5,7,1,'editor'),(6,8,1,'editor'),(7,8,13,'editor'),(8,9,1,'editor'),(9,9,13,'editor'),(10,9,11,'viewer'),(11,10,1,'editor'),(12,10,13,'editor'),(13,11,1,'editor'),(14,11,13,'editor'),(15,12,1,'editor'),(16,12,13,'editor');
/*!40000 ALTER TABLE `group_board_users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `group_boards`
--

DROP TABLE IF EXISTS `group_boards`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `group_boards` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `group_boards_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `group_boards`
--

LOCK TABLES `group_boards` WRITE;
/*!40000 ALTER TABLE `group_boards` DISABLE KEYS */;
INSERT INTO `group_boards` VALUES (1,1,'tests','2025-04-09 17:53:22'),(2,1,'test','2025-04-09 17:55:19'),(3,1,'My Kanban Board','2025-04-09 21:49:52'),(4,1,'My Kanban Board','2025-04-09 21:50:27'),(5,1,'test','2025-04-09 22:08:33'),(6,1,'test','2025-04-09 22:20:17'),(7,1,'test','2025-04-09 22:20:25'),(8,1,'test','2025-04-09 22:30:20'),(9,1,'test9','2025-04-10 00:50:30'),(10,1,'group 1','2025-04-10 01:07:26'),(11,1,'test111','2025-04-10 01:45:16'),(12,1,'comp','2025-04-10 02:50:39');
/*!40000 ALTER TABLE `group_boards` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `invites`
--

DROP TABLE IF EXISTS `invites`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `invites` (
  `id` int NOT NULL AUTO_INCREMENT,
  `board_id` int DEFAULT NULL,
  `invited_email` varchar(255) DEFAULT NULL,
  `role` enum('viewer','editor') DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `invites`
--

LOCK TABLES `invites` WRITE;
/*!40000 ALTER TABLE `invites` DISABLE KEYS */;
INSERT INTO `invites` VALUES (1,2,'admin@csun.edu','editor','2025-04-09 17:55:19');
/*!40000 ALTER TABLE `invites` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tasks`
--

DROP TABLE IF EXISTS `tasks`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tasks` (
  `id` int NOT NULL AUTO_INCREMENT,
  `column_id` int DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL,
  `description` text,
  PRIMARY KEY (`id`),
  KEY `column_id` (`column_id`),
  CONSTRAINT `tasks_ibfk_1` FOREIGN KEY (`column_id`) REFERENCES `columns` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tasks`
--

LOCK TABLES `tasks` WRITE;
/*!40000 ALTER TABLE `tasks` DISABLE KEYS */;
INSERT INTO `tasks` VALUES (1,16,'New Task',NULL),(2,16,'New Task',NULL),(3,20,'New Task',NULL),(4,20,'New Task',NULL);
/*!40000 ALTER TABLE `tasks` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `email` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `role` enum('faculty','user') DEFAULT 'user',
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'jaime.soto.701@my.csun.edu','Jaime Soto','2025-03-24 05:57:03','user'),(2,'behnam.abrams@csun.edu','Behnam Abrams','2025-03-24 06:30:15','faculty'),(3,'ardavan.asef-vaziri@csun.edu','Ardavan Asef-Vaziri','2025-03-24 06:30:15','faculty'),(4,'ali.behnezhad@csun.edu','Ali Behnezhad','2025-03-24 06:30:15','faculty'),(5,'dchoi@csun.edu','Daniel Choi','2025-03-24 06:30:15','faculty'),(10,'jaime@my.csun.edu','Jaime Soto','2025-04-09 17:46:19','user'),(11,'gaby@my.csun.edu','Gaby Aiono','2025-04-09 17:46:19','user'),(12,'professor@csun.edu','Dr. CSUN','2025-04-09 17:46:19','faculty'),(13,'admin@csun.edu','CSUN Admin','2025-04-09 17:46:19','faculty');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-04-14 11:06:17
