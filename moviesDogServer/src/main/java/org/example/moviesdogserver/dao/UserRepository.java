package org.example.moviesdogserver.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserRepository extends JpaRepository<User, Integer> {

    List<User> findByPhoneNumber(String phoneNumber);

    @Query(value = "SELECT * FROM `user_table` WHERE name LIKE CONCAT('%', :text, '%')", nativeQuery = true)
    List<User> getUsersTableLike(String text);
}
