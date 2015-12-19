CREATE TABLE IF NOT EXISTS `category` (
  `category_id` int(5) NOT NULL,
  `category_name` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

INSERT INTO `category` (`category_id`, `category_name`) VALUES
	(1001, 'fighting'),
	(1002, 'racing'),
	(1003, 'sports');

CREATE TABLE IF NOT EXISTS `games` (
  `game_id` int(11) NOT NULL,
  `game_name` varchar(50) NOT NULL,
  `category_id` int(5) NOT NULL,
  `mature` tinyint(1) NOT NULL,
  `description` varchar(150) NOT NULL,
  `published_date` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Dumping data for table test.games: ~0 rows (approximately)
/*!40000 ALTER TABLE `games` DISABLE KEYS */;
INSERT INTO `games` (`game_id`, `game_name`, `category_id`, `mature`, `description`, `published_date`) VALUES
	(1000050, 'Tekken', 1001, 1, 'Published by Namco.', '1994-01-01'),
	(1000051, 'Forza', 1002, 0, 'Published by Microsoft', '2005-01-01'),
	(1000052, 'Mortal Kombat', 1001, 1, 'Published by Midway Games', '2015-01-01'),
	(1000053, 'CODBlacOps3', 1004, 1, 'Published by Activision', '2015-01-01'),
	(1000054, 'Evolve', 1004, 1, 'Published by Turtle Rock Studios', '2015-01-01'),
	(1000055, 'Battlefield4', 1004, 1, 'Published by EA Digital Illusions', '2013-01-01'),
	(1000056, 'Rainbow6', 1004, 1, 'Published by EUbisoft', '2015-01-01'),
	(1000057, 'Destiny', 1004, 1, 'Published by Bungie', '2014-01-01'),
	(1000058, 'Wolfenstein', 1004, 1, 'Published by Bethesda', '2014-01-01'),
	(1000059, 'StarWarsBattleFront', 1004, 1, 'Published by EA DICE', '2015-01-01'),
	(1000060, 'Test1', 1004, 1, 'Published by Test1', '2015-12-19'),
	(1000061, 'Test2', 1004, 1, 'Published by Test2', '2015-12-19'),
	(1000062, 'Test3', 1004, 1, 'Published by Test3', '2015-12-19'),
	(1000063, 'Test4', 1004, 1, 'Published by Test4', '2015-12-19');
