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

 Date: 17/03/2025 14:27:37
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for cinema_table
-- ----------------------------
DROP TABLE IF EXISTS `cinema_table`;
CREATE TABLE `cinema_table`  (
  `id` int NOT NULL AUTO_INCREMENT COMMENT '主键',
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '影院名称',
  `address` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '影院地址',
  `type` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '影院类型',
  `concact_number` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '联系电话',
  `phone_number` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '管理员手机号',
  `password` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '管理员密码',
  `notice` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '影院公告',
  `is_open` int NOT NULL COMMENT '开业状态，0：未开业；1：已开业',
  `is_delete` int NOT NULL COMMENT '删除标记， 0：未删除；1：已删除',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 14 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci COMMENT = '影院表' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of cinema_table
-- ----------------------------
INSERT INTO `cinema_table` VALUES (9, '珠江巨幕影城', '大岭山镇松山湖博恒二路1号佳纷天地', NULL, '18002244532', '18002244532', '123456', '1、影厅入口处设有免洗洗手液； \n2、请勿在影院内吸烟； \n3、放映期间，请勿喧哗；\n4、进入影城请全程佩戴口罩。', 1, 0);
INSERT INTO `cinema_table` VALUES (10, '中影星河电影城', '大岭山镇教育路天和百货五楼', NULL, '0769-81623666', '13000000000', '123456', '请勿在影院内抽烟；影片放映时请勿大声喧哗；家长需看管好儿童，避免发生意外；影厅银幕属于贵重物品，请勿触碰，损坏照价赔偿。', 1, 0);
INSERT INTO `cinema_table` VALUES (11, '万达影城', '大岭山镇领尚天地购物广场F4层', NULL, '0755-29188886', '18098291759', '123456', '1、免费提供公用3D眼镜,登记领取用后归还 \n2、1.3米以下儿童可免费无座观影2D、3D影片。特色影厅（VIP, IMAX，杜比，CINITY）除外。一名成人限带一名免费观影儿童。 \n3、客服电话： 0755-29188886，服务时间段为：09:00~24:00 ', 1, 0);
INSERT INTO `cinema_table` VALUES (12, '万象影城', '寮步镇松山湖新城路11号华润万象汇L501', NULL, '18576855508', '18576855508', '123456', '1、下单前请仔细核对影片、影院、场次等信息，券支付不支持退改签和返回； \n2、下单后请于15分钟内完成支付， 超时未支付系统将不 再保留座位； \n3、3D影片影城提供免费3D眼镜，检票口提供免押金毛毯 借用； \n4、影片开映前1小时内不支持退改签， 非会员退改签需支 付手续费； \n5、1.3米 （不含）以下儿童观看电影免票无座；一位成人 限带一位儿童观影； \n6、 影城谢绝外带有异味的食品以及宠物进入影厅。', 1, 0);
INSERT INTO `cinema_table` VALUES (13, '博纳国际影城', '东城街道东升路229号星河城3层', NULL, '0769-26626866', '13000000001', '123456', '1、1.3m以下免费；\n2、影院提供免费WIFI。', 1, 0);

SET FOREIGN_KEY_CHECKS = 1;
