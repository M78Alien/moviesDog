package org.example.moviesdogserver.controller;

import org.aspectj.weaver.ast.Or;
import org.example.moviesdogserver.Response;
import org.example.moviesdogserver.dao.Order;
import org.example.moviesdogserver.dao.OrderRepository;
import org.example.moviesdogserver.service.userService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class orderController {
    @Autowired
    private userService userService;
    @Autowired
    private OrderRepository orderRepository;

    @RequestMapping(value = "/order/comment", method = RequestMethod.POST)
    public Response<Object> addComment(@RequestBody Order order){
        return Response.newSuccess(userService.addComment(order));
    }

    @RequestMapping(value = "/order/comment", method = RequestMethod.GET)
    public List<Order> getComments(@RequestParam Integer movieId) {
        return orderRepository.getCommentList(movieId);
    }

    @RequestMapping(value = "/order/comment/{id}", method = RequestMethod.GET)
    public List<Order> getCommentListForUser(@PathVariable Integer id) {
        return orderRepository.getCommentListForUser(id);
    }

    @RequestMapping(value = "/order/add", method = RequestMethod.POST)
    public Object addOrder(@RequestBody Order order) {
        return userService.addOrder(order);
    }

    @RequestMapping(value = "/order/list/{id}", method = RequestMethod.GET)
    public List<Object> getOrderListForUser(@PathVariable Integer id) {
        return orderRepository.getOrderListForUser(id);
    }

    @RequestMapping(value = "/order/comment", method = RequestMethod.PUT)
    public Response<Object> updateOrder(@RequestParam Integer id, @RequestParam double rate, @RequestParam String comment) {
        Object response = userService.addCommentToOrder(id, rate, comment);
        if (response instanceof Order) {
            return Response.newSuccess(response);
        } else {
            return Response.newFailure(response);
        }
    }

    @RequestMapping(value = "/order/table", method = RequestMethod.GET)
    public List<Order> getAllOrderTable() {
        return orderRepository.getOrderTable("");
    }

    @RequestMapping(value = "/order/table/{text}", method = RequestMethod.GET)
    public List<Order> getOrderTable(@PathVariable String text) {
        return orderRepository.getOrderTable(text);
    }

    @RequestMapping(value = "/order/user/{id}", method = RequestMethod.GET)
    public List<Order> getOrderTableForUser(@PathVariable Integer id) {
        return orderRepository.getOrderTableForUser(id);
    }

    @RequestMapping(value = "/rank/sales", method = RequestMethod.GET)
    public List<Object> getSalesRank() {
        return orderRepository.getSalesRank();
    }

    @RequestMapping(value = "/order/{id}", method = RequestMethod.GET)
    public Object getOrderDetail(@PathVariable Integer id) {
        Object response = userService.getOrderDetail(id);
        if (response instanceof Order) {
            return Response.newSuccess(response);
        } else {
            return Response.newFailure(response);
        }
    }
}
