package org.example.moviesdogserver.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface RoomRepository extends JpaRepository<Room, Integer> {
    @Query(value = "SELECT * FROM `room_table` WHERE is_delete <> 1 AND cinema_name LIKE CONCAT('%', :text, '%')", nativeQuery = true)
    List<Room> getRoomTable(String text);
}
