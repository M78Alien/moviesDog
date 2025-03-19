package org.example.moviesdogserver.controller;

import org.example.moviesdogserver.Response;
import org.example.moviesdogserver.dao.Showcase;
import org.example.moviesdogserver.dao.ShowcaseRepository;
import org.example.moviesdogserver.service.userService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class showcaseController {
    @Autowired
    private ShowcaseRepository showcaseRepository;
    @Autowired
    private userService userService;

    @RequestMapping(value = "/showcase/add", method = RequestMethod.POST)
    public Response<Object> addShowcase(@RequestBody Showcase showcase) {
        Object response = userService.addShowcase(showcase);
        if (response instanceof Showcase) {
            return Response.newSuccess(response);
        } else {
            return Response.newFailure(response);
        }
    }

    @RequestMapping(value = "/showcase/get/{cinemaId}/{roomId}", method = RequestMethod.GET)
    public List<Showcase> getShowcaseTable(@PathVariable Integer cinemaId, @PathVariable Integer roomId) {
        return showcaseRepository.getShowcaseTable(cinemaId, roomId);
    }

    @RequestMapping(value = "/showcase/del/{id}", method = RequestMethod.PUT)
    public Response<Object> delShowcase(@PathVariable Integer id) {
        Object response = userService.deleteShowcase(id);
        if (response instanceof Showcase) {
            return Response.newSuccess(response);
        } else {
            return Response.newFailure(response);
        }
    }

    @RequestMapping(value = "/showcase/list", method = RequestMethod.GET)
    public List<Object> getShowcaseList(@RequestParam Integer cinemaId, @RequestParam Integer movieId, @RequestParam String date) {
        return showcaseRepository.findShowcase(cinemaId, movieId, date);
    }

    @RequestMapping(value = "/showcase/detail/{id}", method = RequestMethod.GET)
    public Object getShowcaseDetail(@PathVariable Integer id) {
        return showcaseRepository.getShowcaseDetail(id);
    }

    @RequestMapping(value = "/showcase/detail/date/{id}", method = RequestMethod.GET)
    public Object getShowcaseDetailDate(@PathVariable Integer id) {
        return userService.getShowcaseDetail(id);
    }

    @RequestMapping(value = "/showcase/case/{id}", method = RequestMethod.GET)
    public List<Object> getSelectedCase(@PathVariable Integer id) {
        return showcaseRepository.getSelectedCase(id);
    }
}
