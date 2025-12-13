-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Dec 06, 2025 at 10:40 PM
-- Server version: 8.0.26-16
-- PHP Version: 8.0.28

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `h97690_raptor_data`
--

-- --------------------------------------------------------

--
-- Table structure for table `bird_tracker_dailydata`
--

CREATE TABLE `bird_tracker_dailydata` (
  `id` bigint NOT NULL,
  `date` datetime(6) NOT NULL,
  `weight` smallint UNSIGNED NOT NULL,
  `food_type` varchar(12) NOT NULL,
  `food_weight` smallint UNSIGNED NOT NULL,
  `weather` int NOT NULL,
  `temperature` int NOT NULL,
  `training` int NOT NULL,
  `behaviour` int NOT NULL,
  `notable_info` varchar(200) NOT NULL,
  `notable_image` varchar(255) NOT NULL,
  `selected_bird_id` bigint NOT NULL,
  `trainer_id` int NOT NULL,
  `food_time` varchar(6) NOT NULL,
  `training_time` varchar(6) DEFAULT NULL
) ;

--
-- Dumping data for table `bird_tracker_dailydata`
--

INSERT INTO `bird_tracker_dailydata` (`id`, `date`, `weight`, `food_type`, `food_weight`, `weather`, `temperature`, `training`, `behaviour`, `notable_info`, `notable_image`, `selected_bird_id`, `trainer_id`, `food_time`, `training_time`) VALUES
(39, '2025-11-20 13:01:18.836617', 463, 'rabbit,quail', 59, 1, 18, 0, 0, 'weighed with hood', 'image/upload/placeholder', 21, 4, '15h00', NULL),
(41, '2025-11-21 12:31:01.517940', 465, 'DOC', 60, 0, 18, 0, 0, '-', 'image/upload/placeholder', 21, 4, 'Unsure', NULL),
(42, '2025-11-22 14:51:16.232781', 464, 'DOC', 55, 0, 18, 0, 0, 'None', 'image/upload/placeholder', 21, 4, '17', NULL),
(111, '2025-11-23 14:33:18.680941', 459, 'Mouse, DOC', 60, 1, 20, 0, 0, 'None', 'image/upload/placeholder', 21, 4, '16.30', NULL),
(113, '2025-11-24 18:07:15.905910', 461, 'doc', 60, 0, 1318, 1, 0, 'first training, max 1,5m flight', 'image/upload/placeholder', 21, 4, '15h30', '15.30'),
(116, '2025-11-25 16:22:06.103328', 458, 'DOC', 60, 0, 15, 1, 0, 'flew 7 m and once up to chest level', 'image/upload/placeholder', 21, 4, '11.30', '11.30'),
(117, '2025-11-26 17:32:41.485910', 459, 'DOC, Pigeons', 50, 1, 19, 1, 3, 'None', 'image/upload/placeholder', 21, 4, '17h00', '11.30'),
(118, '2025-11-27 13:56:04.714795', 457, 'DOC', 50, 0, 17, 1, 0, 'None', 'image/upload/placeholder', 21, 4, '15h00', '15'),
(119, '2025-11-28 19:42:09.228623', 448, 'DOC', 60, 0, 17, 1, 0, '8 flight, max 17m', 'image/upload/placeholder', 21, 4, '11.30', '11.30'),
(121, '2025-11-29 14:25:43.729385', 448, 'DOC', 55, 1, 20, 1, 4, 'None', 'image/upload/placeholder', 21, 4, '15h30', '15.30'),
(122, '2025-12-01 17:06:42.755481', 447, 'DOC, Goose', 50, 1, 20, 3, 0, 'first time on the lure', 'image/upload/placeholder', 21, 4, '20:00', '15.00'),
(124, '2025-12-02 20:55:17.144714', 445, 'DOC, Liver', 55, 1, 22, 0, 5, 'None', 'image/upload/placeholder', 21, 4, '16h00', NULL),
(125, '2025-12-03 16:30:28.278828', 446, 'DOC', 55, 1, 20, 3, 0, 'None', 'image/upload/placeholder', 21, 4, '15h00', '15:00'),
(126, '2025-12-04 18:32:07.244635', 441, 'DOC, Goose', 60, 1, 20, 3, 0, 'first time catching it in the air', 'image/upload/placeholder', 21, 4, '15h30', '15:30'),
(127, '2025-12-05 19:10:48.259484', 445, 'Doc', 60, 1, 21, 3, 0, 'flew double the krion, caught it in the air, started while i was spinning it for the first time', 'image/upload/placeholder', 21, 4, '15h30', '15:30'),
(128, '2025-12-06 15:04:10.674353', 442, 'DOC, Liver', 65, 1, 22, 3, 0, 'I swung the lure away, making him turn around to get it', 'image/upload/placeholder', 21, 4, '16h20', '16h20'),
(129, '2025-12-06 15:04:11.701586', 442, 'DOC, Liver', 65, 1, 22, 3, 0, 'I swung the lure away, making him turn around to get it', 'image/upload/placeholder', 21, 4, '16h20', '16h20');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `bird_tracker_dailydata`
--
ALTER TABLE `bird_tracker_dailydata`
  ADD PRIMARY KEY (`id`),
  ADD KEY `bird_tracker_dailyda_selected_bird_id_ca752253_fk_bird_trac` (`selected_bird_id`),
  ADD KEY `bird_tracker_dailydata_trainer_id_0988b9a3_fk_auth_user_id` (`trainer_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `bird_tracker_dailydata`
--
ALTER TABLE `bird_tracker_dailydata`
  MODIFY `id` bigint NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `bird_tracker_dailydata`
--
ALTER TABLE `bird_tracker_dailydata`
  ADD CONSTRAINT `bird_tracker_dailyda_selected_bird_id_ca752253_fk_bird_trac` FOREIGN KEY (`selected_bird_id`) REFERENCES `bird_tracker_bird` (`id`),
  ADD CONSTRAINT `bird_tracker_dailydata_trainer_id_0988b9a3_fk_auth_user_id` FOREIGN KEY (`trainer_id`) REFERENCES `auth_user` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
