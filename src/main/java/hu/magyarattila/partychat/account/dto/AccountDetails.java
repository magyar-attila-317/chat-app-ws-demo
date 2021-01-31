package hu.magyarattila.partychat.account.dto;

import hu.magyarattila.partychat.account.Account;
import hu.magyarattila.partychat.account.AccountRole;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.beans.BeanUtils;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
public class AccountDetails {

    private Long id;
    private String username;
    private List<AccountRole> roles;

    public AccountDetails(Account account) {
        BeanUtils.copyProperties(account, this);
    }

}
