-- phpMyAdmin SQL Dump
-- version 5.0.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 06, 2023 at 01:52 AM
-- Server version: 10.4.17-MariaDB
-- PHP Version: 7.4.26

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `secure_password`
--

-- --------------------------------------------------------

--
-- Table structure for table `admin`
--

CREATE TABLE `admin` (
  `id` int(11) NOT NULL,
  `first_name` varchar(20) NOT NULL,
  `last_name` varchar(20) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(70) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `admin`
--

INSERT INTO `admin` (`id`, `first_name`, `last_name`, `email`, `password`) VALUES
(1, 'amr', 'gadalla', 'hello@h.h', '$2b$10$ELY1VJEa9Q/nZazBg5k5WuYJLTt35Q4jY.oy57uHW2d26j0rr9lpC');

-- --------------------------------------------------------

--
-- Table structure for table `password`
--

CREATE TABLE `password` (
  `password_id` int(11) NOT NULL,
  `timestamp` datetime NOT NULL,
  `strength` varchar(20) NOT NULL,
  `student_id` varchar(15) NOT NULL,
  `complexity` varchar(20) NOT NULL,
  `duration` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `password`
--

INSERT INTO `password` (`password_id`, `timestamp`, `strength`, `student_id`, `complexity`, `duration`) VALUES
(6, '2023-03-01 01:34:40', 'good', 'U16107008', '[2-8-3-1-0-14-false]', '1 day'),
(8, '2023-03-03 11:40:38', 'weak', 'h00456951', '[0-6-0-0-0-6-false]', '3 seconds'),
(9, '2023-03-03 11:41:15', 'weak', 'h00456951', '[0-6-0-0-0-6-false]', '3 seconds'),
(10, '2023-03-03 11:41:27', 'weak', 'h00456951', '[0-6-0-0-0-6-false]', '3 seconds'),
(11, '2023-03-03 11:41:29', 'weak', 'h00456951', '[0-6-0-0-0-6-false]', '3 seconds'),
(12, '2023-03-03 11:41:31', 'weak', 'h00456951', '[0-6-0-0-0-6-false]', '3 seconds'),
(13, '2023-03-03 11:41:32', 'weak', 'h00456951', '[0-6-0-0-0-6-false]', '3 seconds'),
(14, '2023-03-03 11:41:46', 'weak', 'h00456951', '[0-6-0-0-0-6-false]', '3 seconds'),
(15, '2023-03-03 11:41:47', 'weak', 'h00456951', '[0-6-0-0-0-6-false]', '3 seconds'),
(16, '2023-03-03 11:41:48', 'weak', 'h00456951', '[0-6-0-0-0-6-false]', '3 seconds'),
(17, '2023-03-03 11:41:48', 'weak', 'h00456951', '[0-6-0-0-0-6-false]', '3 seconds'),
(18, '2023-03-03 11:45:12', 'weak', 'h00456951', '[0-6-0-0-0-6-false]', '3 seconds'),
(19, '2023-03-03 11:45:13', 'weak', 'h00456951', '[0-6-0-0-0-6-false]', '3 seconds'),
(20, '2023-03-03 11:46:34', 'weak', 'h00456951', '[0-6-0-0-0-6-false]', '3 seconds'),
(21, '2023-03-03 11:46:48', 'weak', 'h00456951', '[0-6-0-0-0-6-false]', '3 seconds'),
(22, '2023-03-03 11:46:56', 'weak', 'h00456951', '[0-6-0-0-0-6-false]', '3 seconds'),
(23, '2023-03-03 11:47:12', 'weak', 'h00456951', '[0-6-0-0-0-6-false]', '3 seconds'),
(24, '2023-03-03 11:47:18', 'weak', 'h00456951', '[0-6-0-0-0-6-false]', '3 seconds'),
(25, '2023-03-03 11:51:58', 'weak', 'h00456951', '[0-6-0-0-0-6-false]', '3 seconds'),
(26, '2023-03-03 11:54:26', 'weak', 'h00456951', '[0-6-0-0-0-6-false]', '3 seconds'),
(27, '2023-03-03 11:54:42', 'weak', 'h00456951', '[0-6-0-0-0-6-false]', '3 seconds'),
(28, '2023-03-03 11:54:43', 'weak', 'h00456951', '[0-6-0-0-0-6-false]', '3 seconds'),
(29, '2023-03-04 03:06:51', 'weak', 'h00456321', '[0-2-0-0-0-2-false]', 'less than a second'),
(30, '2023-03-04 03:07:23', 'weak', 'h00456321', '[0-4-0-0-0-4-true]', 'less than a second'),
(31, '2023-03-04 03:08:42', 'weak', 'h00456321', '[0-2-0-0-0-2-false]', 'less than a second'),
(32, '2023-03-05 13:20:30', 'weak', 'h00456321', '[0-5-0-0-0-5-false]', '10 seconds'),
(33, '2023-03-05 13:21:29', 'weak', 'h00456321', '[0-7-0-0-0-7-false]', '3 minutes'),
(34, '2023-03-05 13:22:17', 'weak', 'h00456321', '[0-4-0-0-0-4-false]', '1 second'),
(35, '2023-03-05 13:23:38', 'weak', 'h00456321', '[0-6-0-0-0-6-true]', 'less than a second'),
(36, '2023-03-05 13:23:51', 'weak', 'h00456321', '[0-5-0-0-0-5-false]', '10 seconds'),
(37, '2023-03-05 13:26:08', 'fair', 'h00456321', '[0-9-0-0-0-9-false]', '32 seconds'),
(38, '2023-03-05 13:26:35', 'weak', 'h00456321', '[0-4-0-0-0-4-false]', '1 second'),
(39, '2023-03-05 13:27:08', 'weak', 'h00456321', '[0-5-0-0-0-5-false]', '10 seconds'),
(40, '2023-03-05 13:28:02', 'weak', 'h00456321', '[0-6-0-0-0-6-true]', 'less than a second'),
(41, '2023-03-05 13:28:26', 'weak', 'h00456321', '[0-6-0-0-0-6-true]', 'less than a second'),
(42, '2023-03-05 13:28:28', 'weak', 'h00456321', '[0-6-0-0-0-6-true]', 'less than a second'),
(43, '2023-03-05 13:28:38', 'weak', 'h00456321', '[0-6-0-0-0-6-true]', 'less than a second'),
(44, '2023-03-05 13:30:00', 'weak', 'h00456321', '[0-6-0-0-0-6-true]', 'less than a second'),
(45, '2023-03-05 13:30:02', 'weak', 'h00456321', '[0-6-0-0-0-6-true]', 'less than a second'),
(46, '2023-03-05 13:30:08', 'weak', 'h00456321', '[0-5-0-0-0-5-false]', '3 seconds'),
(47, '2023-03-05 13:30:10', 'weak', 'h00456321', '[0-5-0-0-0-5-false]', '3 seconds'),
(48, '2023-03-05 13:30:15', 'weak', 'h00456321', '[0-5-0-0-0-5-false]', '3 seconds'),
(49, '2023-03-05 13:30:15', 'weak', 'h00456321', '[0-5-0-0-0-5-false]', '3 seconds'),
(50, '2023-03-05 13:30:15', 'weak', 'h00456321', '[0-5-0-0-0-5-false]', '3 seconds'),
(51, '2023-03-05 13:30:15', 'weak', 'h00456321', '[0-5-0-0-0-5-false]', '3 seconds'),
(52, '2023-03-05 13:30:23', 'weak', 'h00456321', '[0-5-0-0-0-5-false]', '3 seconds'),
(53, '2023-03-05 13:30:23', 'weak', 'h00456321', '[0-5-0-0-0-5-false]', '3 seconds'),
(54, '2023-03-05 13:30:23', 'weak', 'h00456321', '[0-5-0-0-0-5-false]', '3 seconds'),
(55, '2023-03-05 13:30:23', 'weak', 'h00456321', '[0-5-0-0-0-5-false]', '3 seconds'),
(56, '2023-03-05 13:30:23', 'weak', 'h00456321', '[0-5-0-0-0-5-false]', '3 seconds'),
(57, '2023-03-05 13:30:23', 'weak', 'h00456321', '[0-5-0-0-0-5-false]', '3 seconds'),
(58, '2023-03-05 13:30:39', 'weak', 'h00456321', '[0-4-0-0-0-4-false]', '1 second'),
(59, '2023-03-05 13:30:49', 'weak', 'h00456321', '[0-4-0-0-0-4-false]', '1 second'),
(60, '2023-03-05 13:32:06', 'weak', 'h00456321', '[0-6-0-0-0-6-false]', '2 minutes'),
(61, '2023-03-05 13:35:42', 'weak', 'h00456321', '[0-5-0-0-0-5-false]', '10 seconds'),
(62, '2023-03-05 13:36:49', 'weak', 'h00456321', '[0-5-0-0-0-5-false]', '10 seconds'),
(63, '2023-03-05 13:37:17', 'weak', 'h00456321', '[0-5-0-0-0-5-false]', '10 seconds'),
(64, '2023-03-05 13:37:23', 'weak', 'h00456321', '[0-6-0-0-0-6-true]', 'less than a second'),
(65, '2023-03-05 13:37:30', 'weak', 'h00456321', '[0-6-0-0-0-6-true]', 'less than a second'),
(66, '2023-03-05 13:37:36', 'weak', 'h00456321', '[0-6-0-0-0-6-true]', 'less than a second'),
(67, '2023-03-05 17:40:16', 'weak', 'h00968735', '[0-6-0-0-0-6-false]', '2 minutes'),
(68, '2023-03-05 17:41:01', 'weak', 'h00968735', '[0-7-0-0-0-7-false]', '17 minutes'),
(69, '2023-03-06 02:47:46', 'strong', 'H00753654', '[5-5-5-5-0-20-false]', '80 years'),
(70, '2023-03-06 03:40:09', 'strong', 'H00753654', '[4-6-0-6-0-16-false]', '7 years'),
(71, '2023-03-06 03:44:08', 'strong', 'H00753654', '[4-6-3-3-0-16-false]', '3 years'),
(72, '2023-03-06 04:34:54', 'strong', 'H00753654', '[4-5-4-3-0-16-false]', '7 years'),
(73, '2023-03-06 04:36:51', 'strong', 'h00852654', '[4-6-7-3-0-20-false]', 'centuries'),
(74, '2023-03-06 04:37:49', 'strong', 'h00654852', '[0-20-0-1-0-21-false', '4 hours'),
(75, '2023-03-06 04:38:40', 'strong', 'h00654879', '[0-15-0-2-0-17-false', '5 years'),
(76, '2023-03-06 04:45:12', 'strong', 'h00654879', '[0-11-0-7-0-18-false', '4 months'),
(77, '2023-03-06 04:46:54', 'strong', 'h00654879', '[0-7-0-8-0-15-false]', 'centuries');

-- --------------------------------------------------------

--
-- Table structure for table `student`
--

CREATE TABLE `student` (
  `student_id` varchar(15) NOT NULL,
  `student_name` varchar(30) NOT NULL,
  `student_year` int(6) NOT NULL,
  `student_major` varchar(100) NOT NULL,
  `attempts` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `student`
--

INSERT INTO `student` (`student_id`, `student_name`, `student_year`, `student_major`, `attempts`) VALUES
('h00123411', 'dsf', 0, 'mass', 0),
('H00123456', 'Testing Select Function', 2020, 'IT', 0),
('H00156422', 'dgfdf', 0, 'mass', 0),
('h00426842', 'sdfsf', 0, 'mass', 0),
('h00456321', 'Amr ', 2022, 'IT', 34),
('h00456951', 'sfsdf', 0, 'mass', 4),
('h00621852', 'sdfsdf', 0, 'mass', 0),
('h00654852', 'fghfh', 0, 'dsgdf', 1),
('h00654879', 'fghfgh', 0, 'dgdfg', 3),
('H00753654', 'dfsd', 2022, 'mass', 4),
('h00852654', 'sdsdf', 0, 'adasd', 1),
('h00951359', 'dgdfg', 0, 'mass', 0),
('h00968735', 'sdffsdf', 0, 'mass', 2),
('h00986432', 'sdfsdf', 0, 'mass', 0),
('U16107008', 'Amr', 2022, 'IT', 0),
('U161070d8', 'Amr', 0, 'IT', 0);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admin`
--
ALTER TABLE `admin`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `password`
--
ALTER TABLE `password`
  ADD PRIMARY KEY (`password_id`),
  ADD KEY `student_id` (`student_id`);

--
-- Indexes for table `student`
--
ALTER TABLE `student`
  ADD PRIMARY KEY (`student_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `admin`
--
ALTER TABLE `admin`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `password`
--
ALTER TABLE `password`
  MODIFY `password_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=78;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `password`
--
ALTER TABLE `password`
  ADD CONSTRAINT `password_ibfk_1` FOREIGN KEY (`student_id`) REFERENCES `student` (`student_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
