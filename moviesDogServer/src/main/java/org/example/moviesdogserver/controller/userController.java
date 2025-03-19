package org.example.moviesdogserver.controller;

import org.example.moviesdogserver.Response;
import org.example.moviesdogserver.dao.CinemaRepository;
import org.example.moviesdogserver.dao.User;
import org.example.moviesdogserver.dao.UserRepository;
import org.example.moviesdogserver.service.userService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class userController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private userService userService;

    @Autowired
    private CinemaRepository cinemaRepository;

//    @RequestMapping(value = "/user/{id}", method = RequestMethod.GET)
//    public Response<Object> getUser(@PathVariable int id) {
//        Object response = userService.getUserById(id);
//
//        if (response instanceof User) {
//            return Response.newSuccess(response);
//        } else {
//            return Response.newFailure(response);
//        }
//    }

    @RequestMapping(value = "/user", method = RequestMethod.POST)
    public Response<Object> addUser(@RequestBody User user) {
        Object response = userService.addNewUser(user);

        if (response instanceof User) {
            return Response.newSuccess(response);
        } else {
            return Response.newFailure(response);
        }
    }

    @RequestMapping(value = "/user/{id}", method = RequestMethod.PUT)
    public Response<Object> updateUser(@PathVariable int id, @RequestParam(required = false) String name,
                                       @RequestParam(required = false) String password,
                                       @RequestParam(required = false) String userProfile) {
        Object response = userService.updateUser(id, name, password, userProfile);

        if (response instanceof User) {
            return Response.newSuccess(response);
        } else {
            return Response.newFailure(response);
        }
    }

    @RequestMapping(value = "/user", method = RequestMethod.GET)
    public List<User> getUsersTable() {
        return userRepository.findAll();
    }

    @RequestMapping(value = "/user/{text}", method = RequestMethod.GET)
    public List<User> getUsersTable(@PathVariable String text) {
        return userRepository.getUsersTableLike(text);
    }

    @RequestMapping(value = "/user/login", method = RequestMethod.POST)
    public Response<Object> login(@RequestBody User user) {
        Object response = userService.addLoginUser(user.getName(), user.getPhoneNumber(), user.getPassword());

        if (response instanceof User) {
            return Response.newSuccess(response);
        } else {
            return Response.newFailure(response);
        }
    }

    @RequestMapping(value = "/user/profile", method = RequestMethod.PUT)
    public Response<Object> updateUserProfile(@RequestBody User user) {
        Object response = userService.updateProfile(user.getId(), user.getUserProfile());
        if (response instanceof User) {
            return Response.newSuccess(response);
        } else {
            return Response.newFailure(response);
        }
    }
}
