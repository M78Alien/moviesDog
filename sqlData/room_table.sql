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

 Date: 17/03/2025 14:28:09
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for room_table
-- ----------------------------
DROP TABLE IF EXISTS `room_table`;
CREATE TABLE `room_table`  (
  `id` int NOT NULL AUTO_INCREMENT COMMENT '主键',
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '影厅名称',
  `cinema_id` int NOT NULL COMMENT '所属影院ID',
  `cinema_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '影院名称',
  `cinema_address` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '影院地址',
  `size_type` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '影厅尺寸',
  `price` double NOT NULL COMMENT '影厅价格',
  `is_delete` int NOT NULL COMMENT '删除标记， 0：未删除；1已删除',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 26 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci COMMENT = '影厅表' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of room_table
-- ----------------------------
INSERT INTO `room_table` VALUES (8, '1号厅', 9, '珠江巨幕影城', '大岭山镇松山湖博恒二路1号佳纷天地', 'small', 39.9, 0);
INSERT INTO `room_table` VALUES (9, '2号厅', 9, '珠江巨幕影城', '大岭山镇松山湖博恒二路1号佳纷天地', 'medium', 49.9, 0);
INSERT INTO `room_table` VALUES (10, '3号厅', 9, '珠江巨幕影城', '大岭山镇松山湖博恒二路1号佳纷天地', 'large', 49.9, 0);
INSERT INTO `room_table` VALUES (11, '4号厅-巨幕IMAX', 9, '珠江巨幕影城', '大岭山镇松山湖博恒二路1号佳纷天地', 'super', 69.9, 0);
INSERT INTO `room_table` VALUES (12, '1号标准厅', 10, '中影星河电影城', '大岭山镇教育路天和百货五楼', 'medium', 46, 0);
INSERT INTO `room_table` VALUES (13, '2号大厅', 10, '中影星河电影城', '大岭山镇教育路天和百货五楼', 'large', 52, 0);
INSERT INTO `room_table` VALUES (14, '3号巨幕厅-IMAX', 10, '中影星河电影城', '大岭山镇教育路天和百货五楼', 'super', 65, 0);
INSERT INTO `room_table` VALUES (15, '1号-万达巨幕厅', 11, '万达影城', '大岭山镇领尚天地购物广场F4层', 'super', 69, 0);
INSERT INTO `room_table` VALUES (16, '2号厅', 11, '万达影城', '大岭山镇领尚天地购物广场F4层', 'medium', 46, 0);
INSERT INTO `room_table` VALUES (17, '3号厅', 11, '万达影城', '大岭山镇领尚天地购物广场F4层', 'super', 65, 0);
INSERT INTO `room_table` VALUES (18, '1号厅', 12, '万象影城', '寮步镇松山湖新城路11号华润万象汇L501', 'small', 29, 0);
INSERT INTO `room_table` VALUES (19, '2号厅', 12, '万象影城', '寮步镇松山湖新城路11号华润万象汇L501', 'medium', 39, 0);
INSERT INTO `room_table` VALUES (20, '3号厅', 12, '万象影城', '寮步镇松山湖新城路11号华润万象汇L501', 'super', 69, 0);
INSERT INTO `room_table` VALUES (21, '1号厅', 13, '博纳国际影城', '东城街道东升路229号星河城3层', 'medium', 33, 0);
INSERT INTO `room_table` VALUES (22, '2号厅', 13, '博纳国际影城', '东城街道东升路229号星河城3层', 'large', 44, 0);
INSERT INTO `room_table` VALUES (23, '3号厅', 13, '博纳国际影城', '东城街道东升路229号星河城3层', 'super', 66, 0);
INSERT INTO `room_table` VALUES (24, '4号-小厅', 10, '中影星河电影城', '大岭山镇教育路天和百货五楼', 'small', 29.9, 1);
INSERT INTO `room_table` VALUES (25, '4号厅', 10, '中影星河电影城', '大岭山镇教育路天和百货五楼', 'small', 29.9, 0);

SET FOREIGN_KEY_CHECKS = 1;
