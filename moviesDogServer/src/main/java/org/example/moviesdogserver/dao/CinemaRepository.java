package org.example.moviesdogserver.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CinemaRepository extends JpaRepository<Cinema, Integer> {
    Optional<Cinema> findByPhoneNumber(String phoneNumber);

    @Query(value = "SELECT * FROM `cinema_table` WHERE is_delete <> 1 AND name LIKE CONCAT('%', :text, '%')", nativeQuery = true)
    List<Cinema> getCinemaTable(String text);

    @Query(value = "SELECT t.cinema_id, t.cinema_name, t.show_date, t.show_times, c.address, MIN(r.price) " +
            "FROM ( " +
            " SELECT cinema_id, cinema_name, DATE(show_time) AS show_date, GROUP_CONCAT(DISTINCT TIME(DATE_FORMAT(show_time, '%H:%i'))) AS show_times " +
            " FROM showcase_table " +
            " WHERE is_delete = 0 AND show_time LIKE concat('%', :date, '%') AND movie_id = :cinemaId AND show_time >= NOW() " +
            " GROUP BY cinema_id, cinema_name, show_date " +
            ") t  " +
            "LEFT JOIN cinema_table c " +
            "ON t.cinema_id = c.id " +
            "LEFT JOIN room_table r " +
            "ON t.cinema_id = r.cinema_id " +
            "GROUP BY t.cinema_id, t.cinema_name, t.show_date, t.show_times, c.address", nativeQuery = true)
    List<Object> findCinema(String date, Integer cinemaId);
}
