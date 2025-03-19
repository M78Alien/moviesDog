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

 Date: 17/03/2025 14:28:20
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for user_table
-- ----------------------------
DROP TABLE IF EXISTS `user_table`;
CREATE TABLE `user_table`  (
  `id` int NOT NULL AUTO_INCREMENT COMMENT '主键，数据库自增',
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '用户名',
  `phone_number` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '用户注册手机号',
  `password` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '用户登录密码',
  `user_profile` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '用户头像，可以为空，数据库存放图片地址',
  `is_delete` int NOT NULL COMMENT '删除标记，0：未删除；1：已删除',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 7 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci COMMENT = '用户表' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of user_table
-- ----------------------------
INSERT INTO `user_table` VALUES (4, 'Alien', '15820871626', '123456', 'https://alien-blog.oss-cn-beijing.aliyuncs.com/moviesDog/77b662ed-0129-4375-bca9-26c08f64928c.jpg', 0);
INSERT INTO `user_table` VALUES (5, 'Sparkle', '13246952243', '123456', 'https://alien-blog.oss-cn-beijing.aliyuncs.com/moviesDog/66cae9c2-8c2a-4813-87a2-7378853f17d3.jpg', 0);
INSERT INTO `user_table` VALUES (6, 'cm', '13538625175', '123456', NULL, 0);

SET FOREIGN_KEY_CHECKS = 1;
