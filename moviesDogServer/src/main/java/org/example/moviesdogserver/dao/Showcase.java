package org.example.moviesdogserver.dao;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.Date;

@Entity
@Table(name = "showcase_table")
@Data
public class Showcase {
    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "showcase_name")
    private String showcaseName;

    @Column(name = "cinema_id")
    private Integer cinemaId;

    @Column(name = "cinema_name")
    private String cinemaName;

    @Column(name = "room_id")
    private Integer roomId;

    @Column(name = "room_name")
    private String roomName;

    @Column(name = "movie_id")
    private Integer movieId;

    @Column(name = "movie_name")
    private String movieName;

    @Column(name = "show_time")
    private Date showTime;

    @Column(name = "price")
    private double price;

    @Column(name = "is_delete")
    private Integer isDelete;
}
