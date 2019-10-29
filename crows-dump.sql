-- MySQL dump 10.13  Distrib 8.0.16, for Win64 (x86_64)
--
-- Host: localhost    Database: card_gang
-- ------------------------------------------------------
-- Server version	8.0.16

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
 SET NAMES utf8 ;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `cards`
--

DROP TABLE IF EXISTS `cards`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `cards` (
  `id` tinyint(3) unsigned NOT NULL AUTO_INCREMENT,
  `card_name` varchar(20) NOT NULL,
  `image` varchar(128) DEFAULT NULL,
  `is_starter` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cards`
--

LOCK TABLES `cards` WRITE;
/*!40000 ALTER TABLE `cards` DISABLE KEYS */;
INSERT INTO `cards` VALUES (1,'Assault',NULL,1),(2,'Threat',NULL,1),(3,'Negotiation',NULL,1),(4,'Deception',NULL,1),(5,'Armed Assault',NULL,1),(6,'Espionage',NULL,1),(7,'Police Corruption',NULL,1),(8,'Italian Alliance',NULL,0),(9,'Jewish Alliance',NULL,0),(10,'Heavy Assault',NULL,0),(11,'Assassination',NULL,0),(12,'Soviet Affiliation',NULL,0),(13,'Crown Allegiance',NULL,0),(14,'Investigation',NULL,1);
/*!40000 ALTER TABLE `cards` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `combinations`
--

DROP TABLE IF EXISTS `combinations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `combinations` (
  `id` smallint(5) unsigned NOT NULL AUTO_INCREMENT,
  `card_id` tinyint(3) unsigned NOT NULL,
  `event_id` tinyint(3) unsigned NOT NULL,
  `description` tinytext,
  PRIMARY KEY (`id`),
  KEY `card_id` (`card_id`),
  KEY `event_id` (`event_id`),
  CONSTRAINT `combinations_ibfk_1` FOREIGN KEY (`card_id`) REFERENCES `cards` (`id`) ON DELETE CASCADE,
  CONSTRAINT `combinations_ibfk_2` FOREIGN KEY (`event_id`) REFERENCES `events` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=141 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `combinations`
--

LOCK TABLES `combinations` WRITE;
/*!40000 ALTER TABLE `combinations` DISABLE KEYS */;
INSERT INTO `combinations` VALUES (99,1,8,'Send a few boys to \'discourage\' further entrepreneurship'),(100,2,8,'Explain what will happen to the dealers if continue conduct their business'),(101,3,8,'Welcome the new dealers'),(102,4,8,'Spread rumors to discredit dealers'),(103,5,8,'Send your boys to kill a few dealers'),(104,6,8,'Send a man to act as a loyal customer for the dealers'),(105,7,8,'Send police patrols to popular snow dealing spots'),(106,8,8,'Ask the Italians to scare off the dealers.'),(107,9,8,'Ask the Jews to temporarily run our drug business.'),(108,10,8,'Setup light machine guns around the dealer spots and take them out. '),(109,11,8,'Hire the assassin to take out the dealers one by one.'),(110,12,8,'Ask the communists to convince workers to stay away from the dealers'),(111,13,8,' Ask for the crown\'s help in exchange for a favor.'),(112,14,8,'Find out the dealers\' strategy'),(113,1,9,'See if our boys can \'persuade\' the reds we got the information from to elaborate more.'),(114,2,9,'Tell the communists you will leak the deal if you don\'t get your fair share.'),(115,3,9,'Offer to provide your protection to the communists during the deal.'),(116,4,9,'Arrive to the deal pretending to be the benefactor with fake guns.'),(117,5,9,'Steal the guns at gunpoint'),(118,6,9,'Send a Russian-speaker to infiltrate the reds and steal the guns from the inside. '),(119,7,9,'See if the police chief has a clue on who the benefactor is'),(120,8,9,'Let the Italians in on the deal and take the guns by force.'),(121,9,9,'Show up to the deal and offer a much better offer to the benefactor.'),(122,10,9,''),(123,11,9,'Send a professional to take care of the benefactor. Pay him extra for the research.'),(124,12,9,'See if the Soviets would be willing to sell the guns to us after the deal.'),(125,13,9,'Let His Majesty\'s people know about the deal.'),(126,14,9,'Dig deeper on the communists\' strategy'),(127,1,10,'Return the favor by sending your boys to their pub.'),(128,2,10,'Threaten war against the mob if they don\'t give us one of their pubs as compensation.'),(129,3,10,'See if we can come to agreement with the Elephant and The Castle.'),(130,4,10,'Announce that the man who was stabbed at the brawl is dead. Demand reparations'),(131,5,10,'Shoot up one of their pubs with the intent to kill a few mobsters.'),(132,6,10,'Send a spy inside the mob to identify the men who trashed the pub and teach them a lesson.'),(133,7,10,'Get the police to lock up a few of their pubs for \'investigation\''),(134,8,10,'Join up with the Italians to declare a war against the mob'),(135,9,10,'Create a compensation program for our men.'),(136,10,10,'Setup a machine gun in front of one of their pubs and riddle it with bullets. Avoid casualties.'),(137,11,10,'Assassinate the leader of the Elephant and The Castle. And make sure it\'s public.'),(138,12,10,'Ask the communists to announce that the man who was stabbed was a devoted Marxist.'),(139,13,10,'Have all business licences belonging to the mob become suddenly invalid.'),(140,14,10,'Figure out the perspective of the Elephant and the Castle boss');
/*!40000 ALTER TABLE `combinations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `effects`
--

DROP TABLE IF EXISTS `effects`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `effects` (
  `id` tinyint(3) unsigned NOT NULL AUTO_INCREMENT,
  `control_variation` tinyint(4) DEFAULT NULL,
  `add_event` tinyint(3) unsigned DEFAULT NULL,
  `remove_event` tinyint(3) unsigned DEFAULT NULL,
  `draw_extra` tinyint(1) DEFAULT NULL,
  `hold_event` tinyint(1) DEFAULT NULL,
  `reveal_hidden` tinyint(1) DEFAULT NULL,
  `add_card` tinyint(3) unsigned DEFAULT NULL,
  `remove_card` tinyint(3) unsigned DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `add_event` (`add_event`),
  KEY `remove_event` (`remove_event`),
  KEY `add_card` (`add_card`),
  KEY `remove_card` (`remove_card`),
  CONSTRAINT `effects_ibfk_1` FOREIGN KEY (`add_event`) REFERENCES `events` (`id`) ON DELETE SET NULL,
  CONSTRAINT `effects_ibfk_2` FOREIGN KEY (`remove_event`) REFERENCES `events` (`id`) ON DELETE SET NULL,
  CONSTRAINT `effects_ibfk_3` FOREIGN KEY (`add_card`) REFERENCES `cards` (`id`) ON DELETE SET NULL,
  CONSTRAINT `effects_ibfk_4` FOREIGN KEY (`remove_card`) REFERENCES `cards` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `effects`
--

LOCK TABLES `effects` WRITE;
/*!40000 ALTER TABLE `effects` DISABLE KEYS */;
INSERT INTO `effects` VALUES (1,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(2,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(3,-1,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(4,-2,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(5,-3,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(6,2,NULL,NULL,1,NULL,NULL,NULL,NULL),(7,1,NULL,NULL,1,NULL,NULL,NULL,NULL),(8,NULL,NULL,NULL,0,1,1,NULL,NULL),(9,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(10,0,NULL,NULL,NULL,1,NULL,NULL,NULL),(11,NULL,NULL,NULL,NULL,NULL,NULL,10,NULL),(12,-1,NULL,NULL,NULL,NULL,NULL,10,NULL),(13,-1,NULL,NULL,1,NULL,NULL,10,NULL),(14,1,NULL,NULL,1,NULL,NULL,10,NULL),(15,NULL,NULL,NULL,1,NULL,NULL,10,NULL),(16,-1,NULL,NULL,NULL,NULL,NULL,NULL,10),(17,2,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(18,-1,NULL,NULL,0,1,NULL,NULL,NULL),(19,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1);
/*!40000 ALTER TABLE `effects` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `events`
--

DROP TABLE IF EXISTS `events`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `events` (
  `id` tinyint(3) unsigned NOT NULL AUTO_INCREMENT,
  `event_name` varchar(20) NOT NULL,
  `event_description` text,
  `is_starter` tinyint(1) DEFAULT '0',
  `hidden_description` varchar(350) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `event_name` (`event_name`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `events`
--

LOCK TABLES `events` WRITE;
/*!40000 ALTER TABLE `events` DISABLE KEYS */;
INSERT INTO `events` VALUES (8,'Healthy Competition','New cocaine dealers have moved into our territory, outbidding all of our dealers.\nWe\'re starting to lose our profits from the drug business, and soon people will lose respect us if these dealers keep selling on our territory.\nWe only have an idea of where these dealers sell their drugs at, and we don\'t know where their supplies are coming from.',1,'The dealers are prepared to relocate at the first sign of trouble. We have to send a concise message'),(9,'For Mother Russia','After a trip to the pub with a few commies, one of our boys found out about an arms deal between the reds and some unknown yet generous sympathizer.\nIt\'s said that the weapons are being sold for peanuts to the communists. So the deal is likely to happen sometime soon.\nNot a lot of people know about the deal, this could be our to get our hands on those guns',1,'The communists are prepared to change the time and place of their deal if they find out that somebody else knows about the deal.'),(10,'Pub Crawl','Over the weekend, one of our pubs was visited by a few men from The Castle and The Elephant mob.\nThe mobsters spent the entire evening provoking our boys for a fight, and at first our boys kept their wits about them to avoid an unnecessary war.\nEventually though, when bottles started flying, our men had to throw the mobsters out of the pub and teach them a lesson.\nA brawl started outside the pub, and one of our men was stabbed in the gut with a broken bottle, the man barely left the brawl with his life and has a scar to show for it.\nThis entire affair was an insult to The Crows, no one will work for us if we allow our people to be stabbed by a couple of tossers.',1,'The leader of The Castle and The Elephant knows that his men messed up. He\'s looking for a way out of this situation with his pride intact.');
/*!40000 ALTER TABLE `events` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `high_profile`
--

DROP TABLE IF EXISTS `high_profile`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `high_profile` (
  `id` tinyint(3) unsigned NOT NULL AUTO_INCREMENT,
  `success_chance` tinyint(3) unsigned NOT NULL,
  `success_result_id` smallint(5) unsigned NOT NULL,
  `failure_result_id` smallint(5) unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `success_result_id` (`success_result_id`),
  KEY `failure_result_id` (`failure_result_id`),
  CONSTRAINT `high_profile_ibfk_1` FOREIGN KEY (`success_result_id`) REFERENCES `results` (`id`) ON DELETE CASCADE,
  CONSTRAINT `high_profile_ibfk_2` FOREIGN KEY (`failure_result_id`) REFERENCES `results` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `high_profile`
--

LOCK TABLES `high_profile` WRITE;
/*!40000 ALTER TABLE `high_profile` DISABLE KEYS */;
INSERT INTO `high_profile` VALUES (15,50,86,87),(16,70,90,91),(17,60,94,95),(18,30,103,104),(19,50,105,106),(20,70,112,113),(21,50,114,115),(22,50,120,121),(23,50,125,126),(24,50,130,131);
/*!40000 ALTER TABLE `high_profile` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `high_profile_list`
--

DROP TABLE IF EXISTS `high_profile_list`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `high_profile_list` (
  `high_profile_id` tinyint(3) unsigned NOT NULL,
  `combination_id` smallint(5) unsigned NOT NULL,
  KEY `high_profile_id` (`high_profile_id`),
  KEY `combination_id` (`combination_id`),
  CONSTRAINT `high_profile_list_ibfk_1` FOREIGN KEY (`high_profile_id`) REFERENCES `high_profile` (`id`) ON DELETE CASCADE,
  CONSTRAINT `high_profile_list_ibfk_2` FOREIGN KEY (`combination_id`) REFERENCES `combinations` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `high_profile_list`
--

LOCK TABLES `high_profile_list` WRITE;
/*!40000 ALTER TABLE `high_profile_list` DISABLE KEYS */;
INSERT INTO `high_profile_list` VALUES (15,102),(16,105),(17,108),(18,116),(19,117),(20,123),(21,124),(22,129),(23,133),(24,137);
/*!40000 ALTER TABLE `high_profile_list` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `results`
--

DROP TABLE IF EXISTS `results`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `results` (
  `id` smallint(5) unsigned NOT NULL AUTO_INCREMENT,
  `combination_id` smallint(5) unsigned NOT NULL,
  `result_description` varchar(1000) DEFAULT NULL,
  `effect_id` tinyint(3) unsigned DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `combination_id` (`combination_id`),
  KEY `effect_id` (`effect_id`),
  CONSTRAINT `results_ibfk_1` FOREIGN KEY (`combination_id`) REFERENCES `combinations` (`id`) ON DELETE CASCADE,
  CONSTRAINT `results_ibfk_2` FOREIGN KEY (`effect_id`) REFERENCES `effects` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=135 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `results`
--

LOCK TABLES `results` WRITE;
/*!40000 ALTER TABLE `results` DISABLE KEYS */;
INSERT INTO `results` VALUES (83,99,'The incomplete information proves to be problematic as your boys struggle to find each dealer on the streets.\nThe dealers are eventually forced to leave but not before the damage to your reputation was done.',3),(84,100,'The dealers were arrogant enough to deal on our ground, and so the threats only bolstered their pride.\nIt took months before we finally got rid of them.',4),(85,101,'We extended our protection to the dealers in exchange for a cut of their profits.\nWe lost some profit from the negotiation but we\'ve kept our reputation',1),(86,102,'The idea that your competitor\'s cocaine is nothing more than flour mixed with pepper becomes common knowledge.\nThe dealers lose their business.',6),(87,102,'The fact that you resorted to deception becomes common knowledge. You lose your drug business.',5),(88,103,'Your boys only needed to find and shoot a single dealer to send a clear message to the rest.\nThe dealers then disappeared from our territory within days',2),(89,104,'We found that the dealers have been smuggling their snow through the London Docks on a tobacco boat.\nWe sent a man to burn it.',2),(90,105,'The first few patrols and arrests manage to scare the dealers. They leave within days. ',7),(91,105,'The snow dealers start doing business closer to our own dealing spots.\nThe police ended up arresting both our own dealers and the new dealers.',4),(92,106,'The Italians were discreet and professional; all it took was a few fingers from the dealers to get the message across.\nThe dealers were out of our territory in a matter of days and with no noise. It did cost us a cut from out profits though.',9),(93,107,'We had to negotiate a cut of our profits to the Jews but it was well worth it.\nOur system was completely redone by the Jews; new suppliers, better product and persuasive dealers were all introduced to our drug business.\nOur competitors couldn\'t keep up and left town.',9),(94,108,' We setup our posts and gunned down every single dealer once they were away from any customers.\nWe got our Monopoly back,but people are now much more hesitant to do business with us; something about us being maniacs.',1),(95,108,'The rapid fire from the machine guns ended up hitting a few customers as well the dealers. We got rid of the dealers now but our reputation hit the sink.',5),(96,109,'The assassin was clean and methodical as the dealers were steadily killed in a series of accidents.\nWhile efficient, her services ended up being extremely expensive for us to handle since we had to pay her per each head.\nIt will take us a long time to go back to profiting from the drug business now. ',4),(97,110,'Since most of our clients are working class themselves, we figured the Soviets would be best for the job.\nUnfortunately, the communists refused to help us, saying they have no interest in our capitalistic endeavours',10),(98,111,'The dealers dissapeared overnight, leaving behind rumours that the dissapearing dealers were communist benefactors who fled back to Russia after being discovered by the police.\nThe crown will no doubt require a favor from us in return one day.',2),(99,112,'null',8),(100,113,'We got the specifics of the deal but it did us no good. Our persuasion hardly went unnoticed and the deal got called off.\nOn to other topics, any of our men that go out drinking in communist pubs now tend to dissappear.',3),(101,114,'The deal was cut off after we told the communists our \'proposal\'. It will be probably be scheduled to a different time and place now, outside of our ears.\nOn to other topics, any of our men that go out drinking in communist pubs now tend to dissapear.',3),(102,115,'The communists accused us of espionage for knowing about the deal and have cancelled their deal.\nThe deal will now take place at a date and time outside of our knowledge',1),(103,116,'No one knows who the benefactor is. We used that to our advantage.\nArriving at the deal, the reds were greeted with two men offering them military grade weaponry.\nFortunately for us, our boy could speak Russian while the real benefactor couldn\'t; he was shot on the spot.\nOur boy bid the Russians farewell after selling them our toys and then we helped ourselves to the guns that were left behind by the real benefactor.',15),(104,116,' A good disguise didn\'t mean much if we didn\'t have the goods.\nThe Bolsheviks inspected the goods of both parties involved and found out that we were going to sell them duds.\nThe man we sent begged for his life, and told the reds everything about our scheme in exchange for his life. We better watch ourselves now.',4),(105,117,'We underestimated the extent to which the Bolsheviks will go for their cause. Even at gunpoint, the reds pulled out their guns on us.\nSince we had the first few shots, we managed to clean the meeting spot from any Bolsheviks.\nThe benefactor was killed in the crossfire as well, leaving his guns for the Crows.',15),(106,117,'We underestimated the extent to which the Bolsheviks will go for their cause. Even at gunpoint, the reds pulled out their guns on us.\nWe gutted all of them of course still, but the benefactor was able to escape in the gun fight with his goods. ',3),(107,118,'It took too long for our man to gain the trust of the communists. He didn\'t hear about the deal until after it was made.',1),(108,119,'The benefactor ended up being a retired Great War colonel who used his ties to the army to get the guns. Our boys paid him a visit to pick up the guns for ourselves.\nThe benefactor didn\'t give much trouble, he just spewed communist jargon at our boys',11),(109,120,'The Italians insisted that we take the guns only after we got rid of the communists.\nWe had to oblige their request or else they would take the guns themselves.\nWe riddled anyone in the meeting with bullets and split the guns between us.',2),(110,121,'We used our Jewish contacts to get a sizable zero interest loan from one of the local banks.\nWe sent three men and a suitcase of cash to interrupt the deal, they were promptly met with gunfire from the paranoid Russians.\nTwo of our men died, and the suitcase was left behind, and we now have a debt to pay.',5),(111,122,'You shouldn\'t see this',1),(112,123,'The assassin did her research and found her target.\nShe never revealed to us what she found out about the target. She said it was out of pity.\nThe day after, she delivered the guns to us in a new car she no doubt got from our paycheck.',12),(113,123,'The assassin did her research and found her target, as far as we know; we never heard from her again.\nMost likely she took the guns for herself and ran off, or maybe there was something else.',3),(114,124,'Although the fact that we knew about the deal didn\'t please the reds, they happened to be in need of extra funds at the time. The purchase went smoothly.',13),(115,124,'The Soviets accused us of espionage. We tried to explain that we accidentally stumbled on the information but they wouldn\'t hear it.\nWe\'ve lost our ties with the Soviets.',16),(116,125,'All the communists involved and the benefactor were arrested by the crown agents, they won\'t be seeing sunlight for a while.\nThe guns ended up being confiscated but we still got a reasonable payment for our troubles. ',1),(117,126,'null',8),(118,127,'The pub grew empty very quickly when our boys sat down at one of the tables.\nWhen the fight started, all who were left at the pub were the mobsters and the Crows.\nYou could hear the sounds of fists connecting and bottles smashing all the way down a block from the pub.\nA couple more brawls sprang up around London but we managed to avoid a war.',17),(119,128,'The mob didn\'t react well to the threats we sent. This time they sent a group of men to trash one of our gambling send.\nAll eyes are on us now',18),(120,129,'The leader agreed to pay reparations and to make this whole affair public in order to preserve our reputation.\nTo make the talk go smoothly, we had to agree to allowing Elephant and The Castle tossers to drink at our pubs for free (within reason) for the next month.',2),(121,129,'The mob leader first seemed willing to pay the reparations we asked for.\nBut the negotiations turned sour when we demanded to make the fact he\'s paying reparations public.\nUnable to come to terms, we expect things to degrade into a war soon.',3),(122,130,'The Castle and The Elephant agreed to recuperate us for the death of one of our men and paid us a sizable sum for it.\nA portion of the sum we received went to the man who had to be stabbed for it.\nWord on the street is now that we were too afraid to start a war over the death of one of our men. Recruiting would be harder now.',19),(123,131,'A car with a few of our men, armed with Webley Revolvers, stopped in front of a recently purchased pub owned by the mobsters.\nThey entered the pub and promptly shot all Elephant and Castle tossers inside of it and set the pub on fire.\nThis at least gives us a head start on the war we just declared.',2),(124,132,'The spy didn\'t have much trouble figuring out who were in our pub that night. All the men involved were boasting about it despite their boss\'s order to stay quiet.\nOur boys made sure to take care of each of the tossers one by one, as publicly as possible.\nWe made our point clear, and the mob declared war on us in retaliation.\nThe next few months are gonna be very difficult.',2),(125,133,'After greasing a few palms, the police launched an investigation regarding possible illegal drug trafficking businesses happening in the Mob\'s pubs.\nPub business will bee shut down completely for the next few months for the Elephant and The Castle.\nRumors began to fly around about who was responsible for these shutdowns, us being the most likely ones, just like we wanted.\nThe mob no doubt would like to launch a war against us, but with their income halved, they\'re not going be here for long.',6),(126,133,'We greased a few palms to start an investigation surrounding the pubs owned by the Elephant and the Castle.\nThe mob seemed to have a similar idea, as the investigation got cancelled in the last minute by the chief of police.\nA lot of time and money was sunk into this plot, and we ran out of both before we could send a clear message.',5),(127,134,'The alliance between us and the Italians was too much for the Elephant and the Castle to handle.\nTheir businesses are shut down, their men gave up fighting, and their boss is nowhere to be seen now.\nWe agreed to allow the Italians a large chunk of the businesses we acquired in exchange for their help.',17),(128,135,'Our Jewish contacts offered us an interesting proposal: in exchange for regular fees, the Jews will provide us with insurance  in case any of our men gets injured while working for us.\nThe money from our program will be enough for any man to take a vacation after getting a little roughed up.\nPeople have been saying good things about us since we started this agreement, more boys are flocking to join the Crows.',1),(129,136,'Considering how close they came to trashing our pub, we figured it\'s fair to return the favor.\nWe setup our post in front of the pub, and shot a few bullets to the ground to empty the pub.\nOur boys then proceeded to tear the pub to pieces. Not much was left of it after they were done.\nThe mob declared war on us but only on principle, no one was being paid enough to run into machine gun fire again.',17),(130,137,'On a Monday morning, just as the first few patrons were entering a mob-owned pub, a body fell down from one of the rooftops unto the muddy street.\nBy the time the body was identified, the killer was long gone.\nThe leader that replaced the one that was killed was graceful enough to even apologize to us for the incident.\nThe mobsters now stay clear of our territory, we\'ve also been lately getting a bigger influx of recruits.',6),(131,137,'On a Monday morning, just as the first few patrons were entering a mob-owned pub, a body fell down from one of the rooftops unto the muddy street.\nBy the time the body was identified, the killer was long gone.\nThe new mob leader is the son of the leader that was killed, and he\'s out for us now.\nOne of our higher-ranking enforcers was found dead in front of our pub this morning, a note declaring war against us was found in his coat',5),(132,138,'he moment our boy was announced a Bolshevik, all eyes were taken away from us and were directed at the Elephant and The Castle as tensions are starting to rise between the workers and the mob.\nMost likely nothing will happen out of this, but at least there are no expectations from us now.',1),(133,139,'The crown used its reach to revoke all licenses belonging to the mob.\nThe blow to The Elephant and The Castle was devastating, but it didn\'t help us much.\nThe crown agents didn\'t allow any rumors to surface about how or why the mob suddenly lost their business, sweeping the entire thing under the rug.\nWe failed to preserve our reputation, and in addition we now have a favor to repay to the crown',4),(134,140,'null',8);
/*!40000 ALTER TABLE `results` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping events for database 'card_gang'
--

--
-- Dumping routines for database 'card_gang'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2019-10-16 13:54:17
