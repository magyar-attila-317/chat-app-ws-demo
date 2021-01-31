INSERT IGNORE INTO chat_demo.account (id, account_expired, credentials_expired, is_enabled, is_locked, password, username)
VALUES (1, false, false, true, false, '$2a$10$VPGXS8U3X.QCcNqFBzFxv.Fg6Np1ce2.TX/9X5ColSjLS8/loPy6K', 'magyar_attila'),
       (2, false, false, true, false, '$2a$10$VPGXS8U3X.QCcNqFBzFxv.Fg6Np1ce2.TX/9X5ColSjLS8/loPy6K', 'teszt_elek');
-- PASSWORD: 'a'
INSERT IGNORE INTO chat_demo.account_role (account_id, role)
VALUES (1, 'USER'),
       (1, 'ADMIN'),
       (2, 'USER'),
       (2, 'ADMIN');
