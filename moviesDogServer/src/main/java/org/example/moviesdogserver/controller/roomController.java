package org.example.moviesdogserver.controller;

import org.example.moviesdogserver.Response;
import org.example.moviesdogserver.dao.Room;
import org.example.moviesdogserver.dao.RoomRepository;
import org.example.moviesdogserver.service.userService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class roomController {
    @Autowired
    private RoomRepository roomRepository;
    @Autowired
    private userService userService;

    @RequestMapping(value = "/room/add", method = RequestMethod.POST)
    public Response<Object> addRoom(@RequestBody Room room) {
        return Response.newSuccess(userService.addRoom(room));
    }

    @RequestMapping(value = "/room/table", method = RequestMethod.GET)
    public List<Room> getAllRooms() {
        return roomRepository.getRoomTable((""));
    }

    @RequestMapping(value = "/room/table/{text}", method = RequestMethod.GET)
    public List<Room> getRooms(@PathVariable String text) {
        return roomRepository.getRoomTable(text);
    }

    @RequestMapping(value = "/room/update", method = RequestMethod.PUT)
    public Response<Object> updateRoom(@RequestBody Room room) {
        Object response = userService.updateRoom(room);
        if (response instanceof Room) {
            return Response.newSuccess(response);
        } else {
            return Response.newFailure(response);
        }
    }

    @RequestMapping(value = "/room/detail/{id}", method = RequestMethod.GET)
    public Response<Object> getRoomDetails(@PathVariable Integer id) {
        Object response = userService.getRoomDetail(id);
        if (response instanceof Room) {
            return Response.newSuccess(response);
        } else {
            return Response.newFailure(response);
        }
    }
}
