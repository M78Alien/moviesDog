package org.example.moviesdogserver.dao;

import jakarta.persistence.*;
import lombok.Data;

import java.util.Date;

@Entity
@Table(name = "movie_table")
@Data
public class Movie {
    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "name")
    private String name;

    @Column(name = "en_name")
    private String enName;

    @Column(name = "director")
    private String director;

    @Column(name = "scriptwriter")
    private String scriptwriter;

    @Column(name = "actor")
    private String actor;

    @Column(name = "type")
    private String type;

    @Column(name = "language")
    private String language;

    @Column(name = "country")
    private String country;

    @Column(name = "release_time")
    private Date releaseTime;

    @Column(name = "length_time")
    private Integer lengthTime;

    @Column(name = "preview_url")
    private String previewUrl;

    @Column(name = "picture_list")
    private String pictureList;

    @Column(name = "synopsis")
    private String synopsis;

    @Column(name = "sales")
    private double sales;

    @Column(name = "rate")
    private double rate;

    @Column(name = "comment")
    private Integer comment;

    @Column(name = "count")
    private Integer count;

    @Column(name = "is_open")
    private Integer isOpen;

    @Column(name = "is_delete")
    private Integer isDelete;
}
