package org.example.moviesdogserver.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ShowcaseRepository extends JpaRepository<Showcase, Integer> {
    @Query(value = "SELECT * FROM `showcase_table` WHERE is_delete <> 1 AND cinema_id = :cinemaId AND room_id = :roomId", nativeQuery = true)
    List<Showcase> getShowcaseTable(Integer cinemaId, Integer roomId);

    @Query(value = "SELECT id, showcase_name, room_id, room_name, " +
            "DATE_FORMAT(show_time, '%H:%i') AS show_times, price " +
            "FROM showcase_table " +
            "WHERE is_delete = 0 AND cinema_id = :cinemaId AND movie_id = :movieId AND show_time LIKE concat('%', :date, '%') AND show_time >= NOW() " +
            "ORDER BY show_time", nativeQuery = true)
    List<Object> findShowcase(Integer cinemaId, Integer movieId, String date);

    @Query(value = "SELECT s.*, r.size_type " +
            "FROM showcase_table s  " +
            "LEFT JOIN room_table r " +
            "ON s.room_id = r.id " +
            "WHERE s.is_delete = 0 AND s.id = :id", nativeQuery = true)
    Object getShowcaseDetail(Integer id);

    @Query(value = "SELECT place_list FROM order_table WHERE place_list IS NOT NULL AND showcase_id = :id", nativeQuery = true)
    List<Object> getSelectedCase(Integer id);
}
