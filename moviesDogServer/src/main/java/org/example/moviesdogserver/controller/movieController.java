package org.example.moviesdogserver.controller;

import org.example.moviesdogserver.Response;
import org.example.moviesdogserver.dao.Movie;
import org.example.moviesdogserver.dao.MovieRepository;
import org.example.moviesdogserver.service.userService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class movieController {
    @Autowired
    private userService userService;
    @Autowired
    private MovieRepository movieRepository;

    // 导入电影信息
    @RequestMapping(value = "/movie", method = RequestMethod.POST)
    public Response<Object> addMovie(@RequestBody Movie movie) {
        Object response = userService.addMovie(movie);
         if (response instanceof Movie) {
             return Response.newSuccess(response);
         } else {
             return Response.newFailure(response);
         }
    }

    // 返回所有电影
    @RequestMapping(value = "/movie/table", method = RequestMethod.GET)
    public List<Movie> getAllMovies() {
        return movieRepository.getMovieTable("");
    }

    // 执行模糊查询
    @RequestMapping(value = "/movie/table/{text}", method = RequestMethod.GET)
    public List<Movie> getMovieTable(@PathVariable String text) {
        return movieRepository.getMovieTable(text);
    }

    // 编辑电影信息
    @RequestMapping(value = "/movie/update", method = RequestMethod.PUT)
    public Response<Object> editMovie(@RequestBody Movie movie) {
        Object response = userService.updateMovie(movie);
        if (response instanceof Movie) {
            return Response.newSuccess(response);
        } else {
            return Response.newFailure(response);
        }
    }

    // 小程序获取全部电影
    @RequestMapping(value = "/movie/all", method = RequestMethod.GET)
    public List<Movie> getMovies(@RequestParam(required = false, defaultValue = "") String text,
                                 @RequestParam(required = false, defaultValue = "") String type,
                                 @RequestParam(required = false, defaultValue = "") String language,
                                 @RequestParam(required = false, defaultValue = "") String country) {
        return movieRepository.getMovieApp(text, type, language, country);
    }

    // 小程序获取电影详情信息
    @RequestMapping(value = "/movie/detail/{id}", method = RequestMethod.GET)
    public Response<Object> getMovieDetails(@PathVariable Integer id) {
        Object response = userService.getMovieDetails(id);
        if (response instanceof Movie) {
            return Response.newSuccess(response);
        } else {
            return Response.newFailure(response);
        }
    }

    // 获取高分排行
    @RequestMapping(value = "/movie/rate", method = RequestMethod.GET)
    public List<Movie> getMovieRate() {
        return movieRepository.getMovieRate();
    }

    // 获取票房排名
    @RequestMapping(value = "/movie/sale", method = RequestMethod.GET)
    public List<Movie> getMovieSales() {
        return movieRepository.getMovieSales();
    }

    // 获取票房冠军
    @RequestMapping(value = "/movie/champion", method = RequestMethod.GET)
    public String getMovieChampion() {
        return movieRepository.getMovieSalesChampion();
    }

    // 获取票房排行图表数据
    @RequestMapping(value = "/chart/sales", method = RequestMethod.GET)
    public List<Object> getMovieSalesRank() {
        return movieRepository.getMovieSalesRank();
    }

    // 获取评分排行图表数据
    @RequestMapping(value = "/chart/rate", method = RequestMethod.GET)
    public List<Object> getMovieRateRank() {
        return movieRepository.getMovieRateRank();
    }

    // 获取影院排行数据
    @RequestMapping(value = "/chart/cinema", method = RequestMethod.GET)
    public List<Object> getMovieCinemaRank() {
        return movieRepository.getMovieCinemaRank();
    }
}
