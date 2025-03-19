/*
 Navicat Premium Data Transfer

 Source Server         : alien
 Source Server Type    : MySQL
 Source Server Version : 80041
 Source Host           : localhost:3306
 Source Schema         : moviesdog_database

 Target Server Type    : MySQL
 Target Server Version : 80041
 File Encoding         : 65001

 Date: 17/03/2025 14:27:57
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for movie_table
-- ----------------------------
DROP TABLE IF EXISTS `movie_table`;
CREATE TABLE `movie_table`  (
  `id` int NOT NULL AUTO_INCREMENT COMMENT '主键',
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '电影名称',
  `en_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '电影外文名称',
  `director` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '电影导演',
  `scriptwriter` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '电影编剧',
  `actor` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '主演',
  `type` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '类型',
  `language` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '语言',
  `country` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '制片国家',
  `release_time` datetime NOT NULL COMMENT '上映时间',
  `length_time` int NOT NULL COMMENT '电影时长',
  `preview_url` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '预告片链接',
  `picture_list` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '电影海报',
  `synopsis` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '电影简介',
  `sales` double NOT NULL COMMENT '票房',
  `rate` double NOT NULL COMMENT '评分',
  `comment` int NOT NULL COMMENT '评论数',
  `count` int NOT NULL COMMENT '售出票数',
  `is_open` int NOT NULL COMMENT '开业状态， 0：未开业；1：已开业',
  `is_delete` int NOT NULL COMMENT '删除标记， 0：未删除；1：已删除',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 13 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci COMMENT = '电影表' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of movie_table
-- ----------------------------
INSERT INTO `movie_table` VALUES (8, '哪吒之魔童闹海', 'NE ZHA 2', '饺子', '饺子', '吕艳婷、瀚墨、囧森瑟夫、绿绮、陈浩、张珈铭', 'Comedy,3D,IMAX,Dolby,Animation', 'Mandarin', 'China', '2025-01-29 00:00:00', 144, 'https://www.bilibili.com/video/BV1o4411W7PK/?spm_id_from=333.337.search-card.all.click&vd_source=7b17ffa3959870f2c33c15d5128f451f', 'https://alien-blog.oss-cn-beijing.aliyuncs.com/moviesDog/55b822a7-3cb0-4185-a39f-effde72f28ba.jpg,https://alien-blog.oss-cn-beijing.aliyuncs.com/moviesDog/c774ba42-7676-41fd-8369-fc373be528a6.jpg,https://alien-blog.oss-cn-beijing.aliyuncs.com/moviesDog/3fc77735-1346-4fee-b6e5-e6a8b7879899.jpg,https://alien-blog.oss-cn-beijing.aliyuncs.com/moviesDog/40a401a2-96e2-4c31-9467-18ccfeb5fafb.jpg,https://alien-blog.oss-cn-beijing.aliyuncs.com/moviesDog/0eb3faab-905d-4b46-9d35-26e1bc99fa21.jpg', '天劫之后，哪吒、敖丙的灵魂虽保住了，但肉身很快会魂飞魄散。太乙真人打算用七色宝莲给二人重塑肉身。但是在重塑肉身的过程中却遇到重重困难，哪吒、敖丙的命运将走向何方？', 72600000, 8.25, 4, 0, 1, 0);
INSERT INTO `movie_table` VALUES (9, '唐探1900', 'DETECTIVE CHINATOWN 1900', '陈思诚、戴墨', '陈思诚', '王宝强、刘昊然、周润发、白客、张新成、岳云鹏', 'IMAX,Dolby,Comedy,adventure,Mystery', 'Mandarin', 'China', '2025-01-29 00:00:00', 136, 'https://www.bilibili.com/video/BV1iPw8ezEqi/?spm_id_from=333.337.search-card.all.click', 'https://alien-blog.oss-cn-beijing.aliyuncs.com/moviesDog/cae8a22e-dfce-4145-b6ee-364d439a4ee0.jpg,https://alien-blog.oss-cn-beijing.aliyuncs.com/moviesDog/59cf1529-5e48-4c2d-afb3-cc8e4b515e2c.jpg,https://alien-blog.oss-cn-beijing.aliyuncs.com/moviesDog/32b6a066-c447-4f91-9905-a6fd6b6db85b.jpg,https://alien-blog.oss-cn-beijing.aliyuncs.com/moviesDog/613bd643-f2d0-456a-b967-539759d32c18.jpg,https://alien-blog.oss-cn-beijing.aliyuncs.com/moviesDog/84bdb1b2-dcb8-481d-afd9-d7b08d33fbe8.jpg', '十年情怀真诚打造，唐探宇宙口碑佳作！王宝强刘昊然唐人街神探逗笑登场，周润发名场面巅峰演绎神乎其技！欢乐包裹家国情，以“笑”见大有底蕴！ 1900年，在美国旧金山唐人街，美洲原始部落猎人阿鬼(王宝强 饰)与留美青年秦福(刘昊然 饰)因一场凶杀案偶然结识，误打误撞组成“唐人街神探”组合。开启了一场笑闹探案之旅.....', 0, 6, 1, 0, 1, 0);
INSERT INTO `movie_table` VALUES (10, '平原上的火焰', 'FIRE ON THE PLAIN', '张骥', '曹柳', '周冬雨、刘昊然、梅婷、袁弘', 'Crime,Mystery,Romance,IMAX,Dolby', 'Mandarin', 'China', '2025-03-08 00:00:00', 101, '', 'https://alien-blog.oss-cn-beijing.aliyuncs.com/moviesDog/b0120b32-d49c-42d3-93e7-720826995b24.jpg,https://alien-blog.oss-cn-beijing.aliyuncs.com/moviesDog/495b51b7-f42c-4bfa-b0c2-a1117d9720f5.jpg,https://alien-blog.oss-cn-beijing.aliyuncs.com/moviesDog/d437e187-972e-4919-8476-837fd3f47c9b.jpg,https://alien-blog.oss-cn-beijing.aliyuncs.com/moviesDog/fe68ae99-c29c-41b7-9702-9d7929f1de75.jpg,https://alien-blog.oss-cn-beijing.aliyuncs.com/moviesDog/b6be9921-552c-4d4b-bb59-d09a9a4ab24a.jpg', '终得相见！大尺度，强班底，癫爽女性反杀，野火燎原震撼银幕！ 出租车司机接连遇害，人心惶惶；破败的东北小镇，绝望笼罩！渴望逃脱牢笼的李斐（周冬雨 饰）与游走犯罪边缘的庄树（刘昊然 饰）密谋“干票大的”。一场意外，计划崩盘，命运的齿轮把他们推向崩溃的边缘……八年后，李斐背负的惊天秘密压得她喘不过气，心思难测的庄树为查真相步步紧逼。烈焰灼心，命运捉弄，谁将坠入深渊？ 电影改编自双雪涛百花文学奖获奖作品《平原上的摩西》。', 0, 4, 1, 0, 1, 0);
INSERT INTO `movie_table` VALUES (11, '名侦探柯南：迷宫的十字路口', 'Detective Conan 7: Crossroad in the Ancient Capit', '儿玉兼嗣', '青山刚昌、古内一成', '高山南、山崎和佳奈、山口胜平、岩居由希子', 'Animation,adventure,Mystery,IMAX,Dolby', 'Japanese', 'Japan', '2024-12-27 00:00:00', 107, '', 'https://alien-blog.oss-cn-beijing.aliyuncs.com/moviesDog/4511a33e-2e2a-4b26-94ba-ec676bc16585.jpg,https://alien-blog.oss-cn-beijing.aliyuncs.com/moviesDog/d336e37a-05e0-4d40-82bd-c4e93f431cc3.jpg,https://alien-blog.oss-cn-beijing.aliyuncs.com/moviesDog/1707ebe8-7c9c-4d5f-9719-a66723b86946.jpg,https://alien-blog.oss-cn-beijing.aliyuncs.com/moviesDog/a5044def-65c2-4666-b30f-c29ceb0d0343.jpg,https://alien-blog.oss-cn-beijing.aliyuncs.com/moviesDog/d89b6052-a127-4391-9d90-48b3460edb7e.jpg', '东京、大阪、京都发生了5名男子相继被杀的事件。5人是盯上古美术品的盗窃团“源氏萤”的成员，相互以义经和他的随从的名字称呼。剩下的是义经、弁庆、伊势三郎三人。柯南和被委托解决其他佛像盗窃案的毛利小五郎一起来到京都，遇到了追踪源氏萤事件的服部平次，并开始了行动。但是，服部平次被弓狙击了。为了寻找犯人，两个名侦探在京都的小镇上疾驰。', 180370000, 7.875, 8, 0, 1, 0);
INSERT INTO `movie_table` VALUES (12, '小小的我', 'Big World', '杨荔钠', '游晓颖', '易烊千玺、林晓杰、蒋勤勤、周雨彤', 'Youth,Family,Plot,IMAX,Dolby', 'Mandarin', 'China', '2024-12-27 00:00:00', 131, '', 'https://alien-blog.oss-cn-beijing.aliyuncs.com/moviesDog/5801a4f6-965f-4295-8d9a-c78d9413bffb.jpg,https://alien-blog.oss-cn-beijing.aliyuncs.com/moviesDog/56c7bf8f-351d-4635-8dd2-33e3e7cc630c.jpg,https://alien-blog.oss-cn-beijing.aliyuncs.com/moviesDog/94f366ee-5322-452a-bf30-1ce31b85f6cb.jpg,https://alien-blog.oss-cn-beijing.aliyuncs.com/moviesDog/e3575e43-db25-4474-857b-e6014d584f99.jpg,https://alien-blog.oss-cn-beijing.aliyuncs.com/moviesDog/bdccf285-a30c-4cb3-9e54-7a90279456b7.jpg', '患有脑瘫的刘春和（易烊千玺 饰）勇敢冲破身心的枷锁，为外婆（林晓杰 饰）圆梦舞台的同时，也弥合了与妈妈（蒋勤勤 饰）的关系，并努力寻求着自己人生的坐标。在经历一个盛夏的蜕变后，他终于踏上了新的旅程。', 0, 4, 1, 0, 1, 0);

SET FOREIGN_KEY_CHECKS = 1;
