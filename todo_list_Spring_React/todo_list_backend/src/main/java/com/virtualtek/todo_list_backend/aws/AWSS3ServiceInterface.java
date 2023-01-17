package com.virtualtek.todo_list_backend.aws;

import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface AWSS3ServiceInterface {
    String saveFile(MultipartFile fileName);
    byte[] downloadFile(String fileName);
    String deleteFile(String fileName);
    List<String> listAllFiles();
}
