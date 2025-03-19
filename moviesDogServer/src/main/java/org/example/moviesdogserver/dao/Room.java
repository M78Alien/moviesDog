package org.example.moviesdogserver.dao;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "room_table")
@Data
public class Room {
    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "name")
    private String name;

    @Column(name = "cinema_id")
    private Integer cinemaId;

    @Column(name = "cinema_name")
    private String cinemaName;

    @Column(name = "cinema_address")
    private String cinemaAddress;

    @Column(name = "size_type")
    private String sizeType;

    @Column(name = "price")
    private double price;

    @Column(name = "is_delete")
    private Integer isDelete;
}
