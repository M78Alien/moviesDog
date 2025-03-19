package org.example.moviesdogserver.controller;

import org.example.moviesdogserver.utils.ConstantProperties;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RestController
public class uploadController {
    @Autowired
    private ConstantProperties constantProperties;

    @PostMapping("/upload")
    public String upload(MultipartFile file) throws IOException {
        return constantProperties.upload(file);
    }
}
