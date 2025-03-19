package org.example.moviesdogserver.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.extern.slf4j.Slf4j;
import org.example.moviesdogserver.dao.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Slf4j
@Service
public class userServiceImpl implements userService {

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private CinemaRepository cinemaRepository;
    @Autowired
    private MovieRepository movieRepository;
    @Autowired
    private RoomRepository roomRepository;
    @Autowired
    private ShowcaseRepository showcaseRepository;
    @Autowired
    private OrderRepository orderRepository;

    // 获取用户信息
    @Override
    public Object getUserById(int id) {
        Optional<User> userOptional = userRepository.findById(id);

        if (userOptional.isPresent()) {
            return userOptional.get();
        } else {
            return "未找到该用户";
        }
    }

    // 添加用户信息
    @Override
    public Object addNewUser(User user) {
        List<User> userList = userRepository.findByPhoneNumber(user.getPhoneNumber());
        if (!userList.isEmpty()) {
            return "用户已存在";
        } else {
            return userRepository.save(user);
        }
    }

    // 更新用户信息
    @Override
    public Object updateUser(int id, String name, String password, String userProfile) {
        Optional<User> userOptional = userRepository.findById(id);
        if (userOptional.isEmpty()) {
            return "未找到该用户";
        } else {
            User user = userOptional.get();
            if (!user.getName().equals(name) && name != null) {
                user.setName(name);
            }
            if (!user.getPassword().equals(password) && password != null) {
                user.setPassword(password);
            }
            if (!user.getUserProfile().equals(userProfile) && userProfile != null) {
                user.setUserProfile(userProfile);
            }
            return userRepository.save(user);
        }
    }

    // 获取影院信息
    @Override
    public Object getCinemaById(int id) {
        Optional<Cinema> cinemaOptional = cinemaRepository.findById(id);

        if (cinemaOptional.isPresent()) {
            return cinemaOptional.get();
        } else {
            return "未找到该影院";
        }
    }

    // 注册影院
    @Override
    public Object addNewCinema(Cinema cinema) {
        Optional<Cinema> cinemaOptional = cinemaRepository.findByPhoneNumber(cinema.getPhoneNumber());

        if (cinemaOptional.isPresent()) {
            return "影院已存在";
        } else {
            return cinemaRepository.save(cinema);
        }
    }

    // 登录影院管理员
    @Override
    public Object loginCinemaAdmin(String phoneNumber, String password) {
        Optional<Cinema> cinemaOptional = cinemaRepository.findByPhoneNumber(phoneNumber);

        if (cinemaOptional.isEmpty()) {
            return "账户不存在";
        } else {
            Cinema cinema = cinemaOptional.get();
            if (cinema.getPassword().equals(password)) {
                return cinema;
            } else {
                return "密码错误";
            }
        }
    }

    // 导入电影信息
    @Override
    public Object addMovie(Movie movie) {
        return movieRepository.save(movie);
    }

    // 查询电影表格
    @Override
    public List<Movie> getMovieTable(String text) {
        return movieRepository.getMovieTable(text);
    }

    // 编辑电影信息
    @Override
    public Object updateMovie(Movie movie) {
        Optional<Movie> movieOptional = movieRepository.findById(movie.getId());
        if (movieOptional.isEmpty()) {
            return "电影信息不存在";
        } else {
            Movie movie1 = movieOptional.get();
            if (movie.getName() != null) {
                movie1.setName(movie.getName());
            }
            if (movie.getEnName() != null) {
                movie1.setEnName(movie.getEnName());
            }
            if (movie.getDirector() != null) {
                movie1.setDirector(movie.getDirector());
            }
            if (movie.getScriptwriter() != null) {
                movie1.setScriptwriter(movie.getScriptwriter());
            }
            if (movie.getActor() != null) {
                movie1.setActor(movie.getActor());
            }
            if (movie.getType() != null) {
                movie1.setType(movie.getType());
            }
            if (movie.getLanguage() != null) {
                movie1.setLanguage(movie.getLanguage());
            }
            if (movie.getCountry() != null) {
                movie1.setCountry(movie.getCountry());
            }
            if (movie.getReleaseTime() != null) {
                movie1.setReleaseTime(movie.getReleaseTime());
            }
            if (movie.getLengthTime() != null) {
                movie1.setLengthTime(movie.getLengthTime());
            }
            if (movie.getPreviewUrl() != null) {
                movie1.setPreviewUrl(movie.getPreviewUrl());
            }
            if (movie.getSynopsis() != null) {
                movie1.setSynopsis(movie.getSynopsis());
            }
            if (movie.getSales() != 0.0) {
                movie1.setSales(movie.getSales());
            }
            if (movie.getRate() != 0.0) {
                movie1.setRate(movie.getRate());
            }
            if (movie.getComment() != null) {
                movie1.setComment(movie.getComment());
            }
            if (movie.getCount() != null) {
                movie1.setCount(movie.getCount());
            }
            if (movie.getIsOpen() != null) {
                movie1.setIsOpen(movie.getIsOpen());
            }
            if (movie.getIsDelete() != null) {
                movie1.setIsDelete(movie.getIsDelete());
            }
            return movieRepository.save(movie1);
        }
    }

    // 编辑影院信息
    @Override
    public Object updateCinema(Cinema cinema) {
        Optional<Cinema> cinemaOptional = cinemaRepository.findById(cinema.getId());
        if (cinemaOptional.isEmpty()) {
            return "影院信息不存在";
        } else {
            Cinema cinema1 = cinemaOptional.get();
            if (cinema.getName() != null) {
                cinema1.setName(cinema.getName());
            }
            if (cinema.getAddress() != null) {
                cinema1.setAddress(cinema.getAddress());
            }
            if (cinema.getConcactNumber() != null) {
                cinema1.setConcactNumber(cinema.getConcactNumber());
            }
            if (cinema.getPhoneNumber() != null) {
                cinema1.setPhoneNumber(cinema.getPhoneNumber());
            }
            if (cinema.getPassword() != null) {
                cinema1.setPassword(cinema.getPassword());
            }
            if (cinema.getNotice() != null) {
                cinema1.setNotice(cinema.getNotice());
            }
            if (cinema.getIsOpen() != null) {
                cinema1.setIsOpen(cinema.getIsOpen());
            }
            if (cinema.getIsDelete() != null) {
                cinema1.setIsDelete(cinema.getIsDelete());
            }
            return cinemaRepository.save(cinema1);
        }
    }

    // 创建影厅信息
    @Override
    public Object addRoom(Room room) {
        Optional<Cinema> cinema = cinemaRepository.findById(room.getCinemaId());
        room.setCinemaName(cinema.get().getName());
        room.setCinemaAddress(cinema.get().getAddress());
        return roomRepository.save(room);
    }

    // 编辑影厅信息
    @Override
    public Object updateRoom(Room room) {
        Optional<Room> roomOptional = roomRepository.findById(room.getId());
        if (roomOptional.isEmpty()) {
            return "未找到影厅信息";
        } else {
            Room room1 = roomOptional.get();
            if (room.getName() != null) {
                room1.setName(room.getName());
            }
            if (room.getCinemaId() != null) {
                room1.setCinemaId(room.getCinemaId());
                Optional<Cinema> cinema = cinemaRepository.findById(room.getCinemaId());
                room1.setCinemaName(cinema.get().getName());
                room1.setCinemaAddress(cinema.get().getAddress());
            }
            if (room.getSizeType() != null) {
                room1.setSizeType(room.getSizeType());
            }
            if (room.getPrice() != 0.0) {
                room1.setPrice(room.getPrice());
            }
            if (room.getIsDelete() != null) {
                room1.setIsDelete(room.getIsDelete());
            }
            return roomRepository.save(room1);
        }
    }

    // 添加排场信息
    @Override
    public Object addShowcase(Showcase showcase) {
        Optional<Cinema> cinema = cinemaRepository.findById(showcase.getCinemaId());
        showcase.setCinemaName(cinema.get().getName());
        Optional<Room> room = roomRepository.findById(showcase.getRoomId());
        showcase.setRoomName(room.get().getName());
        showcase.setPrice(room.get().getPrice());
        Optional<Movie> movie = movieRepository.findById(showcase.getMovieId());
        showcase.setMovieName(movie.get().getName());
        return showcaseRepository.save(showcase);
    }

    // 删除排场信息
    @Override
    public Object deleteShowcase(Integer id) {
        Optional<Showcase> showcaseOptional = showcaseRepository.findById(id);
        if (showcaseOptional.isEmpty()) {
            return "未找到该信息";
        } else {
            Showcase showcase1 = showcaseOptional.get();
            showcase1.setIsDelete(1);
            return showcaseRepository.save(showcase1);
        }
    }

    // 小程序用户注册登录
    @Override
    public Object addLoginUser(String username, String phoneNumber, String password) {
        List<User> userOptional = userRepository.findByPhoneNumber(phoneNumber);
        if (userOptional.isEmpty()) {
            User user = new User();
            user.setName(username);
            user.setPhoneNumber(phoneNumber);
            user.setPassword(password);
            user.setIsDelete(false);
            return userRepository.save(user);
        } else {
            if (userOptional.get(0).getPassword().equals(password) && userOptional.get(0).getName().equals(username)) {
                return userRepository.save(userOptional.get(0));
            } else {
                return "用户名或密码不正确";
            }
        }
    }

    // 小程序获取电影详情信息
    @Override
    public Object getMovieDetails(int id) {
        Optional<Movie> movieOptional = movieRepository.findById(id);
        if (movieOptional.isEmpty()) {
            return "未查找到该电影信息";
        } else {
            return movieOptional.get();
        }
    }

    // 添加评论
    @Override
    public Object addComment(Order order) {
        Optional<Movie> movieOptional = movieRepository.findById(order.getMovieId());
        if (movieOptional.isPresent()) {
            Movie movie = movieOptional.get();
            if (movie.getComment() == 0) {
                movie.setComment(1);
                movie.setRate(order.getRate());
            } else {
                movie.setRate((movie.getRate() * movie.getComment() + order.getRate()) / (movie.getComment() + 1));
                movie.setComment(movie.getComment() + 1);
            }
        }
        return orderRepository.save(order);
    }

    // 用户更换头像
    @Override
    public Object updateProfile(Integer id, String profile) {
        Optional<User> userOptional = userRepository.findById(id);
        if (userOptional.isEmpty()) {
            return "未找到该用户";
        } else {
            User user = userOptional.get();
            user.setUserProfile(profile);
            return userRepository.save(user);
        }
    }

    // 获取影厅详细详细
    @Override
    public Object getRoomDetail(Integer id) {
        Optional<Room> roomOptional = roomRepository.findById(id);
        if (roomOptional.isEmpty()) {
            return "未找到该影厅详细";
        } else {
            return roomOptional.get();
        }
    }

    // 添加订单
    @Override
    public Object addOrder(Order order) {
        Optional<Movie> movieOptional = movieRepository.findById(order.getMovieId());
        if (movieOptional.isPresent()) {
            Movie movie = movieOptional.get();
            movie.setSales(movie.getSales() + (order.getPrice() * 100000));
            movieRepository.save(movie);
        }
        return orderRepository.save(order);
    }

    // 获取排场详情
    @Override
    public Object getShowcaseDetail(Integer id) {
        Optional<Showcase> showcaseOptional = showcaseRepository.findById(id);
        if (showcaseOptional.isEmpty()) {
            return "没有找到该排场详细";
        } else {
            return showcaseOptional.get();
        }
    }

    @Override
    public Object addCommentToOrder(Integer id, double rate, String comment) {
        Optional<Order> orderOptional = orderRepository.findById(id);
        if (orderOptional.isEmpty()) {
            return "未找到该订单信息";
        } else {
            Order order = orderOptional.get();
            order.setRate(rate);
            order.setComment(comment);
            order.setStatus(3);
            Optional<Movie> movieOptional = movieRepository.findById(order.getMovieId());
            if (movieOptional.isPresent()) {
                Movie movie = movieOptional.get();
                if (movie.getComment() == 0) {
                    movie.setComment(1);
                    movie.setRate(order.getRate());
                } else {
                    movie.setRate((movie.getRate() * movie.getComment() + order.getRate()) / (movie.getComment() + 1));
                    movie.setComment(movie.getComment() + 1);
                }
                movieRepository.save(movie);
            }
            return orderRepository.save(order);
        }
    }

    // 获取订单详情
    @Override
    public Object getOrderDetail(Integer id) {
        Optional<Order> orderOptional = orderRepository.findById(id);
        if (orderOptional.isEmpty()) {
            return "未找到该订单信息";
        } else {
            return orderOptional.get();
        }
    }

}
