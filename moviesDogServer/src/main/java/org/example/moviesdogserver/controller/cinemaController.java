package org.example.moviesdogserver.controller;

import org.example.moviesdogserver.Response;
import org.example.moviesdogserver.dao.Cinema;
import org.example.moviesdogserver.dao.CinemaRepository;
import org.example.moviesdogserver.service.userService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class cinemaController {
    @Autowired
    private CinemaRepository cinemaRepository;
    @Autowired
    private userService userService;

    @RequestMapping(value = "/cinema/{id}", method = RequestMethod.GET)
    public Response<Object> getCinema(@PathVariable int id) {
        Object response = userService.getCinemaById(id);
        if (response instanceof Cinema) {
            return Response.newSuccess(response);
        } else {
            return Response.newFailure(response);
        }
    }

    @RequestMapping(value = "/cinema", method = RequestMethod.POST)
    public Response<Object> addCinema(@RequestBody Cinema cinema) {
        Object response = userService.addNewCinema(cinema);

        if (response instanceof Cinema) {
            return Response.newSuccess(response);
        } else {
            return Response.newFailure(response);
        }
    }

    @RequestMapping(value = "/cinema/login", method = RequestMethod.POST)
    public Response<Object> onLogin(@RequestBody Cinema cinema) {
        Object response = userService.loginCinemaAdmin(cinema.getPhoneNumber(), cinema.getPassword());

        if (response instanceof Cinema) {
            return Response.newSuccess(response);
        } else {
            return Response.newFailure(response);
        }
    }
//
    @RequestMapping(value = "/cinema/table", method = RequestMethod.GET)
    public List<Cinema> getCinemaTable() {
        return cinemaRepository.getCinemaTable("");
    }

    @RequestMapping(value = "/cinema/table/{text}", method = RequestMethod.GET)
    public List<Cinema> getCinemaTable(@PathVariable String text) {
        return cinemaRepository.getCinemaTable(text);
    }

    @RequestMapping(value = "/cinema/update", method = RequestMethod.POST)
    public Response<Object> updateCinema(@RequestBody Cinema cinema) {
        Object response = userService.updateCinema(cinema);
        if (response instanceof Cinema) {
            return Response.newSuccess(response);
        } else {
            return Response.newFailure(response);
        }
    }

    @RequestMapping(value = "/cinema/movie/{date}/{cinemaId}", method = RequestMethod.GET)
    public List<Object> findCinemaList(@PathVariable String date, @PathVariable int cinemaId) {
        return cinemaRepository.findCinema(date, cinemaId);
    }
}
