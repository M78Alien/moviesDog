package org.example.moviesdogserver.dao;

import jakarta.persistence.*;
import lombok.Data;

import java.util.Date;

@Entity
@Table(name = "order_table")
@Data
public class Order {
    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "user_id")
    private Integer userId;

    @Column(name = "user_name")
    private String userName;

    @Column(name = "movie_id")
    private Integer movieId;

    @Column(name = "movie_name")
    private String movieName;

    @Column(name = "cinema_id")
    private Integer cinemaId;

    @Column(name = "cinema_name")
    private String cinemaName;

    @Column(name = "room_id")
    private Integer roomId;

    @Column(name = "room_name")
    private String roomName;

    @Column(name = "showcase_id")
    private Integer showcaseId;

    @Column(name = "showcase_name")
    private String showcaseName;

    @Column(name = "place_list")
    private String placeList;

    @Column(name = "price")
    private double price;

    @Column(name = "create_time")
    private Date createTime;

    @Column(name = "rate")
    private double rate;

    @Column(name = "comment")
    private String comment;

    @Column(name = "status")
    private Integer status;

    @Column(name = "is_delete")
    private Integer isDelete;

}
