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

 Date: 17/03/2025 14:28:15
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for showcase_table
-- ----------------------------
DROP TABLE IF EXISTS `showcase_table`;
CREATE TABLE `showcase_table`  (
  `id` int NOT NULL AUTO_INCREMENT COMMENT '主键',
  `showcase_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '排场名称',
  `cinema_id` int NOT NULL COMMENT '影院ID',
  `cinema_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '影院名称',
  `room_id` int NOT NULL COMMENT '影厅ID',
  `room_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '影厅名称',
  `movie_id` int NOT NULL COMMENT '电影ID',
  `movie_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '电影名称',
  `show_time` datetime NOT NULL COMMENT '放映时间',
  `price` double NOT NULL COMMENT '票价',
  `is_delete` int NOT NULL COMMENT '删除标记， 0：未删除；1：已删除',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 33 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci COMMENT = '排场表' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of showcase_table
-- ----------------------------
INSERT INTO `showcase_table` VALUES (10, '国语 3D', 9, '珠江巨幕影城', 8, '1号厅', 8, '哪吒之魔童闹海', '2025-03-17 14:30:00', 39.9, 0);
INSERT INTO `showcase_table` VALUES (11, '日语 2D', 9, '珠江巨幕影城', 8, '1号厅', 11, '名侦探柯南：迷宫的十字路口', '2025-03-17 18:30:00', 39.9, 0);
INSERT INTO `showcase_table` VALUES (12, '国语 2D', 9, '珠江巨幕影城', 8, '1号厅', 9, '唐探1900', '2025-03-17 21:30:00', 39.9, 0);
INSERT INTO `showcase_table` VALUES (13, '国语 3D', 9, '珠江巨幕影城', 11, '4号厅-巨幕IMAX', 8, '哪吒之魔童闹海', '2025-03-18 14:00:00', 69.9, 0);
INSERT INTO `showcase_table` VALUES (14, '日语 2D', 9, '珠江巨幕影城', 11, '4号厅-巨幕IMAX', 11, '名侦探柯南：迷宫的十字路口', '2025-03-18 17:00:00', 69.9, 0);
INSERT INTO `showcase_table` VALUES (15, '国语 2D', 9, '珠江巨幕影城', 11, '4号厅-巨幕IMAX', 12, '小小的我', '2025-03-18 21:00:00', 69.9, 0);
INSERT INTO `showcase_table` VALUES (16, '日语 2D', 9, '珠江巨幕影城', 11, '4号厅-巨幕IMAX', 11, '名侦探柯南：迷宫的十字路口', '2025-03-14 23:00:00', 69.9, 0);
INSERT INTO `showcase_table` VALUES (17, '日语 2D', 9, '珠江巨幕影城', 11, '4号厅-巨幕IMAX', 11, '名侦探柯南：迷宫的十字路口', '2025-03-15 10:00:00', 69.9, 0);
INSERT INTO `showcase_table` VALUES (18, '日语 2D', 9, '珠江巨幕影城', 11, '4号厅-巨幕IMAX', 11, '名侦探柯南：迷宫的十字路口', '2025-03-15 14:00:00', 69.9, 0);
INSERT INTO `showcase_table` VALUES (19, '日语 2D', 9, '珠江巨幕影城', 11, '4号厅-巨幕IMAX', 11, '名侦探柯南：迷宫的十字路口', '2025-03-15 17:00:00', 69.9, 0);
INSERT INTO `showcase_table` VALUES (20, '日语 2D', 9, '珠江巨幕影城', 11, '4号厅-巨幕IMAX', 11, '名侦探柯南：迷宫的十字路口', '2025-03-16 12:00:00', 69.9, 0);
INSERT INTO `showcase_table` VALUES (21, '日语 2D', 9, '珠江巨幕影城', 11, '4号厅-巨幕IMAX', 11, '名侦探柯南：迷宫的十字路口', '2025-03-16 18:00:00', 69.9, 0);
INSERT INTO `showcase_table` VALUES (22, '日语 2D', 9, '珠江巨幕影城', 11, '4号厅-巨幕IMAX', 11, '名侦探柯南：迷宫的十字路口', '2025-03-17 18:00:00', 69.9, 0);
INSERT INTO `showcase_table` VALUES (23, '日语 2D', 9, '珠江巨幕影城', 11, '4号厅-巨幕IMAX', 11, '名侦探柯南：迷宫的十字路口', '2025-03-18 18:00:00', 69.9, 0);
INSERT INTO `showcase_table` VALUES (24, '日语 2D', 13, '博纳国际影城', 23, '3号厅', 11, '名侦探柯南：迷宫的十字路口', '2025-03-14 23:00:00', 66, 0);
INSERT INTO `showcase_table` VALUES (25, '日语 2D', 13, '博纳国际影城', 23, '3号厅', 11, '名侦探柯南：迷宫的十字路口', '2025-03-15 11:00:00', 66, 0);
INSERT INTO `showcase_table` VALUES (26, '日语 2D', 13, '博纳国际影城', 23, '3号厅', 11, '名侦探柯南：迷宫的十字路口', '2025-03-15 17:00:00', 66, 0);
INSERT INTO `showcase_table` VALUES (27, '日语 2D', 13, '博纳国际影城', 23, '3号厅', 11, '名侦探柯南：迷宫的十字路口', '2025-03-15 23:00:00', 66, 0);
INSERT INTO `showcase_table` VALUES (28, '国语 3D', 13, '博纳国际影城', 23, '3号厅', 8, '哪吒之魔童闹海', '2025-03-15 20:00:00', 66, 0);
INSERT INTO `showcase_table` VALUES (29, '日语 2D', 9, '珠江巨幕影城', 8, '1号厅', 11, '名侦探柯南：迷宫的十字路口', '2025-03-15 22:00:00', 39.9, 0);
INSERT INTO `showcase_table` VALUES (30, '国语 2D', 11, '万达影城', 16, '2号厅', 11, '名侦探柯南：迷宫的十字路口', '2025-03-17 09:00:00', 46, 0);
INSERT INTO `showcase_table` VALUES (31, '国语 2D', 11, '万达影城', 15, '1号-万达巨幕厅', 11, '名侦探柯南：迷宫的十字路口', '2025-03-18 09:00:00', 69, 1);
INSERT INTO `showcase_table` VALUES (32, '国语 2D', 11, '万达影城', 16, '2号厅', 11, '名侦探柯南：迷宫的十字路口', '2025-03-18 09:00:00', 46, 0);

SET FOREIGN_KEY_CHECKS = 1;
