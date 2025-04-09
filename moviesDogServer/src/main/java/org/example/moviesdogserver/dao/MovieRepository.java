package org.example.moviesdogserver.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface MovieRepository extends JpaRepository<Movie, Integer> {

    @Query(value = "SELECT * FROM `movie_table` WHERE is_delete <> 1 AND name LIKE CONCAT('%', :text, '%')", nativeQuery = true)
    List<Movie> getMovieTable(String text);

    @Query(value = "SELECT * FROM `movie_table` " +
            "WHERE `name` LIKE CONCAT('%', :text, '%') " +
            "AND type LIKE CONCAT('%', :type, '%') " +
            "AND `language` LIKE CONCAT('%', :language, '%') " +
            "AND country LIKE CONCAT('%', :country, '%')", nativeQuery = true)
    List<Movie> getMovieApp(String text, String type, String language, String country);

    @Query(value = "SELECT * FROM movie_table WHERE is_delete = 0 ORDER BY rate DESC", nativeQuery = true)
    List<Movie> getMovieRate();

    @Query(value = "SELECT * FROM movie_table WHERE is_delete = 0 ORDER BY sales DESC", nativeQuery = true)
    List<Movie> getMovieSales();

    @Query(value = "SELECT name FROM movie_table WHERE is_delete = 0 ORDER BY sales DESC LIMIT 1", nativeQuery = true)
    String getMovieSalesChampion();

    @Query(value = "SELECT name, sales FROM `movie_table` WHERE is_delete = 0 ORDER BY sales DESC LIMIT 5", nativeQuery = true)
    List<Object> getMovieSalesRank();

    @Query(value = "SELECT movie_name, ROUND(AVG(rate), 1) AS rate, count(`comment`) FROM order_table GROUP BY movie_name ORDER BY rate DESC LIMIT 5", nativeQuery = true)
    List<Object> getMovieRateRank();

    @Query(value = "SELECT cinema_name, SUM(price) * 100000 AS priceSum FROM `order_table` WHERE cinema_id IS NOT NULL GROUP BY cinema_name ORDER BY priceSum DESC", nativeQuery = true)
    List<Object> getMovieCinemaRank();
}
