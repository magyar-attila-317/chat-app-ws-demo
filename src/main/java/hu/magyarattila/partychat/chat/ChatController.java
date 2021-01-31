package hu.magyarattila.partychat.chat;

import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.messaging.simp.annotation.SendToUser;
import org.springframework.stereotype.Controller;

import java.security.Principal;

@Controller
public class ChatController {

    @MessageMapping("/chat.send")
    @SendTo("/topics/public")
    public String send(@Payload final String message, Principal principal) {
        return message;
    }

    @MessageMapping("/private.send")
    @SendToUser("/user/reply")
    public String sendPrivate(@Payload final String message, SimpMessageHeaderAccessor messageHeaderAccessor, Principal principal) {
        return message;
    }

}
