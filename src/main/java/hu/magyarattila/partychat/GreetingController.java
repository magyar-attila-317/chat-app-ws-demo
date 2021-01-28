package hu.magyarattila.partychat;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

@Controller
public class GreetingController {

    private final SimpMessagingTemplate messagingTemplate;

    @Autowired
    public GreetingController(SimpMessagingTemplate messagingTemplate) {
        this.messagingTemplate = messagingTemplate;
    }

    @MessageMapping("/all")
    public void broadcastNews(@Payload String message) {
        System.out.println("stuff");

            messagingTemplate.convertAndSend("/topics/all", message);
    }

}
