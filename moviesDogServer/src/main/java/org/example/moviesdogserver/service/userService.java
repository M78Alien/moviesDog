package org.example.moviesdogserver.service;

import org.example.moviesdogserver.dao.*;

public interface userService {
    // 获取用户信息
    Object getUserById(int id);
    // 添加用户信息
    Object addNewUser(User user);
    // 更新用户信息
    Object updateUser(int id, String name, String password, String userProfile);
    // 获取影院信息
    Object getCinemaById(int id);
    // 注册影院
    Object addNewCinema(Cinema cinema);
    // 登录影院管理员
    Object loginCinemaAdmin(String phoneNumber, String password);
    // 导入电影信息
    Object addMovie(Movie movie);
    // 查询电影表格
    Object getMovieTable(String text);
    // 编辑电影信息
    Object updateMovie(Movie movie);
    // 编辑影院信息
    Object updateCinema(Cinema cinema);
    // 创建影厅信息
    Object addRoom(Room room);
    // 编辑影厅信息
    Object updateRoom(Room room);
    // 添加排场信息
    Object addShowcase(Showcase showcase);
    // 删除排场信息
    Object deleteShowcase(Integer id);


    // 小程序用户注册登录
    Object addLoginUser(String username, String phoneNumber, String password);
    // 小程序获取电影详情信息
    Object getMovieDetails(int id);
    // 添加评论
    Object addComment(Order order);
    // 用户更换头像
    Object updateProfile(Integer id, String profile);
    // 获取影厅详细详细
    Object getRoomDetail(Integer id);
    // 添加订单
    Object addOrder(Order order);
    // 获取排场详情
    Object getShowcaseDetail(Integer id);
    // 在订单中添加评论
    Object addCommentToOrder(Integer id, double rate, String comment);
    // 获取订单详情
    Object getOrderDetail(Integer id);
}
