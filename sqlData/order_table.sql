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

 Date: 17/03/2025 14:28:03
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for order_table
-- ----------------------------
DROP TABLE IF EXISTS `order_table`;
CREATE TABLE `order_table`  (
  `id` int NOT NULL AUTO_INCREMENT COMMENT '主键，数据库自增',
  `user_id` int NOT NULL COMMENT '用户ID',
  `user_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '用户名称',
  `movie_id` int NOT NULL COMMENT '电影ID',
  `movie_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '电影名称',
  `cinema_id` int NULL DEFAULT NULL COMMENT '影院ID',
  `cinema_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '影院名称',
  `room_id` int NULL DEFAULT NULL COMMENT '影厅ID',
  `room_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '影厅名称',
  `showcase_id` int NULL DEFAULT NULL COMMENT '排场ID',
  `showcase_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '排场名称',
  `place_list` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL COMMENT '座位坐标',
  `price` double NULL DEFAULT NULL COMMENT '实付金额',
  `create_time` datetime NOT NULL COMMENT '创建时间，购票情况下为下单时间',
  `rate` double NULL DEFAULT NULL COMMENT '评分，满分10',
  `comment` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL COMMENT '评论内容',
  `status` int NOT NULL COMMENT '0:未支付；1:未到观影时间; 2:观影未评价; 3:观影已评价; 4:未观影已评价',
  `is_delete` int NOT NULL COMMENT '删除标记，0：未删除；1：已删除',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 36 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci COMMENT = '订单和评价表' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of order_table
-- ----------------------------
INSERT INTO `order_table` VALUES (13, 4, 'Alien', 11, '名侦探柯南：迷宫的十字路口', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, '2025-03-14 12:58:18', 7, '7', 4, 0);
INSERT INTO `order_table` VALUES (14, 4, 'Alien', 11, '名侦探柯南：迷宫的十字路口', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, '2025-03-14 12:58:26', 10, '10', 4, 0);
INSERT INTO `order_table` VALUES (15, 4, 'Alien', 11, '名侦探柯南：迷宫的十字路口', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, '2025-03-14 12:58:56', 2, '2', 4, 0);
INSERT INTO `order_table` VALUES (16, 4, 'Alien', 8, '哪吒之魔童闹海', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, '2025-03-14 13:23:59', 9, '看完发现“人们心中的成见就像一座大山无法撼动”这句话是对的。\n\n第一，土拨鼠从未杀人，吃的也是难吃到吐的南瓜粥，却被当场施刑。\n第二，申公豹他爹气宇轩昂，有教无类。教导小妖要刻苦修炼、出人头地。即便是', 4, 0);
INSERT INTO `order_table` VALUES (17, 4, 'Alien', 12, '小小的我', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, '2025-03-14 13:26:38', 4, '看得难受', 4, 0);
INSERT INTO `order_table` VALUES (22, 4, 'Alien', 11, '名侦探柯南：迷宫的十字路口', 9, '珠江巨幕影城', 11, '4号厅-巨幕IMAX', 19, '日语 2D', '[{\"row\":7,\"col\":8},{\"row\":7,\"col\":9},{\"row\":7,\"col\":10}]', 209.7, '2025-03-15 20:33:01', 0, NULL, 2, 0);
INSERT INTO `order_table` VALUES (23, 4, 'Alien', 11, '名侦探柯南：迷宫的十字路口', 13, '博纳国际影城', 23, '3号厅', 26, '日语 2D', '[{\"row\":5,\"col\":11},{\"row\":5,\"col\":12}]', 132, '2025-03-15 20:33:24', 10, '柯南牛逼', 3, 0);
INSERT INTO `order_table` VALUES (24, 4, 'Alien', 8, '哪吒之魔童闹海', 13, '博纳国际影城', 23, '3号厅', 28, '国语 3D', '[{\"row\":10,\"col\":10},{\"row\":10,\"col\":11},{\"row\":10,\"col\":12},{\"row\":10,\"col\":9}]', 264, '2025-03-15 20:33:42', 6, '票房冲冲冲！！！', 3, 0);
INSERT INTO `order_table` VALUES (25, 4, 'Alien', 11, '名侦探柯南：迷宫的十字路口', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, '2025-03-15 22:09:42', 8, '很不错', 4, 0);
INSERT INTO `order_table` VALUES (26, 4, 'Alien', 11, '名侦探柯南：迷宫的十字路口', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, '2025-03-15 22:32:54', 10, '柯南应该可以拿第一吧', 4, 0);
INSERT INTO `order_table` VALUES (27, 4, 'Alien', 9, '唐探1900', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, '2025-03-15 22:33:26', 6, '一般般', 4, 0);
INSERT INTO `order_table` VALUES (28, 4, 'Alien', 10, '平原上的火焰', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, '2025-03-15 22:34:00', 4, '一般般吧', 4, 0);
INSERT INTO `order_table` VALUES (29, 4, 'Alien', 8, '哪吒之魔童闹海', 13, '博纳国际影城', 23, '3号厅', 28, '国语 3D', '[{\"row\":6,\"col\":8},{\"row\":6,\"col\":9},{\"row\":6,\"col\":10},{\"row\":6,\"col\":11},{\"row\":6,\"col\":12}]', 330, '2025-03-15 22:39:49', 10, '我的天呐 第一部票房是不是50亿 第二部票房能不能直冲100亿 这特效也太好了吧 两个小时全程无尿点 剧情超级紧凑 而且大吒也太帅了吧 这个剧情也太 让人难以想象哇 我都不知道 2025年居然能吃到这种细糠 中国电影居然可以做到这种程度吗 太爽了 这个剧情太爽了 首映第一天 第一场就去看哪吒 过两天再来二刷 这特效怎么能做的这么完美 这么爽爆 天呐 太激动啦看得我', 3, 0);
INSERT INTO `order_table` VALUES (30, 4, 'Alien', 11, '名侦探柯南：迷宫的十字路口', 9, '珠江巨幕影城', 11, '4号厅-巨幕IMAX', 23, '日语 2D', '[{\"row\":7,\"col\":15},{\"row\":7,\"col\":16},{\"row\":7,\"col\":17},{\"row\":7,\"col\":14},{\"row\":7,\"col\":13},{\"row\":7,\"col\":18},{\"row\":7,\"col\":12},{\"row\":7,\"col\":19}]', 559.2, '2025-03-15 23:27:08', 0, NULL, 2, 0);
INSERT INTO `order_table` VALUES (31, 4, 'Alien', 11, '名侦探柯南：迷宫的十字路口', 9, '珠江巨幕影城', 8, '1号厅', 11, '日语 2D', '[{\"row\":3,\"col\":10},{\"row\":3,\"col\":9},{\"row\":2,\"col\":9},{\"row\":2,\"col\":10}]', 159.6, '2025-03-15 23:35:09', 0, NULL, 2, 0);
INSERT INTO `order_table` VALUES (32, 4, 'Alien', 11, '名侦探柯南：迷宫的十字路口', 9, '珠江巨幕影城', 11, '4号厅-巨幕IMAX', 23, '日语 2D', '[{\"row\":1,\"col\":13},{\"row\":1,\"col\":14},{\"row\":1,\"col\":15},{\"row\":1,\"col\":16},{\"row\":1,\"col\":17},{\"row\":1,\"col\":18}]', 419.4, '2025-03-15 23:41:22', 8, '牛逼', 3, 0);
INSERT INTO `order_table` VALUES (33, 4, 'Alien', 8, '哪吒之魔童闹海', 13, '博纳国际影城', 23, '3号厅', 28, '国语 3D', '[{\"row\":5,\"col\":15},{\"row\":5,\"col\":16}]', 132, '2025-03-15 23:52:34', 8, '挺不错的', 3, 0);
INSERT INTO `order_table` VALUES (34, 5, 'Sparkle', 11, '名侦探柯南：迷宫的十字路口', 9, '珠江巨幕影城', 11, '4号厅-巨幕IMAX', 23, '日语 2D', '[{\"row\":8,\"col\":15},{\"row\":8,\"col\":16}]', 139.8, '2025-03-16 14:35:51', 8, '非常好看👍', 3, 0);
INSERT INTO `order_table` VALUES (35, 5, 'Sparkle', 11, '名侦探柯南：迷宫的十字路口', 11, '万达影城', 16, '2号厅', 32, '国语 2D', '[{\"row\":4,\"col\":7},{\"row\":4,\"col\":8},{\"row\":4,\"col\":9},{\"row\":4,\"col\":10}]', 184, '2025-03-17 12:55:52', 0, NULL, 2, 0);

SET FOREIGN_KEY_CHECKS = 1;
