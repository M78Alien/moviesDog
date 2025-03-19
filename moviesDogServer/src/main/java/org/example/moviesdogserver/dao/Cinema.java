package org.example.moviesdogserver.dao;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "cinema_table")
@Data
public class Cinema {
    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "name")
    private String name;

    @Column(name = "address")
    private String address;

    @Column(name = "type")
    private String type;

    @Column(name = "concact_number")
    private String concactNumber;

    @Column(name = "phone_number")
    private String phoneNumber;

    @Column(name = "password")
    private String password;

    @Column(name = "notice")
    private String notice;

    @Column(name = "is_open")
    private Boolean isOpen;

    @Column(name = "is_delete")
    private Boolean isDelete;
}
