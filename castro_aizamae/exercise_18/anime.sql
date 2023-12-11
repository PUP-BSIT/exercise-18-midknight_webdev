SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";

CREATE TABLE `anime` (
  `id` int(11) NOT NULL,
  `anime_name` varchar(100) NOT NULL,
  `genre` varchar(100) NOT NULL,
  `author_name` varchar(100) NOT NULL,
  `release_date` date NOT NULL,
  `rating` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

INSERT INTO `anime` (`id`, `anime_name`, `genre`, `author_name`, `release_date`,
 `rating`) VALUES
 
ALTER TABLE `anime`
  ADD PRIMARY KEY (`id`);

ALTER TABLE `anime`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;
COMMIT;
