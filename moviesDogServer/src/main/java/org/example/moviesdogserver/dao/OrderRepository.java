package org.example.moviesdogserver.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface OrderRepository extends JpaRepository<Order, Integer> {

    @Query(value = "SELECT o.id, user_id, user_name, movie_id, movie_name, cinema_id, " +
            "room_id, room_name, showcase_id, showcase_name, place_list, price, " +
            "create_time, rate, comment, status, o.is_delete, user_profile AS cinema_name FROM `order_table` o " +
            "LEFT JOIN user_table u ON o.user_id = u.id " +
            "WHERE movie_id = :movieId " +
            "AND o.comment is not NULL " +
            "AND o.is_delete = 0 ORDER BY create_time DESC",
            nativeQuery = true)
    List<Order> getCommentList(Integer movieId);

    @Query(value = "SELECT o.id, user_id, user_name, movie_id, movie_name, cinema_name, " +
            "room_id, cinema_id, showcase_id, showcase_name, place_list, price, create_time, " +
            "o.rate, o.comment, status, o.is_delete, picture_list AS room_name " +
            "FROM `order_table` o " +
            "LEFT JOIN movie_table m " +
            "ON o.movie_id = m.id " +
            "WHERE user_id = :userId " +
            "AND o.is_delete = 0 " +
            "AND o.comment is not NULL " +
            "ORDER BY create_time DESC", nativeQuery = true)
    List<Order> getCommentListForUser(Integer userId);

    @Query(value = "SELECT o.id, o.movie_id, o.movie_name, o.cinema_id, o.cinema_name, o.room_id, o.room_name, o.showcase_name, " +
            "o.place_list, o.price, o.status, m.picture_list, s.show_time, o.create_time " +
            "FROM order_table o " +
            "LEFT JOIN movie_table m " +
            "ON o.movie_id = m.id " +
            "LEFT JOIN showcase_table s  " +
            "ON o.showcase_id = s.id " +
            "WHERE o.is_delete = 0 " +
            "AND o.user_id = :userId " +
            "AND o.cinema_id IS NOT NULL " +
            "ORDER BY create_time DESC", nativeQuery = true)
    List<Object> getOrderListForUser(Integer userId);

    @Query(value = "SELECT * FROM order_table WHERE is_delete = 0 AND user_name LIKE CONCAT('%', :text, '%') ORDER BY id DESC", nativeQuery = true)
    List<Order> getOrderTable(String text);

    @Query(value = "SELECT * FROM `order_table` WHERE is_delete = 0 AND user_id = :id AND cinema_id is not null ", nativeQuery = true)
    List<Order> getOrderTableForUser(Integer id);

    @Query(value = "SELECT m.name, m.sales, COALESCE(t.price, 0) " +
            "FROM movie_table m " +
            "LEFT JOIN ( " +
            "SELECT movie_name, SUM(price) AS price FROM order_table WHERE cinema_id IS NOT NULL AND DATE(create_time) = CURDATE() GROUP BY movie_name " +
            ") t " +
            "ON m.name = t.movie_name " +
            "ORDER BY sales DESC  " +
            "LIMIT 5", nativeQuery = true)
    List<Object> getSalesRank();
}