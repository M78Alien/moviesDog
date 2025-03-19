package org.example.moviesdogserver;

import lombok.Data;

@Data
public class Response <T> {
    private T data;
    private boolean success;
    private Object message;

    public static <K> Response<K> newSuccess(K data) {
        Response<K> response = new Response<>();
        response.setSuccess(true);
        response.setData(data);
        return response;
    }

    public static Response<Object> newFailure(Object message) {
        Response<Object> response = new Response<>();
        response.setSuccess(false);
        response.setMessage(message);
        return response;
    }
}
