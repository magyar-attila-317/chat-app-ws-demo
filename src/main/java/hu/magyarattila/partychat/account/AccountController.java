package hu.magyarattila.partychat.account;

import hu.magyarattila.partychat.account.dto.AccountDetails;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/accounts")
public class AccountController {

    @GetMapping("/me")
    public ResponseEntity<AccountDetails> login(UsernamePasswordAuthenticationToken user) {
        Object principal = user.getPrincipal();
        if (principal != null) {
            if (principal instanceof Account) {
                return new ResponseEntity<>(new AccountDetails((Account) principal), HttpStatus.OK);
            }
        }
        return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
    }

}
