package com.example.whatsapp.controller;

import com.example.whatsapp.model.Message;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class MessageController {

    @MessageMapping("/message")//sending message through this
    @SendTo("/topic/return-to")//send to all who are in chat room
    public Message getContent(@RequestBody Message message)
    {
      /*  try{
            Thread.sleep(2000);

        }catch (InterruptedException e)
        {
            e.printStackTrace();
        }*/
        return message;
    }
}
